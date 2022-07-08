import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { LastToTen } from "../target/types/last_to_ten";

describe("last-to-ten", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.LastToTen as Program<LastToTen>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
