pragma solidity ^0.4.23;

/**
 * Compare the gas costs of using bytes with various data sizes.
 * Based on http://solidity.readthedocs.io/en/develop/miscellaneous.html?highlight=storage
 * the data length is stored with the data when there are 0 to 31 bytes, and stored
 * separately for 32 bytes or more.
 * As such:
 * - one word should be used for 0 to 31 bytes,
 * - two words should be used for 32 bytes,
 * - three words should be used for 33 to 64 bytes.
 *
 * In addition, there is a additional word stored for the offset pointer.

 */
contract Bytes {
    bytes value;

    function setBytes(bytes _value) public {
        value = _value;
    }
}