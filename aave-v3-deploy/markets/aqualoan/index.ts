import { eBscNetwork, eOptimismNetwork } from "./../../helpers/types";
import { ZERO_ADDRESS } from "../../helpers";
import {
  IAaveConfiguration,
  eEthereumNetwork,
} from "../../helpers/types";

import { CommonsConfig } from "./commons";
import {
  strategyDAI,
  strategyUSDC,
  strategyAAVE,
  strategyLINK,
  strategyWBTC,
  strategyWETH,
  strategyUSDT,
  strategyEURS,
  strategyETH,
  strategyFDUSD,
  strategyBNB,
} from "./reservesConfigs";

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const AqualoanMarket: IAaveConfiguration = {
  ...CommonsConfig,
  MarketId: "Aqualoan Market",
  ATokenNamePrefix: "Aq",
  StableDebtTokenNamePrefix: "Aq",
  VariableDebtTokenNamePrefix: "Aq",
  SymbolPrefix: "Aq",
  ProviderId: 30,
  ReservesConfig: {
    DAI: strategyDAI,
    LINK: strategyLINK,
    USDC: strategyUSDC,
    WBTC: strategyWBTC,
    WETH: strategyWETH,
    USDT: strategyUSDT,
    AAVE: strategyAAVE,
    EURS: strategyEURS,
    ETH: strategyETH,
    FDUSD: strategyFDUSD,
    WBNB: strategyBNB
  },
  ReserveAssets: {
    [eEthereumNetwork.main]: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      EURS: "0xdb25f211ab05b1c97d595516f45794528a807ad8",
    },
    [eBscNetwork.main]: {
      DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      LINK: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
      USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      WBTC: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
      WETH: "0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA",
      USDT: "0x55d398326f99059fF775485246999027B3197955",
      AAVE: "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
      EURS: "0x12f31B73D812C6Bb0d735a218c086d44D5fe5f89",
      ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      FDUSD: '0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409',
      WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    },
  },
  StkAaveProxy: {
    [eEthereumNetwork.main]: "0x4da27a545c0c5B758a6BA100e3a049001de870f5",
  },
};

export default AqualoanMarket;
