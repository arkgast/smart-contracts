import { JsonRpcSigner } from "ethers";
import { useState } from "react";
import { useProvider } from "./provider";

export const useAccount = (): [JsonRpcSigner | null, () => Promise<void>] => {
  const [account, setAccount] = useState<JsonRpcSigner | null>(null);
  const [provider] = useProvider();

  async function connectAccount() {
    const signers = await provider?.getSigner();
    if (account) return;

    if (signers) {
      setAccount(signers);
    }
  }

  return [account, connectAccount];
};
