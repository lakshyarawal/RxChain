//const Migrations = artifacts.require("Migrations");
const counter = artifacts.require("counter");
const RxChain = artifacts.require("RxChain");

module.exports = function(deployer) {
  //deployer.deploy(Migrations); 
  deployer.deploy(counter);

  deployer.deploy(RxChain);
};
