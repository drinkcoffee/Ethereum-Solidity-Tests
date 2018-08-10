var Migrations = artifacts.require("./Migrations.sol");
var Maps = artifacts.require("./Maps.sol");
var Bytes = artifacts.require("./Bytes.sol");
var Simple = artifacts.require("./Simple.sol");
var MapScenarios = artifacts.require("./MapScenarios.sol");


module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Maps);
    deployer.deploy(Bytes);
    deployer.deploy(Simple);
    deployer.deploy(MapScenarios);
};
