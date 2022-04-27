import { ethers } from "ethers";
import abi from "./WavePortal.json";

const contractAddress = "0xCE8027E1441Be1B56462a09bFCa6d5Ac555A5dd9";

export const getContract = async () => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wavePortalContract = new ethers.Contract(contractAddress, abi.abi, signer);

            return wavePortalContract;
        } else {
            throw new Error("Ethereum object doesn't exist!")
        }
    } catch (error) {
        console.log(error);
    }
};