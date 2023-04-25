import { useRouter } from "next/router";

const JoinGameBtn = () => {
  const router = useRouter();

  const handleConnect = async () => {
    router.push("/SelectTeam");
  };

  return (
    <button
      className="rounded w-[70px] h-[25px] px-4 py-1 bg-tableHeader z-50 drop-shadow-join"
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
