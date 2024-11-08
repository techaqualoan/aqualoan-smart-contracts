// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'forge-std/Script.sol';
import {AquaTokenV3} from '../src/AquaTokenV3.sol';
import "openzeppelin-contracts/contracts/utils/Strings.sol";

contract DeployAquaTokenV3 is Script {
  using Strings for address;

  function run() external {
    address deployer = vm.rememberKey(vm.envUint('PRIVATE_KEY'));

    console.log('Deployer address: %s', deployer);
    console.log('Chain: ', StdChains.getChain('holesky').rpcUrl);

    vm.createSelectFork(StdChains.getChain('holesky').rpcUrl);
    // vm.broadcast(deployer);

    vm.startBroadcast(deployer);
    AquaTokenV3 aquaToken = new AquaTokenV3(); // Deploy the contract
    console.log('AquaTokenV3 deployed -->', address(aquaToken));
    vm.stopBroadcast(); // Stop transaction broadcasting

    // Verify the contract
    // string memory etherscanApiKey = vm.envString('ETHERSCAN_API_KEY_MAINNET');
    // string memory contractAddress = Strings.toString(uint160(address(aquaToken)));

    // // Perform verification
    // vm.verify(
    //   etherscanApiKey,
    //   contractAddress,
    //   '../src/AquaTokenV3.sol', // Specify your contract file path
    //   ''
    // );
  }
}
