import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";
import { Header, Footer } from "@/components";
import WalletProvider from "@/contexts/WalletContext";
import { Provider } from "react-redux";
import { RefreshContextProvider } from "@/contexts/RefreshContext";
import store from "../state";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, arbitrumGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [arbitrumGoerli]
      : []),
  ],
  [publicProvider()]
);

const projectId = "TradeWars";

const { wallets } = getDefaultWallets({
  appName: "Trade Wars",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Trade Wars",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps<>) {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <RefreshContextProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
            <WalletProvider>
              <div className="flex flex-col h-full w-full relative main bg-gap">
                <Header />
                <Component {...pageProps} />
                <Footer />
              </div>
            </WalletProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </RefreshContextProvider>
    </Provider>
  );
}
