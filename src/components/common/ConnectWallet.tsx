import { useWallet } from "@/hooks";
import { shortAddress } from "@/utils";
import Image from "next/image";

const ConnectWallet = () => {
  const { connect, account } = useWallet();

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
          className="text-yellow px-4 py-1 bg-btn hover:bg-yellow"
          onClick={handleConnect}
        >
          <span className="text-xs font-Zen text-header"> CONNECT WALLET</span>
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
