pragma solidity ^0.5.0;

// legal document a parent signs infront of lawyer that states how their assets will be distributed after they pass away
contract Deed {
  // 4 variables to a deed
  address public lawyer;
  address payable public beneficiary;
  uint public amount;
  uint public earliest;

  constructor(
    address _lawyer,
    address payable _beneficiary,
    uint _amount,
    uint fromNow)
    payable
    public {
      require(_amount == msg.value);
      lawyer = _lawyer;
      beneficiary = _beneficiary;
      earliest = now + fromNow;
    }

  function withdraw() public {
    require(msg.sender == lawyer);
    require(now >= earliest);
  }
}
