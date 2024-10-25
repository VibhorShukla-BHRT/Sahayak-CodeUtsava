use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash::{hash, Hash};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
``
#[program]
pub mod document_verification_system {  
    use super::*;

    // Organization Management
    pub fn register_organization(
        ctx: Context<RegisterOrganization>,
        name: String,
        org_type: OrganizationType,
        metadata: String,
    ) -> Result<()> {
        let organization = &mut ctx.accounts.organization;
        organization.authority = ctx.accounts.authority.key();
        organization.name = name;
        organization.org_type = org_type;
        organization.metadata = metadata;
        organization.is_active = true;
        organization.document_count = 0;
        organization.verification_count = 0;
        Ok(())
    }

    // Document Issuance
    pub fn issue_document(
        ctx: Context<IssueDocument>,
        document_type: DocumentType,
        recipient: Pubkey,
        document_hash: [u8; 32],
        ipfs_hash: String,
        metadata: DocumentMetadata,
    ) -> Result<()> {
        let document = &mut ctx.accounts.document;
        let organization = &mut ctx.accounts.organization;

        // Set document data
        document.issuer = organization.key();
        document.document_type = document_type;
        document.recipient = recipient;
        document.document_hash = document_hash;
        document.ipfs_hash = ipfs_hash;
        document.metadata = metadata;
        document.status = DocumentStatus::Issued;
        document.issue_timestamp = Clock::get()?.unix_timestamp;

        // Update organization stats
        organization.document_count += 1;

        Ok(())
    }

    // Document Verification
    pub fn verify_document(
        ctx: Context<VerifyDocument>,
        verification_type: VerificationType,
        verification_notes: String,
    ) -> Result<()> {
        let document = &mut ctx.accounts.document;
        let verifier = &mut ctx.accounts.verifier_organization;

        // Create verification record
        let verification = Verification {
            verifier: verifier.key(),
            verification_type,
            timestamp: Clock::get()?.unix_timestamp,
            notes: verification_notes,
            status: VerificationStatus::Verified,
        };

        document.verifications.push(verification);
        document.status = DocumentStatus::Verified;
        
        verifier.verification_count += 1;

        Ok(())
    }

    // Document Revocation
    pub fn revoke_document(
        ctx: Context<RevokeDocument>,
        reason: String,
    ) -> Result<()> {
        let document = &mut ctx.accounts.document;
        require!(ctx.accounts.authority.key() == document.issuer, ErrorCode::Unauthorized);

        document.status = DocumentStatus::Revoked;
        document.revocation_data = Some(RevocationData {
            timestamp: Clock::get()?.unix_timestamp,
            reason,
            authority: ctx.accounts.authority.key(),
        });

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum OrganizationType {
    Educational,
    Government,
    Corporate,
    Financial,
    Healthcare,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum DocumentType {
    AcademicTranscript,
    Degree,
    IdentityCard,
    EmploymentCertificate,
    MedicalRecord,
    LegalDocument,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct DocumentMetadata {
    pub title: String,
    pub description: String,
    pub issue_date: i64,
    pub expiry_date: Option<i64>,
    pub additional_details: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum DocumentStatus {
    Issued,
    Verified,
    Revoked,
    Expired,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Verification {
    pub verifier: Pubkey,
    pub verification_type: VerificationType,
    pub timestamp: i64,
    pub notes: String,
    pub status: VerificationStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum VerificationType {
    Initial,
    Detailed,
    Emergency,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum VerificationStatus {
    Verified,
    Rejected,
    Pending,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct RevocationData {
    pub timestamp: i64,
    pub reason: String,
    pub authority: Pubkey,
}

#[account]
pub struct Organization {
    pub authority: Pubkey,
    pub name: String,
    pub org_type: OrganizationType,
    pub metadata: String,
    pub is_active: bool,
    pub document_count: u64,
    pub verification_count: u64,
}

#[account]
pub struct Document {
    pub issuer: Pubkey,
    pub document_type: DocumentType,
    pub recipient: Pubkey,
    pub document_hash: [u8; 32],
    pub ipfs_hash: String,
    pub metadata: DocumentMetadata,
    pub status: DocumentStatus,
    pub issue_timestamp: i64,
    pub verifications: Vec<Verification>,
    pub revocation_data: Option<RevocationData>,
}