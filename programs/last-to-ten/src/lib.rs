use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::{invoke, invoke_signed};
use anchor_lang::solana_program::system_instruction;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod last_to_ten {

    use super::*;

    pub fn fill_bucket(ctx: Context<FillBucket>) -> Result<()> {
        ctx.accounts.bucket.last_player = *ctx.accounts.player.to_account_info().key;
        ctx.accounts.bucket.volume += 1;
        match ctx.accounts.bucket.volume {
            10 => {
                let (_vault_authority, bucket_bump) = Pubkey::find_program_address(
                  &[
                    b"bucket".as_ref(),
                  ],
                  ctx.program_id,
                );
                let authority_seed = &[
                    b"bucket".as_ref(),
                    &[bucket_bump]];
                let signer_seeds = &[&authority_seed[..]]; 
                **ctx.accounts.bucket.to_account_info().try_borrow_mut_lamports()? -= 9000000000;
                **ctx.accounts.player.to_account_info().try_borrow_mut_lamports()? +=  9000000000;
                ctx.accounts.bucket.volume = 0;
            },
            _ => { 
                invoke(
                    &system_instruction::transfer(
                        ctx.accounts.player.key, 
                        ctx.accounts.bucket.to_account_info().key,
                        1000000000),
                    &[
                        ctx.accounts.player.to_account_info().clone(),
                        ctx.accounts.bucket.to_account_info().clone(),
                        ctx.accounts.system_program.to_account_info().clone(),
                    ],
                )?;
            },
        }


        Ok(())
    }
}

#[derive(Accounts)]
pub struct FillBucket<'info>  {
    #[account(
        init_if_needed, 
        seeds = [b"bucket".as_ref()],
        bump,
        payer = player,
        space = 8 + 1 + 32,
    )]
    pub bucket: Account<'info, Bucket>,
    #[account(mut)]
    pub player: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Bucket {
  // bucket capacity
  pub volume: u8,
  // last player
  pub last_player: Pubkey,
}
