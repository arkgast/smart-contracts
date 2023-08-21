import "@nomicfoundation/hardhat-toolbox";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { HardhatUserConfig, task, subtask, types } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { join } from "path";

const FRONTEND_CONTRACTS_PATH = "./frontend/src/contracts";

interface ExportAbiTaskArguments extends TaskArguments {
  contractName: string;
  contractAddress: string;
}

task("export-abi", "Export ABI")
  .addParam("contractName", "Contract name")
  .addParam("contractAddress", "Contract address")
  .setAction(
    async (
      taskArguments: ExportAbiTaskArguments,
      hre: HardhatRuntimeEnvironment
    ) => {
      await hre.run("export-abi:ensure-abi-folder");

      await hre.run("export-abi:write-abi", taskArguments);
    }
  );

subtask(
  "export-abi:ensure-abi-folder",
  "Ensures the frontend abi folder exists",
  async (_, hre: HardhatRuntimeEnvironment) => {
    const utilsPath = join(hre.config.paths.root, FRONTEND_CONTRACTS_PATH);

    if (!existsSync(utilsPath)) {
      mkdirSync(utilsPath);
    }
  }
);

subtask(
  "export-abi:write-abi",
  "Writes the abi to the frontend abi folder",
  async (
    { contractName, contractAddress }: ExportAbiTaskArguments,
    hre: HardhatRuntimeEnvironment
  ) => {
    const artifact = hre.artifacts.readArtifactSync(contractName);
    const contractsPath = join(hre.config.paths.root, FRONTEND_CONTRACTS_PATH);

    // write contract artifact
    const contractFilePath = join(contractsPath, `${contractName}.json`);
    writeFileSync(contractFilePath, JSON.stringify(artifact, null, 2));

    // write contract address
    const contractAddressFilePath = join(
      contractsPath,
      `${contractName}-address.json`
    );
    writeFileSync(
      contractAddressFilePath,
      JSON.stringify({ contractAddress }, null, 2)
    );
  }
);

task("automine", "Automine blocks")
  .addParam("interval", "Interval in milliseconds", 2000, types.int)
  .addOptionalParam("enabled", "Enable automine", true, types.boolean)
  .setAction(
    async (
      taskArguments: { interval: number; enabled: boolean },
      hre: HardhatRuntimeEnvironment
    ) => {
      const { interval, enabled } = taskArguments;
      await hre.network.provider.send("evm_setAutomine", [enabled]);

      if (enabled) return;
      await hre.network.provider.send("evm_setIntervalMining", [interval]);
    }
  );

task("mine", "Mine a block")
  .addParam("amount", "Amount of blocks to mine", 1, types.int)
  .setAction(
    async (
      taskArguments: { amount: number },
      hre: HardhatRuntimeEnvironment
    ) => {
      const { amount } = taskArguments;
      const { provider } = hre.network;

      for (let i = 0; i < amount; i++) {
        await provider.send("evm_mine");
      }
    }
  );

const config: HardhatUserConfig = {
  solidity: "0.8.16",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      loggingEnabled: true,
      mining: {
        auto: false,
        interval: 2000,
      },
    },
  },
};

export default config;
