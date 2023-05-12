import { ConnectWallet } from "@/components/common";
import Popover from "@mui/material/Popover";
import { useWallet } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { shortAddress } from "@/utils";
import { Button } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const { account, disconnect } = useWallet();

  return (
    <div className="z-50 hidden md:flex left-0 top-0 right-0 h-[72px] bg-header items-center justify-between px-10 font-SuisseIntl font-semibold">
      <div className="flex-1 flex items-center gap-2">
        <Link href="/">
          <Image
            src="/assets/icons/TradeWars.png"
            alt="spice"
            width={43}
            height={55}
          />
        </Link>
        <span className="text-base text-yellow font-Zen"> TRADE WARS</span>
      </div>
      <div className="flex-1 flex justify-end">
        {account === undefined ? (
          <ConnectWallet />
        ) : (
          <Button
            className="rounded-none hover:bg-yellow focus:bg-yellow font-Zen h-[25px] text-xs	bg-btn flex items-center justify-center w-[210px]"
            onClick={async () => {
              await disconnect();
            }}
          >
            <Image
              src="/assets/icons/account.png"
              alt="spice"
              width={20}
              height={20}
            />
            <span className="ml-[10px] mr-[14px] text-header">
              {shortAddress(account)}
            </span>
            <Image
              src="/assets/icons/arrow-down1.png"
              alt="spice"
              width={12}
              height={12}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
