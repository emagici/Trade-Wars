import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { Header, Footer } from "@/components";
import WalletProvider from "@/contexts/WalletContext";
import { RefreshContextProvider } from "@/contexts/RefreshContext";
import { Provider } from "react-redux";
import store from "../state";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RefreshContextProvider>
        <WalletProvider>
          <div className="flex flex-col h-full w-full relative main bg-gap">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </WalletProvider>
      </RefreshContextProvider>
    </Provider>
  );
}
