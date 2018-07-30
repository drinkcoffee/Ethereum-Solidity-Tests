pragma solidity ^0.4.23;

/**
 * Compare the gas costs of using a map with different key types.
 *
 */
contract Maps {
    // Must be private to avoid error:
    // UnimplementedFeatureError: Accessors for mapping with dynamically-sized keys not yet implemented.
    mapping(string => uint256) private mapStringUint256;
    mapping(uint256 => uint256) private mapUint256Uint256;


    function setStringUint256(string key, uint256 value) public {
        mapStringUint256[key] = value;
    }

    function setUint256Uint256(uint256 key, uint256 value) public {
        mapUint256Uint256[key] = value;
    }

    function getStringUint256(string key) public view returns (uint256 ret){
        return mapStringUint256[key];
    }

    function getUint256Uint256(uint256 key) public view returns (uint256 ret){
        return mapUint256Uint256[key];
    }

    function getStringUint256NotView(string key) public {
        mapStringUint256[key];
    }

    function getUint256Uint256NotView(uint256 key) public {
        mapUint256Uint256[key];
    }

}