const bcrypt = require("bcryptjs");
const User = require("../model/User");

exports.signUp = async(req,res)=>{
    try {

        //fetch data from req body
        const{name,email,password,confirmpassword,
            role
        } = req.body;

        //validations perform 
        if(!name  || !email ||!password || !confirmpassword || !role )
        {
            return res.status(403).json({
                sucsess:false,
                message:"all feilds are require",
            });
        }

        if(password!==confirmpassword)
        {
            return res.status(400).json({
                sucsess:false,
                message:"password does not match"
            });
        }

        //check user already exist or not
        const userexist = await User.findOne({email});
        if(userexist)
        {
            return res.status(402).json({
                sucsess:false,
                message:"user already exist please login",
            });
        }

        const hashedpassword  = await bcrypt.hash(password,10);

        const user = await User.create({
            name,email,password:hashedpassword,
          role,image:`https://api.dicebear.com/8.x/croodles/svg?seed=${FirstName}`,

        });

        return res.status(200).json({
            sucsess:true,
            message:"user registerd sucsessfully",
            data:user
        });


        
    } catch (error) {
        
        console.log("error in signup",error);
        return res.status(500).json({
            sucsess:false,
            message:"something wrong with signup ,please try again"
        })
    }
}

//login

exports.login = async(req,res)=>{
    try {
        
        //fetch data
        const {email,password} = req.body;

        //validate
        if(!email || !password)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            });
        }

        //check user exist or not
        const userexist = await User.findOne({email});
        console.log(userexist);

        if(!userexist)
        {
            return res.status(401).json({
                sucsess:false,
                message:"user does not exist first signup",
            });
        }

        //verify password 
        if(await bcrypt.compare(password,userexist.password))
        {
            //make a json token
            const payload = {
                email:userexist.email,
                id:userexist._id,
                role:userexist.role,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            userexist.token = token;
            userexist.password = undefined;

            //create a cookie
            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("token",token,options).status(200).json({
                succsess:true,
                message:"loggedin sucsessfully",
                token,
                userexist,
            });
            

        }
        else
        {
            return res.status(400).json({
                sucsees:false,
                message:"password does not match",
            }); 
        }

    } catch (error) {
        return res.status(500).json({
            sucsees:false,
            message:"logged in issue please try again",
        });
    }
}
