import multicall from "../../utils/multicall";
import TradeWarsJson from "../../utils/abis/TradeWars.json";
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
  const gamesCount = await multicall(depoDeposit, calls, web3Provider);
};
