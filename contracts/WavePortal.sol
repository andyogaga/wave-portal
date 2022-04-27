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
    uint256 private seed;
    mapping(address => uint256) public lastWaved;

    event WaveSubmitted(
        address indexed from,
        uint256 timestamp,
        string message
    );

    constructor() payable {
        console.log("Smart contracts here I come");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function createWave(string memory message) public payable returns (bool) {
        require(
            block.timestamp - lastWaved[msg.sender] > 30 seconds,
            "Wait 30 secs"
        );
        lastWaved[msg.sender] = block.timestamp;
        waves.push(Wave(msg.sender, totalWaves, message));
        totalWaves += 1;
        emit WaveSubmitted(msg.sender, block.timestamp, message);

        seed = (block.timestamp + block.difficulty + seed) % 100;
        if (seed <= 50) {
            require(
                0.0001 ether <= address(this).balance,
                "Funds not available"
            );
            (bool success, ) = (msg.sender).call{value: 0.0001 ether}("");
            require(success, "Withdrawal failed");
        }

        return true;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
