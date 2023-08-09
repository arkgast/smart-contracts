// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.16;

import "hardhat/console.sol";

contract SimpleStorage {
  address public immutable owner;
  string private message;

  event MessageChanged(string);

  modifier onlyOwner() {
    require(msg.sender == owner, 'Caller is not the owner.');
    _;
  }

  modifier isEmpty(string memory newMessage) {
    require(bytes(newMessage).length > 0, 'Message cannot be empty.');
    _;
  }

  constructor() {
    owner = msg.sender;
  }

  function setMessage(string memory newMessage)
    external
    onlyOwner
    isEmpty(newMessage)
  {
    message = newMessage;
    emit MessageChanged(message);
  }

  function getMessage() external view returns (string memory) {
    return message;
  }
}
