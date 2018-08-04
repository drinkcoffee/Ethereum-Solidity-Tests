var Migrations = artifacts.require("./Migrations.sol");
var Maps = artifacts.require("./Maps.sol");
var Bytes = artifacts.require("./Bytes.sol");


module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Maps);
    deployer.deploy(Bytes);
};
