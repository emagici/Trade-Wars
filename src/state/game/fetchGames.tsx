import TradeWarsJson from "../../utils/abis/TradeWars.json";
import multicall from "../../utils/multicall";

export const fetchGameInfo = async (
  web3Provider: string,
  //   chainId: string,
  account: string
) => {
  //   const calls = bondsConfig.map((bond) => {
  //     const lpContractAddress = bond.contractAddress[chainId];
  //     return {
  //       address: lpContractAddress,

  //       name: "getGameInfo",

  //       params: [],
  //     };
  //   });
  //   const rawLpAllowances = await multicall(depoDeposit, calls, web3Provider);
  //   const parsedLpAllowances = rawLpAllowances.map((item: any) => {
  //     const data = item;
  //     return {
  //       lastBlock: item["lastBlock"],
  //       payout: item["payout"],
  //       pricePaid: item["pricePaid"],
  //       vesting: item["vesting"],
  //     };
  //   });
  //   return parsedLpAllowances;
  const gameCalls = [
    {
      address: "0xd8b2b4F698C5ce283Cf9c96A7BAC58E19b98f9e1",
      name: "totalGames",
      params: [],
    },
  ];
  const gamesCount = await multicall(TradeWarsJson, gameCalls, web3Provider);
  console.log(gamesCount);
  return { total: gamesCount };
};
