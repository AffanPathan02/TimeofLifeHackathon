use anchor_lang::prelude::*;

use anchor_lang::solana_program::system_program;

declare_id!("DRdBSPLQ1bhycHEEyrQujdosvFM45jCUNYua5YzBh8ev");

#[program]
pub mod smart_contract {
    use super::*;

    pub fn create_health_information(
        ctx: Context<CreateHealthInformation>,
        id: Pubkey,
        name: String,
        last_name: String,
        age: u8,
        size: u8,
        weight: u8,
        blood_type: String,
        gender_str: String,
        is_pregnant: bool,
        disease: Vec<String>,
        meds: Vec<String>,
        is_disabled: bool,
    ) -> Result<()> {
        let health_information: &mut Account<HealthInformation> =
            &mut ctx.accounts.health_information;
        health_information.name = name;
        health_information.last_name = last_name;
        health_information.age = age;
        health_information.size = size;
        health_information.weight = weight;
        health_information.blood_type = blood_type;
        health_information.is_pregnant = is_pregnant;
        health_information.is_disabled = is_disabled;
        health_information.author = *ctx.accounts.author.key;

        health_information.push_disease(&disease);
        health_information.push_med(&meds);

        health_information.gender = match parse_gender(&gender_str) {
            Some(gender) => gender,
            None => return Err(ErrorCode::InvalidGender.into()),
        };

        health_information.is_pregnant =
            check_pregnant_for_gender(is_pregnant, health_information.gender);

        if health_information.is_pregnant != is_pregnant {
            return Err(ErrorCode::InvalidPregnant.into());
        }

        let (_pda, bump_seed) = Pubkey::find_program_address(
            &[b"information", health_information.author.as_ref()],
            &id,
        );

        health_information.bump = bump_seed;

        Ok(())
    }

    pub fn update_health_information(
        ctx: Context<UpdateHealthInformation>,
        name: String,
        last_name: String,
        age: u8,
        size: u8,
        weight: u8,
        blood_type: String,
        gender_str: String,
        is_pregnant: bool,
        disease: Vec<String>,
        meds: Vec<String>,
        is_disabled: bool,
    ) -> Result<()> {
        let health_information: &mut Account<HealthInformation> =
            &mut ctx.accounts.health_information;
        health_information.name = name;
        health_information.last_name = last_name;
        health_information.age = age;
        health_information.size = size;
        health_information.weight = weight;
        health_information.blood_type = blood_type;
        health_information.is_pregnant = is_pregnant;
        health_information.is_disabled = is_disabled;

        health_information.push_disease(&disease);
        health_information.push_med(&meds);

        health_information.gender = match parse_gender(&gender_str) {
            Some(gender) => gender,
            None => return Err(ErrorCode::InvalidGender.into()),
        };

        health_information.is_pregnant =
            check_pregnant_for_gender(is_pregnant, health_information.gender);

        if health_information.is_pregnant != is_pregnant {
            return Err(ErrorCode::InvalidPregnant.into());
        }

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub enum Gender {
    Male,
    Female,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateHealthInformation<'info> {
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(init, payer = author, space = HealthInformation::LEN,
         seeds=[b"information", author.key().as_ref()], bump)]
    pub health_information: Account<'info, HealthInformation>,
    /// CHECK: This is the system program, right?
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateHealthInformation<'info> {
    pub author: Signer<'info>,
    #[account(mut, seeds = [b"information", author.key().as_ref()], bump = health_information.bump)]
    pub health_information: Account<'info, HealthInformation>,
}

#[account]
pub struct HealthInformation {
    pub name: String,
    pub last_name: String,
    pub age: u8,
    pub size: u8,
    pub weight: u8,
    pub blood_type: String,
    pub gender: Gender,
    pub is_pregnant: bool,
    pub diseases: Vec<String>,
    pub meds: Vec<String>,
    pub is_disabled: bool,
    pub author: Pubkey,
    pub bump: u8,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_NAME_LENGTH: usize = 30 * 4;
const MAX_LAST_NAME_LENGTH: usize = 30 * 4;
const AGE_LENGTH: usize = 1;
const SIZE_LENGTH: usize = 1;
const WEIGHT_LENGTH: usize = 1;
const MAX_BLOOD_TYPE_LENGTH: usize = 4 * 3;
const MAX_GENDER_LENGTH: usize = 1;
const IS_PREGNANT_LENGTH: usize = 1;
const MAX_DISEASES_LENGTH: usize = 10 * 30 * 4; //10 x (30 characters x 4 bytes per character)
const MAX_MEDS_LENGTH: usize = 10 * 30 * 4; //10 x (30 characters x 4 bytes per character)
const IS_DISABLED_LENGTH: usize = 1;
const PUBLIC_KEY_LENGTH: usize = 32;
const BUMP_LENGTH: usize = 1;

impl HealthInformation {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_NAME_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_LAST_NAME_LENGTH
        + AGE_LENGTH
        + SIZE_LENGTH
        + WEIGHT_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_BLOOD_TYPE_LENGTH
        + MAX_GENDER_LENGTH
        + IS_PREGNANT_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_DISEASES_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_MEDS_LENGTH
        + IS_DISABLED_LENGTH
        + PUBLIC_KEY_LENGTH
        + BUMP_LENGTH;

    fn push_disease(&mut self, diseases: &[String]) {
        self.diseases.clear();
        
        for disease in diseases {
            self.diseases.push(disease.to_string());
        }
    }

    fn push_med(&mut self, meds: &[String]) {
        self.meds.clear();
        
        for med in meds {
            self.meds.push(med.to_string());
        }
    }
}

fn parse_gender(s: &str) -> Option<Gender> {
    match s {
        "Male" => Some(Gender::Male),
        "Female" => Some(Gender::Female),
        _ => None,
    }
}

fn check_pregnant_for_gender(is_pregnant: bool, gender: Gender) -> bool {
    match gender {
        Gender::Male => match is_pregnant {
            true => false,
            _ => is_pregnant,
        },
        Gender::Female => is_pregnant,
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid Gender")]
    InvalidGender,
    #[msg("Invalid Pregnant")]
    InvalidPregnant,
}
