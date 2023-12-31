import { useState } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import Web3 from "web3";
import {
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS,
  SALE_NFT_ABI,
  SALE_NFT_ADDRESS,
} from "@/web3.config";

const CHAIN_ID_MUMBAI = 80001;

const MMSDK = new MetaMaskSDK();

const ethereum = MMSDK.getProvider();

const web3 = new Web3(ethereum);

const mintNftContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS);
const saleNftContract = new web3.eth.Contract(SALE_NFT_ABI, SALE_NFT_ADDRESS);

export const useMetamask = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      const accounts: any = await ethereum?.request({
        method: "eth_requestAccounts",
        params: [],
      });

      setAccount(accounts[0]);

      if (parseInt(ethereum?.networkVersion as string) !== CHAIN_ID_MUMBAI) {
        await ethereum?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Mumbai",
              chainId: web3.utils.toHex(CHAIN_ID_MUMBAI),
              nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { account, setAccount, getAccount };
};

export const useWeb3 = () => {
  return { web3, mintNftContract, saleNftContract };
};
