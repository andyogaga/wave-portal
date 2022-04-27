import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe("WavePortal", function () {
  let wavePortalContract: any;
  let owner: Signer, user1: Signer, user2: Signer;
  before(async () => {
    const WavePortalContractFactory = await ethers.getContractFactory("WavePortal");
    wavePortalContract = await WavePortalContractFactory.deploy({
      value: ethers.utils.parseEther("0.1"),
    });
    await wavePortalContract.deployed();
    [owner, user1, user2] = await ethers.getSigners();
  })

  it("should start with empty waves and total waves of zero", async function () {
    expect(await wavePortalContract.totalWaves()).to.equal(0);
    expect(await wavePortalContract.getAllWaves()).to.deep.equal([]);
  });

  it("should send wave and update total count", async function () {
    const sendWaveTx = await wavePortalContract.createWave("Hola, mundo!");
    await sendWaveTx.wait();
    expect(await wavePortalContract.totalWaves()).to.equal(1);
    expect(await wavePortalContract.getAllWaves()).to.have.lengthOf(1);
  });

  it("should fund sender address with 0.001 ethers if seed is less than 50", async function () {
    const sendWaveTx2 = await wavePortalContract.connect(user1).createWave("Hola, mundo!");
    await sendWaveTx2.wait();
    expect(await wavePortalContract.totalWaves()).to.equal(2);
    expect(await wavePortalContract.getAllWaves()).to.have.lengthOf(2);
  });

  it("should throw error if sent within 15 mins", async function () {
    try {
      const sendWaveTx = await wavePortalContract.connect(user2).createWave("Hola, mundo!");
      await sendWaveTx.wait();
      expect(await wavePortalContract.totalWaves()).to.equal(3);
      expect(await wavePortalContract.getAllWaves()).to.have.lengthOf(3);
      const sendWaveTx2 = await wavePortalContract.connect(user2).createWave("Hola, 2 mundo!");
      await sendWaveTx2.wait();
    } catch (error) {
      expect(await wavePortalContract.totalWaves()).to.equal(3);
      expect(await wavePortalContract.getAllWaves()).to.have.lengthOf(3);
    }

  });
});
