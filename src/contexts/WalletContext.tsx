import { ethers, Signer } from "ethers";
import { createContext, ReactNode, useEffect, useState } from "react";
import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */
};

const DEFAULT_CHAIN_ID = 421613;

interface WalletContextType {
  account: string | undefined;
  chainId: number;
  isConneted: boolean;
  signer: Signer | undefined;
  provider: ethers.providers.BaseProvider | undefined;
  connect: () => void;
  disconnect: () => void;
}

export const WalletContext = createContext<WalletContextType>(
  {} as WalletContextType
);

type Props = {
  children: ReactNode;
};

const WalletProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<string>();
  const [isConneted, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState<number>(DEFAULT_CHAIN_ID);
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<ethers.providers.BaseProvider>();
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const expectId = 421613;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const web3modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });
      setWeb3Modal(web3modal);
    }
  }, []);

  const connect = async () => {
    if (!web3Modal || isConneted) return;
    if (window.ethereum.networkVersion !== expectId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x66eed" }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        console.log(err);
        // @ts-ignore: Object is possibly 'null'.
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Arbitrum Goerli",
                chainId: "0x66eed",
                nativeCurrency: {
                  name: "AGOR",
                  decimals: 18,
                  symbol: "AGOR",
                },
                rpcUrls: [
                  "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
                  "https://arbitrum-goerli.public.blastapi.io",
                  "https://goerli-rollup.arbitrum.io/rpc",
                ],
                blockExplorerUrls: [
                  "https://goerli-rollup-explorer.arbitrum.io",
                ],
              },
            ],
          });
        }
      }
    }
    try {
      const instance = await web3Modal!.connect();

      const _provider = new ethers.providers.Web3Provider(instance);
      const _signer = _provider.getSigner();
      const accounts = await _provider.listAccounts();
      setChainId((await _provider.getNetwork()).chainId);
      setProvider(_provider);
      setSigner(_signer);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = async () => {
    if (!web3Modal || !isConneted) return;

    web3Modal.clearCachedProvider();
    setProvider(undefined);
    setSigner(undefined);
    setAccount(undefined);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        signer,
        provider,
        chainId,
        isConneted,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
