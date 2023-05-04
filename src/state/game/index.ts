import { createSlice } from "@reduxjs/toolkit";

import { Game } from "../types";
import { fetchGameInfo } from "./fetchGames";
const initialState: Game = { gameCount: 0 };

export const gameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    setGamePublicData: (state, action) => {
      const liveGameData: Game = action.payload;
      // eslint-disable-next-line no-param-reassign
      // state.data = state.data.map((bond) => {
      //   const liveBondData = liveBondsData.find((b) => b.bid === bond.bid);
      //   return { ...bond, ...liveBondData };
      // });
      state.gameCount = liveGameData.gameCount;
    },
  },
});
export const { setGamePublicData } = gameSlice.actions;
export const fetchPublicDataAsync =
  (web3Provider: string, user: any) => async (dispatch: any) => {
    const games = await fetchGameInfo(web3Provider, user);
    dispatch(setGamePublicData(games));
  };
export default gameSlice.reducer;
