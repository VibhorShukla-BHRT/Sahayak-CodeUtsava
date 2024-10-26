import { expect } from "chai";
import { ethers } from "hardhat";
import { DocumentVerification } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DocumentVerification", function () {
  let documentVerification: DocumentVerification;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  // Helper function to create a document hash
  const createDocumentHash = (content: string): string => {
    return ethers.keccak256(ethers.toUtf8Bytes(content));
  };

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    const DocumentVerification = await ethers.getContractFactory("DocumentVerification");
    documentVerification = await DocumentVerification.deploy();
    await documentVerification.waitForDeployment();
  });

  describe("Document Storage", function () {
    it("Should store a new document successfully", async function () {
      const orgId = "ORG123";
      const documentHash = createDocumentHash("Test Document 1");

      await documentVerification.storeDocument(orgId, documentHash);

      // Verify the document exists
      const isVerified = await documentVerification.verifyDocument(documentHash);
      expect(isVerified).to.be.true;
    });

    it("Should fail when storing duplicate document", async function () {
      const orgId = "ORG123";
      const documentHash = createDocumentHash("Test Document 1");
      // Document
      // Store first time
      await documentVerification.storeDocument(orgId, documentHash);

      // Attempt to store same document again
      await expect(
        documentVerification.storeDocument(orgId, documentHash)
      ).to.be.revertedWith("Document already exists.");
    });

    it("Should allow different users to store documents", async function () {
      const orgId1 = "ORG123";
      const orgId2 = "ORG456";
      const documentHash1 = createDocumentHash("Test Document 1");
      const documentHash2 = createDocumentHash("Test Document 2");

      await documentVerification.connect(owner).storeDocument(orgId1, documentHash1);
      await documentVerification.connect(addr1).storeDocument(orgId2, documentHash2);

      const isVerified1 = await documentVerification.verifyDocument(documentHash1);
      const isVerified2 = await documentVerification.verifyDocument(documentHash2);

      expect(isVerified1).to.be.true;
      expect(isVerified2).to.be.true;
    });
  });

  describe("Document Verification", function () {
    it("Should return false for non-existent document", async function () {
      const nonExistentHash = createDocumentHash("Non-existent Document");
      const isVerified = await documentVerification.verifyDocument(nonExistentHash);
      expect(isVerified).to.be.false;
    });

    it("Should verify existing document", async function () {
      const orgId = "ORG123";
      const documentHash = createDocumentHash("Test Document 1");

      await documentVerification.storeDocument(orgId, documentHash);
      const isVerified = await documentVerification.verifyDocument(documentHash);
      expect(isVerified).to.be.true;
    });
  });

  describe("Document Info Retrieval", function () {
    it("Should retrieve correct document info", async function () {
      const orgId = "ORG123";
      const documentHash = createDocumentHash("Test Document 1");

      // Store document
      const tx = await documentVerification.storeDocument(orgId, documentHash);
      await tx.wait();

      // Get document info
      const [retrievedOrgId, timestamp] = await documentVerification.getDocumentInfo(documentHash);

      expect(retrievedOrgId).to.equal(orgId);
      expect(timestamp).to.be.gt(0);
    });

    it("Should return empty string for non-existent document", async function () {
      const nonExistentHash = createDocumentHash("Non-existent Document");
      const [retrievedOrgId, timestamp] = await documentVerification.getDocumentInfo(nonExistentHash);

      expect(retrievedOrgId).to.equal("");
      expect(timestamp).to.equal(0);
    });
  });
});