/// <reference types="vite/client" />
import { MetaMaskInpageProvider } from "@metamask/providers";

const sdk = new MetaMaskSDK();
sdk.getProvider();

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
