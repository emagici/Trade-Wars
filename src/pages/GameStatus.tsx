import TeamStatusList from "@/components/common/TeamStatusList";
import { useWallet } from "@/hooks";
import { useFetchPublicData, useGame } from "@/state/hook";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GameStatus() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);
  const [winWager, setWinWager] = useState("0.0");
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const { connect, provider, account } = useWallet();
  useEffect(() => {
    var rowData: any[] = [];
    const gid = Number(router.query.gid);
    if (gameInfo.data!.length > 0) {
      var sum = 0;
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        sum += gameInfo.data![gid].teams![idx].length;
      });
      const num = ethers.BigNumber.from(sum.toString());

      const wa = ethers.utils.formatEther(
        // @ts-ignore: Object is possibly 'null'.
        gameInfo.data[gid].wage?.mul(num).toString()
      );
      setWinWager(wa);
    }
  }, [gameInfo]);
  return (
    <div className="flex flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover">
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
          ETH {winWager}
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
