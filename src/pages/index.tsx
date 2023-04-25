import JumpBtn from "@/components/common/JumpBtn";
import { News } from "@/components/vaults";
import { Vault } from "@/types/vault";
import Image from "next/image";
import { useState } from "react";

export default function VaultInfo() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);

  return (
    <div className="flex flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover">
      <div className="md:flex justify-start items-center	flex-col px-7.5 xl:px-20 py-7.5 xl:py-16 gap-2.5 xl:gap-3.5 text-light">
        <span className="text-3.5xl text-yellow font-Zen drop-shadow-title bg-transparent">
          READY TO PLAY?
        </span>
        <span className="text-base text-white font-Zen drop-shadow-title bg-transparent w-100">
          A PvP, <span className="text-yellow font-Zen ">risk-to-earn</span>{" "}
          trading game
        </span>
        <JumpBtn />
      </div>
      <div className="flex bottom-[144px] absolute justify-center w-screen ">
        <Image
          src="/assets/images/avatar-1.png"
          className="mr-[200px]"
          alt="spice"
          width={239}
          height={402}
        />
        <Image
          src="/assets/images/avatar-2.png"
          className="ml-[200px]"
          alt="spice"
          width={253}
          height={417}
        />
      </div>
      <div className="bg-black h-[1px] bottom-[150px] absolute w-screen bg-gradient-to-r from-grad1 from-0% via-grad2 via-50% to-grad3 to-90%" />
    </div>
  );
}
