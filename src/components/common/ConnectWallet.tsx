import Image from "next/image";
import { useWallet, useNotification } from "@/hooks";
import { shortAddress, checkIfBlocked } from "@/utils";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const { connect, account } = useWallet();
  const [blockedRegion, setBlockedRegion] = useState<string>();

  const { showNotification, hideNotification } = useNotification();

  useEffect(() => {
    checkIfBlocked().then(setBlockedRegion);
  }, []);

  const handleMouseEnter = () => {
    if (blockedRegion) {
      showNotification(
        `You are accessing this website from ${blockedRegion}.`,
        "The following countries are geo-blocked: United States, Canada, North Korea, Syria, Iran, Cuba, and Russia."
      );
    }
  };

  const handleMouseLeave = () => {
    if (blockedRegion) {
      hideNotification();
    }
  };

  const handleConnect = async () => {
    if (!blockedRegion) {
      await connect();
    }
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-xs font-Zen text-header">CONNECT WALLET</span>
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
