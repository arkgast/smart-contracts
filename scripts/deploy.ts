import { ethers, run } from "hardhat";

async function main() {
  const contractName = "SimpleStorage";
  const simpleStorageFactory = await ethers.getContractFactory(contractName);
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();

  const contractAddress = await simpleStorage.getAddress();
  console.log("SimpleStorage deployed to:", contractAddress);

  run("export-abi", {
    contractName: contractName,
    contractAddress: contractAddress,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
