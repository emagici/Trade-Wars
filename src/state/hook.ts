import React, { useEffect } from "react";

import { fetchPublicDataAsync } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import useRefresh from "../hooks/useRefresh";

import { Game } from "./types";
export const useGame = (): Game => {
  const game = useSelector((state: any) => state.game.data);
  return game;
};
export const useFetchPublicData = (web3Provider: string, user: any) => {
  const dispatch = useDispatch();
  const { fastRefresh } = useRefresh();
  useEffect(() => {
    // dispatch(fetchFarmsPublicDataAsync(web3Provider, chainId, user));
    // dispatch(fetchJungleFarmsPublicDataAsync(web3Provider, chainId, user));
    dispatch(fetchPublicDataAsync(web3Provider, user));
  }, [dispatch, fastRefresh]);
};
