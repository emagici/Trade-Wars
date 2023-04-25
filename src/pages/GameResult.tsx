import { useState } from "react";
import Image from "next/image";
import TeamStatusList from "@/components/common/TeamStatusList";

export default function GameResult() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);

  return (
    <div className="flex items-center flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover mt-[32px]">
      <div className="md:flex justify-start items-center flex-col px-7.5 xl:px-20 py-10">
        {/* <span className="text-[40px] text-stepTitle font-Zen  bg-transparent w-100">
          YOU WON!
        </span> */}
        <span className="text-[40px] text-stepTitle font-Zen  bg-transparent w-100">
          YOU LOSE!
        </span>
      </div>
      {/* <Image
        src="/assets/icons/win.png"
        alt="win"
        width={82}
        height={82}
        className="mb-[-40px] z-10"
      /> */}
      <Image
        src="/assets/icons/lose.png"
        alt="win"
        width={82}
        height={82}
        className="mb-[-40px] z-10"
      />
      {/* <div className="flex flex-col items-center justify-end w-[350px] h-[167px] bg-yellow border-[4px] border-win p-[10px]">
        <span className="text-[28px] text-rogue font-Zen bg-transparent w-100">
          Rogue End
        </span>-*
        <span className="text-[24px] text-balance font-Poppins  bg-transparent w-100">
          2430
        </span>
        <span className="text-base text-id font-Poppins  bg-transparent w-100">
          @rogue_458
        </span>
      </div> */}

      <div className="flex flex-col items-center justify-end w-[350px] h-[167px] bg-lose border-[4px] border-win p-[10px]">
        <span className="text-[28px] text-rogue font-Zen bg-transparent w-100">
          Rogue End
        </span>
        <span className="text-[24px] text-loseBal font-Poppins bg-transparent w-100">
          2430
        </span>
        <span className="text-base text-loseId font-Poppins  bg-transparent w-100">
          @rogue_458
        </span>
      </div>

      <TeamStatusList
        onClickVault={(_, index) => {
          setActiveVaultIndex(index);
        }}
      />
    </div>
  );
}
