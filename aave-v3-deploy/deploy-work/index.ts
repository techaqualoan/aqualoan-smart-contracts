import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts();
  console.log(deployer)
  return true;
};

func.id = 'index';
func.dependencies = [
  "market", "init-reserves"
]

export default func;
