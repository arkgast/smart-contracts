// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.16;

contract SimpleStorage {
  address public immutable owner;
  string private message;

  event MessageChanged(string);

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function.");
    _;
  }

  modifier notEmpty(string memory newMessage) {
    require(bytes(newMessage).length > 0, "Message cannot be empty.");
    _;
  }

  constructor() {
    owner = msg.sender;
  }

  function setMessage(string memory newMessage)
    external
    notEmpty(newMessage)
    onlyOwner
  {
    message = newMessage;
    emit MessageChanged(newMessage);
  }

  function getMessage() external view returns (string memory) {
    return message;
  }
}
