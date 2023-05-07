import { useRouter } from "next/router";

const JumpBtn = () => {
  const router = useRouter();

  const handleConnect = async () => {
    router.push("/JoinGame");
  };

  return (
    <button
      className="text-yellow rounded-none	 w-[156px] h-[51px] px-4 py-1 bg-btn hover:bg-yellow mt-[180px] z-50"
      onClick={handleConnect}
    >
      <span className="text-base font-Zen text-header">JUMP IN!</span>
    </button>
  );
};

export default JumpBtn;
