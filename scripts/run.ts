import { ethers } from "hardhat"

const main = async () => {
    const [owner, user] = await ethers.getSigners();
    const waveContractFactory = await ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();

    await waveContract.deployed();
    console.log(`Contract deployed to: ${waveContract.address}`);
    console.log(`Contract deployed by: ${owner.address}`);

    let totalWaves = await waveContract.totalWaves();

    const sendWave = await waveContract.createWave("First message");
    await sendWave.wait();

    totalWaves = await waveContract.totalWaves();
    console.log("%s total waves", totalWaves);

    const sendWave2 = await waveContract.createWave("First message");
    await sendWave2.wait();

    totalWaves = await waveContract.totalWaves();
    console.log("%s total waves", totalWaves);
}

const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();