import React, { useEffect, useState } from "react";
import Home from "./Home";
import {
  getAllWaves,
} from "../../store/actions/caption.actions";

const HomeContainer = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!window.ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        console.log("Found an authorized account:", accounts[0]);
        setCurrentAccount(accounts[0])
      } else {
        console.log("No authorized account found")
        connectWallet()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install metamask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected to: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getAllWaves((waves) => {
        if (waves) {
          setWaves(waves)
        }
      })
    }
    // eslint-disable-next-line
  }, [currentAccount]);

  return (
    <Home
      connectWallet={connectWallet}
      currentAccount={currentAccount}
      waves={waves}
    />
  );
};


export default HomeContainer;
