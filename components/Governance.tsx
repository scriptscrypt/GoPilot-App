import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { dynamicClient } from "@/dynamic/client";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import * as borsh from "borsh";
import { Buffer } from "buffer";

// Define the program ID (replace with your actual program ID)
const PROGRAM_ID = new PublicKey(
  "8u1GgwJgRhmk1dp9v1LiNcFYCYh8BvAAb7KFvdcTm6Ra"
);

// Instruction data structures (same as before)
class InitializeGovernanceArgs {
  constructor(properties: any) {
    Object.assign(this, properties);
  }
  static schema = new Map([
    [
      InitializeGovernanceArgs,
      {
        kind: "struct",
        fields: [
          ["max_ride_distance", "u32"],
          ["cancellation_policy", "string"],
        ],
      },
    ],
  ]);
  serialize() {
    return borsh.serialize(InitializeGovernanceArgs.schema, this);
  }
}

class CreateProposalArgs {
  constructor(properties: any) {
    Object.assign(this, properties);
  }
  static schema = new Map([
    [
      CreateProposalArgs,
      {
        kind: "struct",
        fields: [
          ["title", "string"],
          ["description", "string"],
          ["options", ["string"]],
          ["voting_period", { kind: "option", type: "i64" }],
          ["timelock", { kind: "option", type: "i64" }],
        ],
      },
    ],
  ]);
  serialize() {
    return borsh.serialize(CreateProposalArgs.schema, this);
  }
}

class VoteArgs {
  constructor(properties: any) {
    Object.assign(this, properties);
  }
  static schema = new Map([
    [
      VoteArgs,
      {
        kind: "struct",
        fields: [["vote", "u8"]],
      },
    ],
  ]);
  serialize() {
    return borsh.serialize(VoteArgs.schema, this);
  }
}

const SolanaGovernanceComponent: React.FC = () => {
  const [maxRideDistance, setMaxRideDistance] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([""]);
  const [proposalPubkey, setProposalPubkey] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const createAndSendTransaction = async (instructions: any[]) => {
    const wallet = dynamicClient.wallets.primary;
    if (!wallet) {
      setStatus("Wallet not connected");
      return;
    }

    try {
      // @ts-ignore
      const connection = dynamicClient?.solana?.getConnection();
      // @ts-ignore
      const signer = dynamicClient?.solana?.getSigner({ wallet });

      console.log(signer);
      const { blockhash } = await connection.getLatestBlockhash();
      const fromKey = new PublicKey(wallet.address);
      console.log(fromKey);

      const messageV0 = new TransactionMessage({
        instructions,
        payerKey: fromKey,
        recentBlockhash: blockhash,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);
      const { signature } = await signer.signAndSendTransaction(transaction);
      console.log("Successful transaction signature:", signature);
      return signature;
    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error}`);
    }
  };

  const initializeGovernance = async () => {
    const wallet = dynamicClient.wallets.primary;
    if (!wallet) {
      setStatus("Wallet not connected");
      return;
    }

    try {
      const [governanceAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("governance")],
        PROGRAM_ID
      );

      const args = new InitializeGovernanceArgs({
        max_ride_distance: parseInt(maxRideDistance),
        cancellation_policy: cancellationPolicy,
      });

      const instruction = {
        programId: PROGRAM_ID,
        keys: [
          {
            pubkey: new PublicKey(wallet.address),
            isSigner: true,
            isWritable: true,
          },
          { pubkey: governanceAccount, isSigner: false, isWritable: true },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: Buffer.from([0, ...args.serialize()]),
      };

      const signature = await createAndSendTransaction([instruction]);
      if (signature) {
        setStatus(`Governance initialized: ${signature}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error}`);
    }
  };

  const createProposal = async () => {
    const wallet = dynamicClient.wallets.primary;
    if (!wallet) {
      setStatus("Wallet not connected");
      return;
    }

    try {
      const [governanceAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("governance")],
        PROGRAM_ID
      );
      const [treasuryAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("treasury")],
        PROGRAM_ID
      );
      const proposalAccount = Keypair.generate();

      const args = new CreateProposalArgs({
        title,
        description,
        options: options.filter((option) => option !== ""),
        voting_period: null,
        timelock: null,
      });

      const instruction = {
        programId: PROGRAM_ID,
        keys: [
          { pubkey: governanceAccount, isSigner: false, isWritable: true },
          { pubkey: treasuryAccount, isSigner: false, isWritable: true },
          { pubkey: proposalAccount, isSigner: false, isWritable: true },
          {
            pubkey: new PublicKey(wallet.address),
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: new PublicKey(wallet.address),
            isSigner: false,
            isWritable: true,
          }, // Assuming user's main account is also their token account
          { pubkey: treasuryAccount, isSigner: false, isWritable: true }, // Assuming treasury is also treasury token account
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: Buffer.from([1, ...args.serialize()]),
      };

      console.log(instruction);
      const signature = await createAndSendTransaction([instruction]);
      console.log(signature);
      if (signature) {
        setProposalPubkey(proposalAccount?.publicKey.toBase58());
        setStatus(`Proposal created: ${signature}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error}`);
    }
  };

  const vote = async (voteOption: number) => {
    const wallet = dynamicClient.wallets.primary;
    if (!wallet || !proposalPubkey) {
      setStatus("Wallet not connected or no active proposal");
      return;
    }

    try {
      const args = new VoteArgs({ vote: voteOption });

      const instruction = {
        programId: PROGRAM_ID,
        keys: [
          {
            pubkey: new PublicKey(proposalPubkey),
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: new PublicKey(wallet.address),
            isSigner: true,
            isWritable: false,
          },
        ],
        data: Buffer.from([2, ...args.serialize()]),
      };

      const signature = await createAndSendTransaction([instruction]);
      if (signature) {
        setStatus(`Vote cast: ${signature}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Solana Governance</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Initialize Governance</Text>
        <TextInput
          style={styles.input}
          placeholder="Max Ride Distance"
          value={maxRideDistance}
          onChangeText={setMaxRideDistance}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cancellation Policy"
          value={cancellationPolicy}
          onChangeText={setCancellationPolicy}
        />
        <Button title="Initialize Governance" onPress={initializeGovernance} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create Proposal</Text>
        <TextInput
          style={styles.input}
          placeholder="Proposal Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Proposal Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        {options.map((option, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Option ${index + 1}`}
            value={option}
            onChangeText={(text) => {
              const newOptions = [...options];
              newOptions[index] = text;
              setOptions(newOptions);
            }}
          />
        ))}
        <Button
          title="Add Option"
          onPress={() => setOptions([...options, ""])}
        />
        <Button title="Create Proposal" onPress={createProposal} />
      </View>

      {proposalPubkey && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vote on Proposal</Text>
          <Text>Active Proposal: {proposalPubkey}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Vote Yes" onPress={() => vote(0)} />
            <Button title="Vote No" onPress={() => vote(1)} />
          </View>
        </View>
      )}

      <Text style={styles.status}>{status}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  status: {
    marginTop: 20,
    fontStyle: "italic",
  },
});

export default SolanaGovernanceComponent;
