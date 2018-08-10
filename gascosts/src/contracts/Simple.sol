pragma solidity ^0.4.23;

/**
 * Measure gas costs for storing one, two and three words.
 */
contract Simple {
    uint256 u1;
    uint256 u2;
    uint256 u3;
    bytes32 b1;
    bytes32 b2;
    bytes32 b3;

    uint128 u4;
    uint256 padding1;
    uint128 u5;
    uint256 padding2;
    uint128 u6;
    uint256 padding3;
    uint128 u7;
    uint128 u8;
    uint256 padding4;
    uint8 u9;


    function initialiseAllMemoryFirst() public {
        u1 = 1;
        u2 = 1;
        u3 = 1;
        u4 = 1;
        u5 = 1;
        u6 = 1;
        u7 = 1;
        u8 = 1;
        u9 = 1;
        b1 = 1;
        b2 = 1;
        b3 = 1;
    }


    function setUint256(uint256 _u1) public {
        u1 = _u1;
    }
    function setTwoUint256(uint256 _u1) public {
        u1 = _u1;
        u2 = _u1;
    }
    function setThreeUint256(uint256 _u1) public {
        u1 = _u1;
        u2 = _u1;
        u3 = _u1;
    }

    function setBytes32(bytes32 _b1) public {
        b1 = _b1;
    }
    function setTwoBytes32(bytes32 _b1) public {
        b1 = _b1;
        b2 = _b1;
    }
    function setThreeBytes32(bytes32 _b1) public {
        b1 = _b1;
        b2 = _b1;
        b3 = _b1;
    }


    function setUint128(uint128 _u1) public {
        u4 = _u1;
    }
    function setTwoUint128(uint128 _u1) public {
        u4 = _u1;
        u5 = _u1;
    }
    function setThreeUint128(uint128 _u1) public {
        u4 = _u1;
        u5 = _u1;
        u6 = _u1;
    }

    function setUint128Scenario2(uint128 _u1) public {
        u7 = _u1;
    }
    function setTwoUint128Scenario2(uint128 _u1) public {
        u7 = _u1;
        u8 = _u1;
    }

    function setUint8(uint8 _u1) public {
        u9 = _u1;
    }

}