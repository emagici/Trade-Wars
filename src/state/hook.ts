import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useRefresh from "../hooks/useRefresh";
import { fetchPublicDataAsync } from "./actions";
import { Game } from "./types";

export const useGame = (): Game => {
  const game = useSelector((state: any) => state.game);
  return game;
};
export const useFetchPublicData = () => {
  const dispatch = useDispatch();
  const { fastRefresh } = useRefresh();
  useEffect(() => {
    dispatch(fetchPublicDataAsync());
  }, [dispatch, fastRefresh]);
};
