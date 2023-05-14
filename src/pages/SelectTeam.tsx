import TeamList from "@/components/common/TeamList";
import { useWallet } from "@/hooks";
import { useFetchPublicData } from "@/state/hook";
import { useGame } from "@/state/hook";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SelectTeam() {
  const [winWager, setWinwager] = useState("0.0");
  const [wager, setGameWager] = useState("0");
  const { account } = useWallet();
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  useEffect(() => {
    var rowData: any[] = [];
    const gid = Number(router.query.gid);
    if (gameInfo.data !== undefined && gameInfo.data.length > 0) {
      // @ts-ignore: Object is possibly 'null'.
      const wa = ethers.utils.formatEther(gameInfo.data[gid].wage);
      setGameWager(wa);
    }
  }, [gameInfo]);
  return (
    <div className="flex flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover">
      <div className="flex justify-center items-center flex-row mt-2">
        <div className="flex flex-col justify-center items-center mr-4">
          <div className="flex justify-center items-center w-[41px] h-[41px] font-Zen text-base bg-step rounded-full text-black">
            1
          </div>
          <span
            className="text-xs font-Zen text-stepTitle mt-2 drop-shadow-title"
            style={{
              textShadow:
                "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
            }}
          >
            JOIN A GAME
          </span>
        </div>
        <div className="flex flex-col justify-center items-center w-[50px] h-[4px] bg-stepInActive"></div>

        <div className="flex flex-col justify-center items-center ml-4">
          <div className="flex justify-center items-center w-[41px] h-[41px] font-Zen text-base bg-stepInActive rounded-full text-stepText">
            2
          </div>
          <span className="text-xs font-Zen text-stepTitle mt-2">START</span>
        </div>
      </div>

      <div className="md:flex justify-start items-center flex-col px-7.5 xl:px-20 py-10">
        <span
          className="text-3.5xl text-yellow font-Zen drop-shadow-md	 bg-transparent"
          style={{
            textShadow: "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
          }}
        >
          JOIN A GAME
        </span>
        <span className="text-base text-white font-Poppins  bg-transparent w-100">
          Review the
          <span className="text-yellow font-Poppins "> game</span> before
          starting
        </span>
      </div>
      <div className="bg-black h-[1px]  w-screen bg-gradient-to-r from-grad1 from-0% via-grad2 via-50% to-grad3 to-90%" />
      <div className="md:flex justify-start items-center flex-col px-7.5 xl:px-20 py-10">
        <span className="text-base text-yellow font-Zen  bg-transparent w-100">
          Wager Amount
        </span>

        <span className="text-[24px] text-step font-Zen drop-shadow-md	 bg-transparent">
          ETH {wager}
        </span>
      </div>
      <div className="md:flex justify-start items-center flex-col">
        <span className="text-base text-step font-Zen  bg-transparent w-100">
          Winning amount would be
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
      <TeamList
        onClickVault={(idx) => {
          if (gameInfo.data !== undefined && gameInfo.data.length > 0) {
            const gid = Number(router.query.gid);
            // @ts-ignore: Object is possibly 'null'.
            var sum = 0;
            gameInfo.data![gid].teams!.map((item: any, idx: number) => {
              sum += gameInfo.data![gid].teams![idx].length;
            });
            const num = ethers.BigNumber.from((sum + 1).toString());
            const teamNum = ethers.BigNumber.from(
              (gameInfo.data![gid].teams![idx - 1].length + 1).toString()
            );
            const wa = ethers.utils.formatEther(
              // @ts-ignore: Object is possibly 'null'.
              gameInfo.data[gid].wage?.mul(num).div(teamNum).toString()
            );
            setWinwager(wa); // @ts-ignore: Object is possibly 'null'.
          }
        }}
      />
    </div>
  );
}
