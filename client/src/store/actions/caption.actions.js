import { ethers } from "ethers";
import { callApi } from "../../utils"
import { GET_CAPTIONS, CLEAR_CAPTIONS } from '../../utils/constants'
import abi from "../../utils/WavePortal.json";

const contractAddress = "0x39C50D5EF33b0871048a62a9FAa0aFF8F6c2fcA1";

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

export const getCaptions = cb => async dispatch => {
  try {
    const res = await callApi('/caption', null, 'GET')

    if (res && res.status === "success") {
      const { data: { captions } } = res
      dispatch({
        type: GET_CAPTIONS,
        payload: captions
      })
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
      await waveTrx.wait();
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