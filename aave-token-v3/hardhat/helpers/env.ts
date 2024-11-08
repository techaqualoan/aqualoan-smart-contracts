import { DETERMINISTIC_DEPLOYMENT } from "./hardhat-config-helpers";

export const COMMON_DEPLOY_PARAMS = {
  log: true,
  deterministicDeployment: DETERMINISTIC_DEPLOYMENT ?? false,
};
