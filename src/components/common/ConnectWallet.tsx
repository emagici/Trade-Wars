import { useWallet } from "@/hooks";
import { shortAddress } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const ConnectWallet = () => {
  const { connect, account } = useWallet();

  const handleConnect = async () => {
    await connect();
  };

  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="text-header text-xs px-4 py-1 bg-btn hover:bg-yellow font-Zen"
                    >
                      CONNECT WALLET
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="rounded-none hover:bg-yellow focus:bg-yellow font-Zen h-[25px] text-xs	bg-btn flex items-center justify-center w-[210px]">
                    <button
                      onClick={openChainModal}
                      className="flex items-center text-header"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={20}
                              height={20}
                            />
                          )}
                        </div>
                      )}
                    </button>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="flex items-center text-header"
                    >
                      <span className="mr-[14px]">{account.displayName}</span>
                      <Image
                        alt={chain.name ?? "Chain icon"}
                        src="/assets/icons/arrow-down1.png"
                        width={12}
                        height={20}
                      />
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default ConnectWallet;
