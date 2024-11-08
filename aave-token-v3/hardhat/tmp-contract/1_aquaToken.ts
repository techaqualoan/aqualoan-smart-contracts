import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { COMMON_DEPLOY_PARAMS } from "../helpers/env";
import { AquaTokenV3 } from "../typechain";
import { ContractTransaction } from "ethers";

export const waitForTx = async (tx: ContractTransaction) => await tx.wait(1);

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, save } = deployments;
  const { deployer } = await getNamedAccounts();

  const aquaTokenArtifact = await deploy("AquaTokenV3", {
    contract: "AquaTokenV3",
    from: deployer,
    args: [],
    ...COMMON_DEPLOY_PARAMS,
  });

  await hre.run("verify:verify", {
    address: aquaTokenArtifact.address,
    constructorArguments: aquaTokenArtifact.args || [],
  });

  const aquaToken = (await hre.ethers.getContractAt(
    aquaTokenArtifact.abi,
    aquaTokenArtifact.address
  )) as AquaTokenV3;

  try {
    await waitForTx(
      await aquaToken.initialize()
    );
  } catch (error: any) {
    if (error.reason && error.reason.includes('Contract instance has already been initialized'))
      console.log(`[AQUA](AToken) Already initialized! continuing ...`)
    else
      throw error
  }
}

export default func;