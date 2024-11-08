export enum eFantomNetwork {
  main = "fantom",
  testnet = "fantom-testnet",
}

export enum eOptimismNetwork {
  main = "optimism",
  testnet = "optimism-testnet",
}

export enum eEthereumNetwork {
  buidlerevm = "buidlerevm",
  kovan = "kovan",
  ropsten = "ropsten",
  main = "main",
  coverage = "coverage",
  hardhat = "hardhat",
  tenderly = "tenderly",
  rinkeby = "rinkeby",
  goerli = "goerli",
  sepolia = "sepolia",
  holesky = "holesky",
}

export enum eBaseNetwork {
  base = "base",
  baseGoerli = "base-goerli",
}

export enum ePolygonNetwork {
  polygon = "polygon",
  mumbai = "mumbai",
}

export enum eXDaiNetwork {
  xdai = "xdai",
}

export enum eAvalancheNetwork {
  avalanche = "avalanche",
  fuji = "fuji",
}

export enum eArbitrumNetwork {
  arbitrum = "arbitrum",
  arbitrumTestnet = "arbitrum-testnet",
  goerliNitro = "arbitrum-goerli",
}

export enum eHarmonyNetwork {
  main = "harmony",
  testnet = "harmony-testnet",
}

export enum eBscNetwork {
  main = "bsc",
  testnet = "bsc-testnet",
}

export enum EthereumNetworkNames {
  kovan = "kovan",
  ropsten = "ropsten",
  main = "main",
  matic = "matic",
  mumbai = "mumbai",
  xdai = "xdai",
  avalanche = "avalanche",
  fuji = "fuji",
}

type eTenderlyNetwork = "tenderly";

export type eNetwork =
  | eEthereumNetwork
  | ePolygonNetwork
  | eXDaiNetwork
  | eAvalancheNetwork
  | eArbitrumNetwork
  | eHarmonyNetwork
  | eFantomNetwork
  | eOptimismNetwork
  | eTenderlyNetwork
  | eBaseNetwork
  | eBscNetwork;

export type iParamsPerNetwork<T> = {
  [k in eNetwork]?: T;
};
