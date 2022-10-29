// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract SimpleStorage {
    string private message;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");

        _;
    }

    modifier notEmpty(string memory newMessage) {
        require(bytes(newMessage).length > 0, "Message cannot be empty");

        _;
    }

    event MessageChanged(string);

    constructor() {
        message = "";
        owner = msg.sender;
    }

    function setMessage(string memory newMessage)
        public
        onlyOwner
        notEmpty(newMessage)
    {
        message = newMessage;

        emit MessageChanged(message);
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
