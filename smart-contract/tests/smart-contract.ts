import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SmartContract } from "../target/types/smart_contract";
import { PublicKey } from "@solana/web3.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

const user = {
  name: "Ceyda",
  last_name: "Esen",
  age: 24,
  height: 178,
  weight: 62,
  blood_type: "B0 Rh-",
  gender: Gender.FEMALE,
  is_pregnant: false,
  diseases: ["disease1", "disease2"],
  meds: ["med1", "med2"],
  is_disabled: false,
};

describe("smart-contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SmartContract as Program<SmartContract>;

  const wallet = anchor.getProvider();

  const healthInformationAccount = new anchor.web3.Keypair();

  const getUserHealthInformationPDA = (userId: PublicKey) => {
    const [PDA, _] = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode("information"), userId.toBuffer()],
      program.programId
    );

    return PDA;
  };

  it("Create Health Information", async () => {
    await wallet.connection.requestAirdrop(
      healthInformationAccount.publicKey,
      anchor.web3.LAMPORTS_PER_SOL * 3
    );

    await sleep(500);

    const healthInformationPDA = getUserHealthInformationPDA(
      healthInformationAccount.publicKey
    );

    await program.methods
      .createHealthInformation(
        program.programId,
        user.name,
        user.last_name,
        user.age,
        user.height,
        user.weight,
        user.blood_type,
        user.gender,
        user.is_pregnant,
        user.diseases,
        user.meds,
        user.is_disabled
      )
      .accounts({
        healthInformation: healthInformationPDA,
        author: healthInformationAccount.publicKey,
      })
      .signers([healthInformationAccount])
      .rpc();

    const healthInformation = await program.account.healthInformation.fetch(
      healthInformationPDA
    );

    console.log(healthInformation);
  });

  it("Update Health Information", async () => {
    await wallet.connection.requestAirdrop(
      healthInformationAccount.publicKey,
      anchor.web3.LAMPORTS_PER_SOL * 3
    );

    await sleep(500);

    const healthInformationPDA = getUserHealthInformationPDA(
      healthInformationAccount.publicKey
    );

    await program.methods
      .updateHealthInformation(
        "ddd",
        user.last_name,
        user.age,
        user.height,
        user.weight,
        user.blood_type,
        user.gender,
        user.is_pregnant,
        user.diseases,
        user.meds,
        user.is_disabled
      )
      .accounts({
        healthInformation: healthInformationPDA,
        author: healthInformationAccount.publicKey,
      })
      .signers([healthInformationAccount])
      .rpc();

    const healthInformation = await program.account.healthInformation.fetch(
      healthInformationPDA
    );

    console.log(healthInformation);
  });
});
