// SPDX-License-Identifier: MIT

/**

  This is an extension of the harnessed AquaTokenV3 with added getters on the _balances fields.
  The imported harnessed AquaTokenV3 contract uses uint8 instead of an enum for delegation state.

  This modification is introduced to bypass a current Certora Prover limitation on accessing
  enum fields inside CVL hooks

 */

pragma solidity ^0.8.0;

import {AquaTokenV3} from '../../src/AquaTokenV3.sol';
import {DelegationMode} from '../../src/DelegationAwareBalance.sol';

contract AquaTokenV3Harness is AquaTokenV3 {
  function getBalance(address user) public view returns (uint104) {
    return _balances[user].balance;
  }

  function getDelegatedPropositionBalance(address user) public view returns (uint72) {
    return _balances[user].delegatedPropositionBalance;
  }

  function getDelegatedVotingBalance(address user) public view returns (uint72) {
    return _balances[user].delegatedVotingBalance;
  }

  function getDelegatingProposition(address user) public view returns (bool) {
    uint8 state = uint8(_balances[user].delegationMode);
    return
      state == uint8(DelegationMode.PROPOSITION_DELEGATED) ||
      state == uint8(DelegationMode.FULL_POWER_DELEGATED);
  }

  function getDelegatingVoting(address user) public view returns (bool) {
    uint8 state = uint8(_balances[user].delegationMode);
    return
      state == uint8(DelegationMode.VOTING_DELEGATED) ||
      state == uint8(DelegationMode.FULL_POWER_DELEGATED);
  }

  function getVotingDelegatee(address user) public view returns (address) {
    return _votingDelegatee[user];
  }

  function getPropositionDelegatee(address user) public view returns (address) {
    return _propositionDelegatee[user];
  }

  function getDelegationMode(address user) public view returns (DelegationMode) {
    return _balances[user].delegationMode;
  }
}
