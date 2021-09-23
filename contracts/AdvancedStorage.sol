pragma solidity ^0.5.0;

contract AdvancedStorage {
    uint256[] public ids; //array of integers

    function add(uint256 id) public {
        // not pure, will modify blockhain
        ids.push(id);
    }

    function get(uint256 position) public view returns (uint256) {
        return ids[position];
    }

    function getAll() public view returns (uint256[] memory) {
        // memory porque es un tipo complejo de dato
        return ids;
    }

    function length() public view returns (uint256) {
        return ids.length;
    }
}
