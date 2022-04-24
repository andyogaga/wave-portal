// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {console} from "hardhat/console.sol";

contract WavePortal {
     uint public totalWaves;

    constructor(){
        console.log("Smart contracts here I come");
    }

    function createWave() public {
        totalWaves += 1;
        console.log("%s sent a wave", msg.sender);
    }
}