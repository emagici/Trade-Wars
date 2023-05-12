import { useWallet } from "@/hooks";
import Web3 from "web3";

// import { AbiItem } from "./ABI";
// Addresses
import MultiCallAbi from "./abis/multicall.json";
import { getMulticallAddress } from "./addressHelpers";

// eslint-disable-next-line consistent-return
const getContract = (abi: any, address: string) => {
  const infuraUrl = process.env.NEXT_PUBLIC_INFURA_URL;

  const currentWeb3 = new Web3(infuraUrl!);
  return new currentWeb3.eth.Contract(abi, address);
};

const getMulticallContract = () => {
  getContract(MultiCallAbi, getMulticallAddress());
};
export default getMulticallContract;
