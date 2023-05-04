import { NavOption } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV_OPTIONS: NavOption[] = [
  { href: "/", name: "Vaults" },
  { href: "/portfolio", name: "Portfolio" },
  { href: "/prologue-nfts", name: "Prologue NFTs" },
];

const Footer = () => {
  const router = useRouter();

  const linkClass = (option: NavOption) => {
    if (
      router.pathname === option.href ||
      router.pathname.startsWith(option.href + "/", 0)
    ) {
      return "text-yellow-light text-shadow-yellow-light";
    }
    return "";
  };

  return (
    <div className="z-50 hidden md:flex left-0 top-0 right-0 h-[72px] bg-header items-center justify-between px-10 font-SuisseIntl font-semibold">
      <div className="flex-1 flex items-center gap-2">
        <Link href="/">
          <Image
            src="/assets/icons/TradeWars.png"
            alt="spice"
            width={32}
            height={42}
          />
        </Link>
        <span className="text-base text-footerYellow font-Zen">
          {" "}
          TRADE WARS
        </span>
      </div>

      <div className="flex-1 flex justify-end">
        <span className="text-xs text-footerYellow font-Zen">
          {" "}
          All rights reserved 2023
        </span>
      </div>
    </div>
  );
};

export default Footer;
