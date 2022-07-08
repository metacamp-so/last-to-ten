import * as anchor from "@project-serum/anchor";
import { Address, Program } from "@project-serum/anchor";
import { LastToTen } from "../target/types/last_to_ten";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { assert } from "chai";

describe("last-to-ten", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.LastToTen as Program<LastToTen>;

  const player1 = anchor.web3.Keypair.generate();
  const player2 = anchor.web3.Keypair.generate();

  it("Initialize mint and token accounts", async () => {
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(player1.publicKey, 10000000000),
      "confirmed"
    );
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(player2.publicKey, 10000000000),
      "confirmed"
    );

    assert.ok(
      (await provider.connection.getAccountInfo(player1.publicKey)).lamports ==
        10000000000
    );
    assert.ok(
      (await provider.connection.getAccountInfo(player2.publicKey)).lamports ==
        10000000000
    );
  });

  it("fill once", async () => {
    const [bucket_pda, _bucket_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("bucket"))],
      program.programId
    );
    // Add your test here.
    const tx = await program.methods
      .fillBucket()
      .accounts({
        bucket: bucket_pda,
        player: player2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([player2])
      .rpc();

    const bucket = await program.account.bucket.fetch(bucket_pda)

    assert.ok(Number(bucket.volume) == 1)
    assert.ok(bucket.lastPlayer.equals(player2.publicKey))
  });

  it("fill twice", async () => {
    const [bucket_pda, _bucket_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("bucket"))],
      program.programId
    );
    // Add your test here.
    const tx = await program.methods
      .fillBucket()
      .accounts({
        bucket: bucket_pda,
        player: player1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([player1])
      .rpc();

      const bucket = await program.account.bucket.fetch(bucket_pda)
  
      assert.ok(Number(bucket.volume) == 2)
      assert.ok(bucket.lastPlayer.equals(player1.publicKey))
  });

  it("win game", async () => {
    const [bucket_pda, _bucket_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("bucket"))],
      program.programId
    );
    // Add your test here.
    const tx = await program.methods
      .fillBucket()
      .accounts({
        bucket: bucket_pda,
        player: player2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([player2])
      .rpc();

      const bucket = await program.account.bucket.fetch(bucket_pda)
      console.log((await provider.connection.getAccountInfo(player2.publicKey)).lamports)
  
      assert.ok(Number(bucket.volume) == 0)
      assert.ok(bucket.lastPlayer.equals(player2.publicKey))
  });
});
