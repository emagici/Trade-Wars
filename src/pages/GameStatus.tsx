import TeamStatusList from "@/components/common/TeamStatusList";
import { useWallet } from "@/hooks";
import { useFetchPublicData, useGame } from "@/state/hook";
import { useRouter } from "next/router";
import { useState } from "react";

export default function GameStatus() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const { connect, provider, account } = useWallet();

  return (
    <div className="flex flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover">
      <div className="md:flex justify-start items-center flex-col mt-10">
        <span
          className="text-[24px] text-stepTitle font-Zen  bg-transparent w-100"
          style={{
            textShadow: "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
          }}
        >
          GAME ENDS IN
        </span>

        <span
          className="text-[40px] text-step font-Zen drop-shadow-md	 bg-transparent"
          style={{
            textShadow: "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
          }}
        >
          168H : 23M: 50S
        </span>
        <span className="text-base text-step font-Poppins drop-shadow-transparent">
          In around 7 days
        </span>
      </div>

      <div className="md:flex justify-start items-center flex-col mt-16">
        <span className="text-base text-step font-Zen  bg-transparent w-100">
          Winning amount
        </span>

        <span
          className="text-[32px] text-step font-Zen drop-shadow-md bg-transparent"
          style={{
            textShadow: "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
          }}
        >
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
