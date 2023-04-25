import { useState } from "react";
import TeamStatusList from "@/components/common/TeamStatusList";

export default function GameStatus() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);

  return (
    <div className="flex flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover mt-[32px]">
      <div className="md:flex justify-start items-center flex-col px-7.5 xl:px-20 py-10">
        <span className="text-[24px] text-stepTitle font-Zen  bg-transparent w-100">
          GAME ENDS IN
        </span>

        <span className="text-[40px] text-step font-Zen drop-shadow-md	 bg-transparent">
          168H : 23M: 50S
        </span>
        <span className="text-base text-step font-Poppins drop-shadow-md	 bg-transparent">
          In around 7 days
        </span>
      </div>
      <div className="md:flex justify-start items-center flex-col">
        <span className="text-base text-step font-Zen  bg-transparent w-100">
          Winning amount
        </span>

        <span className="text-[32px] text-step font-Zen drop-shadow-md bg-transparent">
          ETH 100.91
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
