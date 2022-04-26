import { ethers } from "ethers";
import { CLEAR_CAPTIONS } from '../../utils/constants'
import abi from "../../utils/WavePortal.json";

const contractAddress = "0xaCF5a2F5B1E06862d64223B0db23742d9F946229";

export const getTotalWaves = async (cb) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, abi.abi, signer);

      let count = await wavePortalContract.totalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
      return count.toNumber();
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  } finally {
    cb && cb()
  }
}

export const getAllWaves = async (cb) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      console.log("Calling waves")
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, abi.abi, signer);

      const waves = await wavePortalContract.getAllWaves();

      const formattedWaves = waves.map(wave => ({
        address: wave.sender,
        time: (new Date(wave.key * 1000)).toDateString(),
        message: wave.message,
      }))
      console.log(formattedWaves)
      cb(formattedWaves)
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  } finally {
    cb()
  }
}

export const sendWave = async (caption, cb) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, abi.abi, signer);

      let waveTrx = await wavePortalContract.createWave(caption);
      console.log("Trx ID", waveTrx)
      // await waveTrx.wait();
      await cb(1)
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    cb()
  }
};

export const clearCaptions = () => dispatch => dispatch({
  type: CLEAR_CAPTIONS
});