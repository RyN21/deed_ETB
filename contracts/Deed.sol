pragma solidity ^0.5.0;

// legal document a parent signs infront of lawyer that states how their assets will be distributed after they pass away
contract Deed {
  // 4 variables to a deed
  address public lawyer;
  address payable public beneficiary;
  uint public earliest;

  constructor(
    address _lawyer,
    address payable _beneficiary,
    uint fromNow)
    payable
    public {
      lawyer = _lawyer;
      beneficiary = _beneficiary;
      earliest = now + fromNow;
    }

  function withdraw() public {
    require(msg.sender == lawyer, 'Lawyer only.');
    require(now >= earliest, 'Too early.');
    // Below is stating that all the ether that is added when the contract is deployed will be transfered to the beneficiary
    beneficiary.transfer(address(this).balance);
  }
}
