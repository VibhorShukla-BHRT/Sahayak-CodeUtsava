import { ethers } from "ethers";
import * as dotenv from "dotenv";
import LockABI from "./DocumentVerification.json";

dotenv.config();

// Define contract address and provider
const contractAddress = process.env.CONTRACT_ADDRESS as string;
const provider = new ethers.JsonRpcProvider(process.env.LOCALHOST_URL);


const verifyDoc = async (privateKey: string, hash: string) => {

    const signer = new ethers.Wallet(privateKey, provider);
    // Initialize contract with signer
    const lockContract = new ethers.Contract(
        contractAddress,
        LockABI.abi,
        signer
    );

    try {
        // Verify the document was stored
        const isVerified = await lockContract.verifyDocument(hash);
        // const res = {
        //     message: "Document verified"
        // }
        return isVerified
    } catch(error) {
        // console.log(error);
        return {
            message: "Some error occurred"
        }
    }
}

const addDoc = async (privateKey: string, hash: string) => {


    const signer = new ethers.Wallet(privateKey, provider);
    // Initialize contract with signer
    const lockContract = new ethers.Contract(
        contractAddress,
        LockABI.abi,
        signer
    );

    try {
        const tx = await lockContract.storeDocument("Org", hash);
        // const res = {
        //     message: "Document Added",
        //     Transaction: tx.hash
        // }
        return {
            success: "true",
            transaction: tx.hash
        }
    } catch(error) {
        return {
            success: "false",
            message: "Doc already exists"
        }
    }
}


export { verifyDoc, addDoc }


// async function main() {
//     // Create a proper bytes32 hash from the document


//     try {
//         // Send transaction using the signer

        
//         // Wait for transaction to be mined
//         const receipt = await tx.wait();
//         console.log("Transaction confirmed in block:", receipt.blockNumber);



//         if (isVerified) {
//             const [orgId, timestamp] = await lockContract.getDocumentInfo(documentHash);
//             console.log("Document Info:", {
//                 organizationId: orgId,
//                 timestamp: new Date(Number(timestamp) * 1000).toISOString()
//             });
//         }
//     } catch (error) {
//         console.error("Error interacting with the contract:", error);
//     }
// }

// main().catch((error) => {
//     console.error("Error in script execution:", error);
//     process.exit(1);
// });