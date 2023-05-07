import { BigNumber } from "ethers";

export interface GameStatus {
  creator?: string;
  status?: number;
  numTeams?: number;
  wage?: BigNumber;
  totalPlayers?: number;
  winningTeam?: number;
  feeCollected?: number;
}
export interface Game {
  creator?: string;
  status?: number;
  teams?: string[][];
  wage?: BigNumber;
}
export interface GameState {
  gameCount: number;
  data: Game[];
  games: GameStatus[];
}
