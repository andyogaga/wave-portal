// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {console} from "hardhat/console.sol";

struct Wave {
    address sender;
    uint256 key;
    string message;
}

contract WavePortal {
    uint256 public totalWaves;
    Wave[] private waves;

    event WaveSubmitted(
        address indexed from,
        uint256 timestamp,
        string message
    );

    constructor() {
        console.log("Smart contracts here I come");
    }

    function createWave(string memory message) public returns (bool) {
        waves.push(Wave(msg.sender, totalWaves, message));
        totalWaves += 1;
        console.log("%s sent a wave", msg.sender);
        emit WaveSubmitted(msg.sender, block.timestamp, message);
        return true;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
