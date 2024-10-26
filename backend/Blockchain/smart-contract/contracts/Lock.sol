// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        string orgId; // Organization ID
        bytes32 documentHash; // Hash of the document
        uint256 timestamp; // Timestamp of when it was stored
    }

    mapping(bytes32 => Document) public documents; // Mapping of document hash to Document struct

    function storeDocument(string memory orgId, bytes32 documentHash) public {
        require(documents[documentHash].documentHash == 0, "Document already exists.");
        documents[documentHash] = Document(orgId, documentHash, block.timestamp);
    }

    function verifyDocument(bytes32 documentHash) public view returns (bool) {
        return documents[documentHash].documentHash != 0;
    }

    function getDocumentInfo(bytes32 documentHash) public view returns (string memory, uint256) {
        return (documents[documentHash].orgId, documents[documentHash].timestamp);
    }
}