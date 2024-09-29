import { task } from "hardhat/config";
import {
  eNetwork,
  getAaveProtocolDataProvider,
  getAddressFromJson,
  getArtifactsFromJson,
  getPoolConfiguratorProxy,
  POOL_CONFIGURATOR_PROXY_ID,
  POOL_DATA_PROVIDER,
} from "../../helpers";

task(`verify-contracts`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const network = hre.network.name as eNetwork;
    const dataProvider = await getAaveProtocolDataProvider(
      await getAddressFromJson(network, POOL_DATA_PROVIDER)
    );
    // 1. 
    const artifacts = await getArtifactsFromJson(network)
    for (const artifact of artifacts)
      try {
        console.log(`[AQUA] --------------- verifying ${artifact.address} args:(${artifact.args}) `)
        await hre.run("verify:verify", {
          address: artifact.address,
          constructorArguments: artifact.args || [],
        });
      } catch (error) {
        console.error(error);
      }
  }
);
