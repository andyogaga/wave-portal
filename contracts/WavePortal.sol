// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {console} from "hardhat/console.sol";

struct Wave {
    uint256 key;
    string message;
}

contract WavePortal {
    uint256 public totalWaves;
    mapping(address => Wave) waves;

    constructor() {
        console.log("Smart contracts here I come");
    }

    function createWave(string memory message) public returns (bool) {
        waves[msg.sender] = Wave(totalWaves, message);
        totalWaves += 1;
        console.log("%s sent a wave", msg.sender);
        return true;
    }
}
