var Migrations = artifacts.require("./Migrations.sol");
var Maps = artifacts.require("./Maps.sol");


module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Maps);
};
