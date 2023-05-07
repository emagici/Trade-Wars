import { createSlice } from "@reduxjs/toolkit";

import { Game, GameState } from "../types";
import { fetchGameInfo } from "./fetchGames";

const initialState: GameState = { gameCount: 0, data: [], games: [] };

export const gameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    setGamePublicData: (state, action) => {
      const liveGameData: GameState = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.games = liveGameData.games;
      state.data = liveGameData.data;
      state.gameCount = liveGameData.gameCount;
    },
  },
});
export const { setGamePublicData } = gameSlice.actions;
export const fetchPublicDataAsync = () => async (dispatch: any) => {
  const games = await fetchGameInfo();
  dispatch(setGamePublicData(games));
};
export default gameSlice.reducer;
