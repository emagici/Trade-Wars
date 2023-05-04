import { ConnectWallet } from "@/components/common";
import { NavOption } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
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
            width={43}
            height={55}
          />
        </Link>
        <span className="text-base text-yellow font-Zen"> TRADE WARS</span>
      </div>

      <div className="flex-1 flex justify-end">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
