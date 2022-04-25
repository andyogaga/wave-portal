// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`Contracts deployed with account: ${deployer.address}`);
  console.log(`Account balance: ${accountBalance.toString()}`);

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();

  await waveContract.deployed();
  console.log(`Wavecontract address: ${waveContract.address}`);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();

/**
 * No need to generate any newer typings.
Contracts deployed with account: 0xc83C48Eb5E08F9E346c14581e56436D752C177F1
Account balance: 100000000000000000
Wavecontract address: 0x39C50D5EF33b0871048a62a9FAa0aFF8F6c2fcA1
 */