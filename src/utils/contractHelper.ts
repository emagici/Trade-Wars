import { getMulticallAddress } from "./addressHelpers";
import { ethers } from "ethers";
// import { AbiItem } from "./ABI";
// Addresses
import MultiCallAbi from "./abis/multicall.json";

// eslint-disable-next-line consistent-return
const getContract = (abi: any, address: string, web3Provider: string) => {
  //   const currentWeb3 = new Web3(web3Provider);
  return new ethers.Contract(abi, address);
};

const getMulticallContract = (web3Provider: string) =>
  getContract(MultiCallAbi, getMulticallAddress(), web3Provider);
export default getMulticallContract;
