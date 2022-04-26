import { expect } from "chai";
import { ethers } from "hardhat";

describe("WavePortal", function () {
  let wavePortalContract: any;

  before(async () => {
    const WavePortalContract = await ethers.getContractFactory("WavePortal");
    wavePortalContract = await WavePortalContract.deploy();
    await wavePortalContract.deployed();
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
});
