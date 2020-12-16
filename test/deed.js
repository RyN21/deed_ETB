// This test I learned how to test time sensative contracts
// by creating a Promise that resolves after a certain amount of timeout
// Also had to deal with state management problems where one test re-suses
// a smart contract that was alread deployed before but is in a bad state for testing

const Deed = artifacts.require('Deed');

contract('Deed', (accounts) => {
  let deed = null;
  before(async () => {
    deed = await Deed.deployed();
  });
  it('Should withdraw ether to beneficiary', async () => {
    // Need to wait 5 seconds based on 'earliest' variable on deployed contract
    // So we use a promise and 'setTimout'
    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    await new Promise(resolve => setTimeout(resolve, 5000));
    await deed.withdraw({from: accounts[0]});
    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    assert(finalBalance.sub(initialBalance).toNumber() === 100);
  });

  it('Should NOT withdraw too early', async () => {
    // create new instance of contract OR Reset the contract
    const deed = await Deed.new(
      accounts[0],
      accounts[1],
      5,
      {value: 100}
    );
    try {
      await deed.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('Too early.'));
      return;
    }
    assert(false);
  });

  it('Should NOT withdraw if caller is not lawyer', async () => {
    const deed = await Deed.new(
      accounts[0],
      accounts[1],
      5,
      {value: 100}
    );
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await deed.withdraw({from: accounts[1]});
    } catch(e) {
      assert(e.message.includes('Lawyer only.'));
      return;
    }
    assert(false);
  });
});
