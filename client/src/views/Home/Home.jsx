import React, { useState } from "react";
import {
  Container,
  SearchSection,
  SearchInput,
  CaptionCard,
  CaptionsContainer,
  CaptionText,
  CaptionCardHeader,
  SearchButton,
  SearchWrapper,
  EmptyContentText
} from "../../components";
import NavBar from "../../components/NavBar";
import Loader from "../../components/Loader";
import { sendWave } from "../../utils/wave.actions";

const Home = props => {
  const { waves, connectWallet, currentAccount } = props;
  const [captionsLoading, setCaptionsLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Container>
      <NavBar
        connectWallet={connectWallet}
        currentAccount={currentAccount}
      />
      <SearchSection>
        <SearchWrapper>
          <SearchInput value={message} onChange={e => setMessage(e.target.value)} placeholder="Add a message" />
          <SearchButton
            onClick={() => {
              if (currentAccount) {
                setCaptionsLoading(true);
                sendWave(message, (res) => {
                  setCaptionsLoading(false)
                  res && setMessage("")
                  res && alert("Transaction sent successfully, please wait for confirmation")
                });
              } else {
                alert("Wallet not connected, please connect")
              }
            }}
          >
            {captionsLoading ? <Loader size="small" color="#fff" /> : "Send a wave"}
          </SearchButton>
        </SearchWrapper>
      </SearchSection>
      <CaptionsContainer>
        {Array.isArray(waves) && waves.length ? (
          waves.map(wave => (
            <CaptionCard key={wave.time}>
              <CaptionText>{wave.time}</CaptionText>
              <CaptionCardHeader>{wave.message}</CaptionCardHeader>
              <CaptionText>Sender: {wave.address}</CaptionText>
            </CaptionCard>
          ))
        ) : (
          <EmptyContentText>No wave sent yet...</EmptyContentText>
        )}
      </CaptionsContainer>
    </Container>
  );
};

export default Home;
