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
    assert(finalBalance.sub(initialBalance).toNumber === 100);
  });

  it('Should NOT withdraw too early', async () => {
    try {
      await deed.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('Too early');
      return;
    }
    assert(false);
  });
});
