use anchor_lang::prelude::*;

declare_id!("4q5oyzETWa1GGHte87p8mj3XcPskGugmZcY8cLzLE19K");

#[program]
pub mod smart_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
