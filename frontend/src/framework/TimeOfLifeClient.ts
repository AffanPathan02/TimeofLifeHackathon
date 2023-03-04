import { AnchorProvider, Program, utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TimeOfLife } from "utils/TimeOfLife";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export type healthInformationType = {
  name: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  bloodType: string;
  gender: Gender;
  isPregnant: boolean;
  diseases: string[];
  meds: string[];
  isDisabled: boolean;
};

export class TimeOfLifeClient {
  public provider: AnchorProvider;
  public program: Program<TimeOfLife>;

  constructor(program: Program<TimeOfLife>) {
    this.program = program;
    this.provider = program.provider as AnchorProvider;
  }

  getHealthInformationPDA = (publicKey?: PublicKey) => {
    const [PDA, _] = PublicKey.findProgramAddressSync(
      [
        utils.bytes.utf8.encode("information"),
        publicKey?.toBuffer() || this.provider.wallet.publicKey.toBuffer(),
      ],
      this.program.programId
    );

    return PDA;
  };

  getHealthInformation = async (publicKey?: PublicKey) => {
    try {
      return await this.program.account.healthInformation.fetch(
        this.getHealthInformationPDA(publicKey)
      );
    } catch (error) {
      return undefined;
    }
  };

  createHealthInformation = async (data: healthInformationType) => {
    const isExist = await this.getHealthInformation();

    if (isExist) throw new Error("Health information already exist!");

    const healthInformationPDA = this.getHealthInformationPDA();

    await this.program.methods
      .createHealthInformation(
        this.program.programId,
        data.name,
        data.lastName,
        data.age,
        data.height,
        data.weight,
        data.bloodType,
        data.gender,
        data.isPregnant,
        data.diseases,
        data.meds,
        data.isDisabled
      )
      .accounts({
        healthInformation: healthInformationPDA,
      })
      .rpc();
  };

  updateHealthInformation = async (data: healthInformationType) => {
    const healthInformationPDA = this.getHealthInformationPDA();

    await this.program.methods
      .updateHealthInformation(
        data.name,
        data.lastName,
        data.age,
        data.height,
        data.weight,
        data.bloodType,
        data.gender,
        data.isPregnant,
        data.diseases,
        data.meds,
        data.isDisabled
      )
      .accounts({
        healthInformation: healthInformationPDA,
      })
      .rpc();
  };
}
