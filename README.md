# Aave V3 Deployments

[![npm (scoped)](https://img.shields.io/npm/v/@aave/deploy-v3)](https://www.npmjs.com/package/@aave/deploy-v3)

This Node.js repository contains the configuration and deployment scripts for the Aave V3 protocol core and periphery contracts. The repository makes use of `hardhat` and `hardhat-deploy` tools to facilitate the deployment of Aave V3 protocol.

## Requirements

- Node.js >= 16
- Alchemy key
  - If you use a custom RPC node, you can change the default RPC provider URL at [./helpers/hardhat-config-helpers.ts:25](./helpers/hardhat-config-helpers.ts).
- Etherscan API key _(Optional)_

## Getting Started

1. Install Node.JS dependencies:

   ```
   npm i
   ```
2. Compile contracts before running any other command, to generate Typechain TS typings:

   ```
   npm run compile
   ```

## How to deploy Aave V3 in testnet network

To deploy Aave V3 in a Testnet network, copy the `.env.example` into a `.env` file, and fill the environment variables `MNEMONIC`, and `ALCHEMY_KEY`.

```
cp .env.example .env
```

Edit the `.env` file to fill the environment variables `MNEMONIC`, `ALCHEMY_KEY` and `MARKET_NAME`. You can check all possible pool configurations in this [file](https://github.com/aave/aave-v3-deploy/blob/09e91b80aff219da80f35a9fc55dafc5d698b574/helpers/market-config-helpers.ts#L95).

```
nano .env
```

Run the deployments scripts and specify which network & aave market configs you wish to deploy.

```
HARDHAT_NETWORK=goerli npx hardhat deploy
```

## How to deploy Aave V3 in fork network

You can use the environment variable `FORK` with the network name to deploy into a fork.

```
FORK=main MARKET_NAME=Aave npx hardhat deploy
```

## How to integrate in your Hardhat project

You can install the `@aave/deploy-v3` package in your Hardhat project to be able to import deployments with `hardhat-deploy` and build on top of Aave in local or testnet network.

To make it work, you must install the following packages in your project:

```
npm i --save-dev @aave/deploy-v3 @aave/core-v3 @aave/periphery-v3
```

Then, proceed to load the deploy scripts adding the `externals` field in your Hardhat config file at `hardhat.config.js|ts`.

```
# Content of hardhat.config.ts file

export default hardhatConfig: HardhatUserConfig = {
   {...},
   external: {
    contracts: [
      {
        artifacts: 'node_modules/@aave/deploy-v3/artifacts',
        deploy: 'node_modules/@aave/deploy-v3/dist/deploy',
      },
    ],
  },
}
```

After all is configured, you can run `npx hardhat deploy` to run the scripts or you can also run it programmatically in your tests using fixtures:

```
import {getPoolAddressesProvider} from '@aave/deploy-v3';

describe('Tests', () => {
   before(async () => {
      // Set the MARKET_NAME env var
      process.env.MARKET_NAME = "Aave"

      // Deploy Aave V3 contracts before running tests
      await hre.deployments.fixture(['market', 'periphery-post']);`
   })

   it('Get Pool address from AddressesProvider', async () => {
      const addressesProvider = await getPoolAddressesProvider();

      const poolAddress = await addressesProvider.getPool();

      console.log('Pool', poolAddress);
   })
})

```

## How to verify your contract deployments

```
npx hardhat --network XYZ etherscan-verify --api-key YZX
```

## Project Structure

| Path                    | Description                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| deploy/                 | Main deployment scripts dir location                                                                                            |
| ├─ 00-core/           | Core deployment, only needed to run once per network.                                                                           |
| ├─ 01-periphery_pre/  | Periphery contracts deployment, only need to run once per network.                                                              |
| ├─ 02-market/         | Market deployment scripts, depends of Core and Periphery deployment.                                                            |
| ├─ 03-periphery_post/ | Periphery contracts deployment after market is deployed.                                                                        |
| deployments/            | Artifacts location of the deployments, contains the addresses, the abi, solidity input metadata and the constructor parameters. |
| markets/                | Directory to configure Aave markets                                                                                             |
| tasks/                  | Hardhat tasks to setup and review market configs                                                                                |
| helpers/                | Utility helpers to manage configs and deployments                                                                               |

## License

Please be aware that [Aave V3](https://github.com/aave/aave-v3-core) is under [BSUL](https://github.com/aave/aave-v3-core/blob/master/LICENSE.md) license as of 27 January 2023 or date specified at v3-license-date.aave.eth. The Licensor hereby grants you the right to copy, modify, create derivative works, redistribute, and make non-production use of the Licensed Work. Any exceptions to this license may be specified by Aave governance. This repository containing the deployment scripts for the Aave V3 smart contracts can only be used for local or testing purposes. If you wish to deploy to a production environment you can reach out to Aave Governance [here](https://governance.aave.com/).


## Contracts Deployed
| Name                                    | Address                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AAVE-AToken-Aave                        | 0xeeFbb4CDEA0051B1aCE87d4acB96555687548589
| AAVE-StableDebtToken-Aave               | 0x749Bb82FD734398016373C33DDAe15593B068CfA
| AAVE-VariableDebtToken-Aave             | 0xC948a495197eDeE58e8A80aA64e6378E264e7f9f
| ACLManager-Aave                         | 0xff7B54effCA3a1e2b58E4CE503BbF8A959dA0C66
| ACLManager-Aqualoan                     | 0xf8e3E5AEcd836372E472781f0f0f9671069E4f1e
| AToken-Aave                             | 0xB7b4A4814727d16aEe80168ad50aB716eD06Ff40
| AToken-Aqualoan                         | 0x4d0cd4b74A4f09B33AFfF69B7667a3376534EB55
| AaveOracle-Aave                         | 0xdf7702583214bfBEfCaF10087690F7933A4B0165
| AaveOracle-Aqualoan                     | 0x1866ff4f9c9A4EFBBccD3D4b5db4d98aB3Bf785d
| BorrowLogic                             | 0xA745B8449b8c30a36E13932C4B4C6Ed6E7ba59Cc
| BridgeLogic                             | 0x2BaF8d49D9baE459c12Ed8e09f4778d028AF9A8e
| ConfiguratorLogic                       | 0xd4cd389180d28d528e2559c13f9010ee5b11af27
| DAI-AToken-Aave                         | 0x1426647002c6CfA4c68e125237Cb8FFdcE5d5e5c
| DAI-StableDebtToken-Aave                | 0x9522f94fd753cb5F039e40D9dAb8db9e581fCF04
| DAI-VariableDebtToken-Aave              | 0xd947fe121858E58CfEC9fC66F80afCd27E7e95eB
| DelegationAwareAToken-Aave              | 0xDD3b106d2a48407161f81E6796D3060C11e30B4A
| DelegationAwareAToken-Aqualoan          | 0x45273A31cfc752f2c1989eFD2fB02333da434292
| EModeLogic                              | 0xc24f23cbFC39d8e0627f7a03dd0CD1D15820728c
| EURS-AToken-Aave                        | 0xF46354c23215f0666e1F454442fEbf8Dfaec19B3
| EURS-StableDebtToken-Aave               | 0x7102c06333ec6EBb7FD0dfbD9da404f10Bd229B3
| EURS-VariableDebtToken-Aave             | 0xabb612828c0a5f770257839e9A4Bc75C1a65181E
| EmissionManager                         | 0xC3Af6c84A950538b228025744039458AE456d39b
| Faucet-Aave                             | 0x9d46dc0145bBf7Fc4a8cc75763823dA2E5EE8e21
| FlashLoanLogic                          | 0x8047e5Bbc6b9713cE5Ef3171540aFb3dEA1886c5
| IncentivesProxy                         | 0xe84d523A9d51f2c6DcDE41A7C91cC2c6B3B6Bc70
| IncentivesV2-Implementation             | 0xc0272b5eec6AF001723dFB03EB1773d6Bcf9Fd0D
| LINK-AToken-Aave                        | 0x38E3f51BDD332B4D0DFfdd651B19856EeD4335A2
| LINK-StableDebtToken-Aave               | 0x8946c6AD8a7e7b186BcEF669449cb7b5e706Ea67
| LINK-VariableDebtToken-Aave             | 0x4b10846E9B62330695AF6fC0a3FE4fb72cb6429F
| LiquidationLogic                        | 0xAFd96673F3C55fEda82B61380268d862d3b4D255
| Pool-Implementation                     | 0x0821D7834773Dc3A324959ebcc4B74A2b2A9C1e4
| Pool-Proxy-Aave                         | 0xe46499Cf554b88EeDad6614510CBce5CCEed91B3
| Pool-Proxy-Aqualoan                     | 0x751107834436ad0d08a4c6D9Cc82031D5088999C
| PoolAddressesProvider-Aave              | 0x3B8E4D8AE130984CcFA4E9860E4c4DcD11Db751c
| PoolAddressesProvider-Aqualoan          | 0xA9aD669442f9ABEd99b6B4a803BDae0746FEa220
| PoolAddressesProviderRegistry           | 0xB6EE31AaD406C6DaA2A62AB074726cc7Fa23fF3f
| PoolConfigurator-Implementation         | 0x7468D731a151c2161A0E01ad1b2f22C183f4dF98
| PoolConfigurator-Proxy-Aave             | 0x42f468b48D16d2626aa248797447D0D1FfcaC5f2
| PoolConfigurator-Proxy-Aqualoan         | 0x85615611FFD1Ee407A8a28Aab36babf675840cDd
| PoolDataProvider-Aave                   | 0x4A0fE4b17a4E7773f9251c8D141076Cddc8D04Db
| PoolDataProvider-Aqualoan               | 0xDc33eAA50B8707f791478Cec324e451E20FDa7ed
| PoolLogic                               | 0xb9b0c74084390295164b1DEBEEa6759aB1E47Cf5
| ReserveStrategy-rateStrategyStableOne   | 0x7373b3472CAA3f465b908c8876de772374728C1E
| ReserveStrategy-rateStrategyStableTwo   | 0x4FCCf8b93441F3a861efFf44382B2200dD76467E
| ReserveStrategy-rateStrategyVolatileOne | 0xaBA569AB96B12F18e556B470277dFd14c24496bF
| ReservesSetupHelper                     | 0x699ebC4C8d0c4a3fb1721840Ae75EEeA09D1a608
| StableDebtToken-Aave                    | 0x8Fc8a7d032b9C602f1a9106C5f1C9e56d817f81D
| StableDebtToken-Aqualoan                | 0xa53fde6d01C9e38Ee38f8099d207881163F95C0F
| SupplyLogic                             | 0xb839b0e8972e34d77bB1e00fE65212b68C2BC693
| Treasury-Controller                     | 0xB63bfAAc0BbFa7fC36Ad52764684904D4Ce74F23
| Treasury-Implementation                 | 0x47076ECD5b9Ee7028365e532Ac947ED078728bE4
| TreasuryProxy                           | 0x918737Bd3fDCDDb2ae30De41e3e89806fC8228bf
| USDC-AToken-Aave                        | 0x02BA05627d33c95807a06cc0DB05972eD3aF9B6D
| USDC-StableDebtToken-Aave               | 0x9d53752da8C7c191e41c6C67b9eb4207982124ea
| USDC-VariableDebtToken-Aave             | 0x479BBa7675b00cF4f27Ef0E00F248ACD1E80EB86
| USDT-AToken-Aave                        | 0xE5cC5280D72770cf7Ff530a9373dA8F0135AEc67
| USDT-StableDebtToken-Aave               | 0x9eE86221982f4E4bB00C2A4dDEFF7B3c3d77981B
| USDT-VariableDebtToken-Aave             | 0x08F6828A284910Ea9E0EF2E94F6AC89203361FcC
| UiIncentiveDataProviderV3               | 0x2E15627381392816b5B55Ac64dE77746bD558479
| UiPoolDataProviderV3                    | 0x1B4776a1d5d77f5fBBfc334DCF0346ed6c84432a
| VariableDebtToken-Aave                  | 0x9E194A54543dbF3A51F6D7830224c458062A2615
| VariableDebtToken-Aqualoan              | 0x4E928E9F8809929DA4501Af3bc68B57b1e79cFf7
| WBTC-AToken-Aave                        | 0x9f4ef5dA033EF2C31E380567e81cE6F3e68565d7
| WBTC-StableDebtToken-Aave               | 0x205929E9612739599782AE5c672AFDbEcEA81999
| WBTC-VariableDebtToken-Aave             | 0xB42485672a2CbDA08006b7f10E6DaEB6ceE68c9E
| WETH-AToken-Aave                        | 0x053699119842BAf1b3D2890336d9407B893091a3
| WETH-StableDebtToken-Aave               | 0xd47a8e3132cEEe57A250E27A3d83aA12468e222b
| WETH-VariableDebtToken-Aave             | 0x7339bba9eA50dd8cFD604906397c8343557aa1ec
| WalletBalanceProvider                   | 0x6AcE9EC5ACCe1210700E7126176351dF1b7bd4e9
| WrappedTokenGatewayV3                   | 0x33620e485Bb2278D9B25551bf078c2cEEE159c16
| DAI-AToken-Aqualoan                     | 0x3116a040165CD5D10a58F630594e571E766cc8E4
| DAI-VariableDebtToken-Aqualoan          | 0x5C990a434e1D6474aFD41835af80E847a293C2d1
| DAI-StableDebtToken-Aqualoan            | 0x637c9D51d0821393317A1Fc04e2a04d12e207C4a
| LINK-AToken-Aqualoan                    | 0xDBF5Aa22233E108a1705697fA93bf0cC8a32AB38
| LINK-VariableDebtToken-Aqualoan         | 0xbC390F6983F6E43f3fD3D232b1475d7493fd5a01
| LINK-StableDebtToken-Aqualoan           | 0x22F4606046BA67eF01CBe50a9c30EFDd90f0Df70
| USDC-AToken-Aqualoan                    | 0x7FAB4CB5785aB5191d5e5E2C0DD20e57E8070D28
| USDC-VariableDebtToken-Aqualoan         | 0x5b928122181D09Ec0fcA3868A449b73570c0F205
| USDC-StableDebtToken-Aqualoan           | 0x8C43bFf7551C6B68e1f0F0c644B73f8d9feb1137
| WBTC-AToken-Aqualoan                    | 0x302132C7C45FB8f990867E0d0e315B1AE4bd8b15
| WBTC-VariableDebtToken-Aqualoan         | 0xd737db32E93a920CF022De34B2Ef4E643684080C
| WBTC-StableDebtToken-Aqualoan           | 0x8DaBc620Ed48E1dbD26e392286eA030B1Ec2e118
| WETH-AToken-Aqualoan                    | 0xD044004F1b56fE4221FDD0A901419aaC6E4f5483
| WETH-VariableDebtToken-Aqualoan         | 0xA977EeE34322CD3A78Ad7ed14E61CD2633E547b9
| WETH-StableDebtToken-Aqualoan           | 0x7C852757f09fFDd3e35C73E89a12B6eC77a24Af1
| USDT-AToken-Aqualoan                    | 0xE8a2F7a16Fe345A66E42fe0b5C3cf3d8EA001875
| USDT-VariableDebtToken-Aqualoan         | 0x8eFE4dA0cf3c929D0aA13a623f11a164Fe833408
| USDT-StableDebtToken-Aqualoan           | 0x6825F238C9CbCcC5d7c90A763b4bdA397021b967
| AAVE-AToken-Aqualoan                    | 0x5FCCaCE44c3e6F6CE16815B1b1D1c9399f0aFF1C
| AAVE-VariableDebtToken-Aqualoan         | 0x53c7D555262a85A5a33A8aa5EE0529901c4Bc8a5
| AAVE-StableDebtToken-Aqualoan           | 0xd8476982b52b624fF27dea52C63d0216D1f024dd
| BNB-AToken-Aqualoan                    | 0x2ED671186a86eEF55E7573466a10Da684bA1ca63
| BNB-VariableDebtToken-Aqualoan         | 0x6C015bCc0ef40C5e808efc77Cf8815c7320049fB
| BNB-StableDebtToken-Aqualoan           | 0xEEbf5807fa2BB6Ed78e507c9c0214d2E8af9e727
