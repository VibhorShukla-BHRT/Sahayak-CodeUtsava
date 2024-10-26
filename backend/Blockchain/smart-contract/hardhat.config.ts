import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
};


const ALCHEMY_API_KEY="https://eth-mainnet.g.alchemy.com/v2/k2ApPSDZbCFY7YNvsew2mK5m2KVGc-aq"
const ETH_PRIV_KEY="213f25c7315509e1b0862f4714ec45b306327be44754d8919ac0e7f2f25c23a2"

export default config;
