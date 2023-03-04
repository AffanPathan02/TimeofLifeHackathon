import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "assets/styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { TimeOfLifeContextProvider } from "framework/TimeOfLifeProvider";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp(props: AppProps) {
  const network = WalletAdapterNetwork.Mainnet;

  return (
    <QueryClientProvider client={queryClient}>
      <Inner {...props} />
    </QueryClientProvider>
  );
}

function Inner({ Component, pageProps }: AppProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <TimeOfLifeContextProvider>
            <Component {...pageProps} />
          </TimeOfLifeContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
