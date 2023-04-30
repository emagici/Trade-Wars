import { useNotification, useWallet } from "@/hooks";
import { checkIfBlocked, shortAddress } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const { connect, account } = useWallet();
  const [blockedRegion, setBlockedRegion] = useState<string>();

  const { showNotification, hideNotification } = useNotification();

  useEffect(() => {
    checkIfBlocked().then(setBlockedRegion);
  }, []);

  const handleConnect = async () => {
    await connect();
  };

  return (
    <div>
      {account ? (
        <div className="flex items-center gap-3.5">
          <Image
            src="/assets/images/vaultIcon.svg"
            width={32}
            height={32}
            alt=""
          />
          <span className="text-xs xl:text-sm text-light">
            {shortAddress(account)}
          </span>
        </div>
      ) : (
        <button
          className="text-yellow rounded px-4 py-1 bg-btn"
          onClick={handleConnect}
        >
          <span className="text-xs font-Zen text-header">CONNECT WALLET</span>
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
