import addresses from "../constants/constant";
import { Address } from "./types";

export const getAddress = (address: Address): string => address["test"];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMulticallAddress = () => getAddress(addresses.multiCall);
