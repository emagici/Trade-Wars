import { ConnectWallet } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useState } from "react";
const Header = () => {
  const [open, setOpen] = useState(false);

  const handleTooltipOpen = () => {
    setOpen(!open);
  };
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
      <div className="flex-1 flex justify-end font-Zen">
        <Badge
          color="secondary"
          variant="dot"
          className="mr-[45px]"
          invisible
          onClick={handleTooltipOpen}
        >
          <NotificationsIcon className="stroke-step text-transparent hover:stroke-win active:bg-alert active:rounded-full active:stroke-alertIcon" />
        </Badge>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
