import { ethers } from "ethers";
import {
  Contract,
  ContractCall,
  Provider,
  setMulticallAddress,
} from "ethers-multicall";

import TradeWarsJson from "../../utils/abis/TradeWars.json";

export const fetchGameInfo = async () => {
  const infuraUrl = process.env.NEXT_PUBLIC_INFURA_URL;
  const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
  setMulticallAddress(421613, "0x192e8eAD254c0bD71bBEB3F7Af9D3DE99a904616");
  const ethCallProvider = new Provider(provider, 421613);
  await ethCallProvider.init();

  const tradeContract = new Contract(
    "0xd8b2b4F698C5ce283Cf9c96A7BAC58E19b98f9e1",
    TradeWarsJson
  );
  var multiCalls: ContractCall[] = [tradeContract.totalGames()];
  const results = await ethCallProvider.all(multiCalls);
  if (results.length > 0) {
    const totalGames = Number(results[0]._hex);
    var gamesCall: ContractCall[] = [];
    for (var i = 0; i < totalGames; i++) {
      gamesCall.push(tradeContract.getGameInfo(i));
    }
    const gameResults = await ethCallProvider.all(gamesCall);
    var gamesStatus: ContractCall[] = [];
    for (var i = 0; i < totalGames; i++) {
      gamesStatus.push(tradeContract.games(i));
    }
    const games = await ethCallProvider.all(gamesStatus);

    return { gameCount: totalGames, data: gameResults, games: games };
  } else return { gameCount: 0, data: [], games: [] };
};
