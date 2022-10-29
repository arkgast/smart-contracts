// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract SimpleStorage {
    string private message;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: Caller is not owner");
        _;
    }

    constructor() {
        message = "";
        owner = msg.sender;
    }

    function setMessage(string memory newMessage) public onlyOwner {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
