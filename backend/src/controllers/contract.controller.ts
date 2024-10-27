import { Request, Response } from "express";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import LockABI from "./DocumentVerification.json";

dotenv.config();

// Define contract address and provider
const contractAddress = process.env.CONTRACT_ADDRESS as string;
const provider = new ethers.JsonRpcProvider(process.env.LOCALHOST_URL);


const verifyDoc = async (req: Request, res: Response) => {

    
    // Create wallet using private key
    const { privateKey, hash } = req.body
    const signer = new ethers.Wallet(privateKey, provider);
    // Initialize contract with signer
    const lockContract = new ethers.Contract(
        contractAddress,
        LockABI.abi,
        signer
    );

    const documentText = "Document";
    const documentHash = ethers.keccak256(ethers.toUtf8Bytes(documentText));

    try {
        // Verify the document was stored
        const isVerified = await lockContract.verifyDocument(hash);
        res.status(200).json({
            message: "Document verified"
        })
        return
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
        return
    }
}

const addDoc = async (req: Request, res: Response) => {

    // Create wallet using private key
    const { privateKey, hash } = req.body
    const signer = new ethers.Wallet(privateKey, provider);
    // Initialize contract with signer
    const lockContract = new ethers.Contract(
        contractAddress,
        LockABI.abi,
        signer
    );

    const documentText = "Document";
    const documentHash = ethers.keccak256(ethers.toUtf8Bytes(documentText));

    try {
        const tx = await lockContract.storeDocument("Org", hash);
        res.status(200).json({
            message: "Document Added",
            Transaction: tx.hash
        })
        return
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: "Server error",
        })
        return
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