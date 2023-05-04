import GameList from "@/components/common/GameList";
import JumpBtn from "@/components/common/JumpBtn";
import { News } from "@/components/vaults";
import { Vault } from "@/types/vault";
import Image from "next/image";
import { useState } from "react";

export default function JoinGame() {
  const [activeVaultIndex, setActiveVaultIndex] = useState(0);

  return (
    <div className="flex flex-col tracking-wide aspect-[1930/1080] bg-trader bg-cover">
      <div className="flex justify-center items-center flex-row mt-2">
        <div className="flex flex-col justify-center items-center mr-4">
          <div className="flex justify-center items-center w-[41px] h-[41px] font-Zen text-base bg-step rounded-full text-black">
            1
          </div>
          <span
            className="text-xs font-Zen text-stepTitle mt-2"
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
          className="text-3.5xl text-step font-Zen  bg-transparent"
          style={{
            textShadow: "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
          }}
        >
          JOIN A GAME
        </span>
        <span className="text-base text-white font-Poppins  bg-transparent w-100">
          Following are the{" "}
          <span className="text-yellow font-Poppins ">games</span> to
          <span className="text-yellow font-Poppins "> join</span>
        </span>
      </div>
      <div className="bg-black h-[1px]  w-screen bg-gradient-to-r from-grad1 from-0% via-grad2 via-50% to-grad3 to-90%" />
      <GameList
        onClickVault={(_, index) => {
          setActiveVaultIndex(index);
        }}
      />
    </div>
  );
}
