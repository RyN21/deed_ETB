pragma solidity ^0.5.0;

// legal document a parent signs infront of lawyer that states how their assets will be distributed after they pass away
contract Deed {
  // 4 variables to a deed
  address public lawyer;
  address payable public beneficiary;
  uint public amount;
  uint public earliest;
}
