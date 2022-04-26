import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Home from "./Home";
import {
  getCaptions,
  clearCaptions
} from "../../store/actions/caption.actions";
import { func, array } from "prop-types";

const HomeContainer = props => {
  const {
    activeCaptions,
    activeTags,
    clearCaptions
  } = props;

  useEffect(() => {
    return () => {
      clearCaptions();
    };
  }, [clearCaptions]);

  const [currentAccount, setCurrentAccount] = useState("");

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

  return (
    <Home
      captions={activeCaptions}
      activeTags={activeTags}
      connectWallet={connectWallet}
      currentAccount={currentAccount}
    />
  );
};

const mapStateToProps = state => ({
  activeCaptions: state.captions.activeCaptions,
});

HomeContainer.defaultProps = {
  getCaptionByTagId: () => { },
  getCaptions: () => { },
  clearCaptions: () => { },
  activeCaptions: [],
  activeTags: []
}

HomeContainer.propTypes = {
  getCaptions: func,
  clearCaptions: func,
  activeCaptions: array,
  activeTags: array
}

export default connect(mapStateToProps, {
  getCaptions,
  clearCaptions
})(HomeContainer);
