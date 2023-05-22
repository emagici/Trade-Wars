import TeamStatusList from "@/components/common/TeamStatusList";
import useRefresh from "@/hooks/useRefresh";
import { useFetchPublicData, useGame } from "@/state/hook";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function GameStatus() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);
  const [winWager, setWinWager] = useState("0.0");
  const [myTeam, setMyTeam] = useState(-1);
  const [isJoined, setJoined] = useState(false);

  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const { address, isConnected } = useAccount();
  const { fastRefresh } = useRefresh();
  const gid = Number(router.query.gid);

  useEffect(() => {
    var rowData: any[] = [];
    if (gameInfo.data!.length > 0) {
      var sum = 0;
      var teamId = 1;
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        item.map((addr: string) => {
          if (
            isConnected &&
            addr.toLocaleLowerCase() === address!.toLowerCase()
          ) {
            setMyTeam(idx);
            teamId = idx;
          }
        });
        sum += gameInfo.data![gid].teams![idx].length;
      });
      if (gameInfo.data![gid].teams!.some((row) => row.includes(address!))) {
        setJoined(true);
      }

      const num = ethers.BigNumber.from(sum.toString());
      const teamNum = ethers.BigNumber.from(
        gameInfo.data![gid].teams![teamId].length.toString()
      );
      const wa = ethers.utils.formatEther(
        // @ts-ignore: Object is possibly 'null'.
        gameInfo.data[gid].wage?.mul(num).div(teamNum).toString()
      );
      setWinWager(Number(wa).toFixed());
    }
  }, [gameInfo, fastRefresh]);
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
        <span className="text-base text-step font-Poppins drop-shadow-mdbg-transparent">
          In around 7 days
        </span>
      </div>
      {isJoined && (
        <div className="md:flex justify-start items-center flex-col mt-16">
          <span className="text-base text-step font-Zen  bg-transparent w-100">
            Winning amount
          </span>

          <span
            className="text-[32px] text-step font-Zen drop-shadow-md bg-transparent"
            style={{
              textShadow:
                "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
            }}
          >
            ETH {winWager}
          </span>
        </div>
      )}
      <TeamStatusList
        onClickVault={(_, index) => {
          setActiveVaultIndex(index);
        }}
      />
    </div>
  );
}
