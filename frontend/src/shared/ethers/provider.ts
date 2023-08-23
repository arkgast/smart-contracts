import { ethers } from "ethers";

export const useProvider = (): [ethers.BrowserProvider] | [] => {
  if (!window.ethereum) {
    console.log("Make sure you have MetaMask installed!");
    return [];
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  return [provider];
};

// {
//   "inputs": [],
//   "name": "newMethod",
//   "outputs": [
//     {
//       "internalType": "uint8",
//       "name": "",
//       "type": "uint8"
//     }
//   ],
//   "stateMutability": "pure",
//   "type": "function"
// },
//
