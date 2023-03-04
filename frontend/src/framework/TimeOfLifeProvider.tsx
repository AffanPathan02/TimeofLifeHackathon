import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { IDL, TimeOfLife } from "utils/TimeOfLife";
import { TimeOfLifeClient } from "./TimeOfLifeClient";
const PROGRAM_ID = new PublicKey(
  "9A3aikjJmVJHMcs4d2hvMnCf6JxQHoPqTWCrvgkSGftM"
);

type TimeOfLifeContextType = {
  client?: TimeOfLifeClient;
};

const TimeOfLifeContext = createContext<TimeOfLifeContextType>({});

export const TimeOfLifeContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const timeOfLifeClient = useMemo(() => {
    const wallet = anchorWallet;
    const provider = new AnchorProvider(
      connection,
      wallet || {
        signTransaction: async (): Promise<Transaction> => {
          return new Transaction();
        },
        signAllTransactions: async (): Promise<Transaction[]> => {
          return [];
        },
        publicKey: Keypair.generate().publicKey,
      },
      {
        commitment: "confirmed",
      }
    );

    const program = new Program(
      IDL,
      PROGRAM_ID,
      provider
    ) as unknown as Program<TimeOfLife>;

    return new TimeOfLifeClient(program);
  }, [anchorWallet, connection]);

  if (!timeOfLifeClient) return <></>;

  return (
    <TimeOfLifeContext.Provider value={{ client: timeOfLifeClient }}>
      {children}
    </TimeOfLifeContext.Provider>
  );
};

export const useTimeOfLifeClient = () => {
  return useContext(TimeOfLifeContext).client;
};
