import { JsonRpcSigner, ethers } from "ethers";
import { contractAddress } from "../../contracts/SimpleStorage-address.json";
import SimpleStorage from "../../contracts/SimpleStorage.json";

// const CONTRACTS_PATH = "../../contracts/";

export const useContract = (
  contractName: string,
  account: JsonRpcSigner | null
) => {
  if (!account) {
    return [];
  }

  // const { contractAddress } = require(`${CONTRACTS_PATH}${contractName}-address.json`);
  // const { abi } = require(`${CONTRACTS_PATH}${contractName}.json`);

  const contract = new ethers.Contract(
    contractAddress,
    SimpleStorage.abi,
    account
  );

  return [contract];
};
