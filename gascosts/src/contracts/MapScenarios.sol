pragma solidity ^0.4.23;

/**
 * Test out gas usage for various map usages
 */
contract MapScenarios {
    struct Record {
        address addr1;
        address addr2;
        address addr3;
    }
    mapping(uint256=>Record) private records;

    mapping(uint256=>address) private addr1Map;
    mapping(uint256=>address) private addr2Map;
    mapping(uint256=>address) private addr3Map;


    function setUsingRecord(uint256 _key, address _a1, address _a2, address _a3) public {
        records[_key] = Record(_a1, _a2, _a3);
    }
    function setOneUsingRecord(uint256 _key, address _a1) public {
        records[_key] = Record(_a1, address(0), address(0));
    }
    function setTwoUsingRecord(uint256 _key, address _a1, address _a2) public {
        records[_key] = Record(_a1, _a2, address(0));
    }
    function getOneUsingRecordFakeView(uint256 _key) public {
        records[_key].addr1;
    }



    function setUsingSeparate(uint256 _key, address _a1, address _a2, address _a3) public {
        addr1Map[_key] = _a1;
        addr2Map[_key] = _a2;
        addr3Map[_key] = _a3;
    }
    function setOneUsingSeparate(uint256 _key, address _a1) public {
        addr1Map[_key] = _a1;
    }
    function setTwoUsingSeparate(uint256 _key, address _a1, address _a2) public {
        addr1Map[_key] = _a1;
        addr2Map[_key] = _a2;
    }
    function getOneUsingSeparateFakeView(uint256 _key) public {
        addr1Map[_key];
    }


}