import { HardhatRuntimeEnvironment } from "hardhat/types";
import { COMMON_DEPLOY_PARAMS } from "../helpers/env";
import { ContractTransaction } from "ethers";
import { DeployFunction } from "hardhat-deploy/dist/types";

export const waitForTx = async (tx: ContractTransaction) => await tx.wait(1);

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, save } = deployments;
  const { deployer } = await getNamedAccounts();

  const aquaTokenArtifact = await deploy("AQUA", {
    contract: "AQUA",
    from: deployer,
    args: ["AQUA Token", "AQUA", 100000000],
    ...COMMON_DEPLOY_PARAMS,
  });

  await hre.run("verify:verify", {
    address: aquaTokenArtifact.address,
    contract: "contracts/AQUA.sol:AQUA",
    constructorArguments: aquaTokenArtifact.args || [],
  });
}

export default func;