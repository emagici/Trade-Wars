import { useRouter } from "next/router";
import React from "react";

type Props = {
  gameID: number;
};
const JoinGameBtn = ({ gameID }: Props) => {
  const router = useRouter();

  const handleConnect = () => {
    router.push({
      pathname: "/SelectTeam",
      query: {
        gid: gameID,
      },
    });
  };

  return (
    <button
      className="rounded w-[70px] h-[25px] px-4 py-1 bg-tableHeader hover:bg-yellow z-50 drop-shadow-join"
      onClick={handleConnect}
      style={{
        background:
          "linear-gradient(0deg, #43372C, #43372C),linear-gradient(180deg, #866D53 0%, rgba(100, 83, 65, 0) 100%)",
      }}
    >
      <span className="text-[12px] font-Zen text-btnText">JOIN</span>
    </button>
  );
};

export default JoinGameBtn;
