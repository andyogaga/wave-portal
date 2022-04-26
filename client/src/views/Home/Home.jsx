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
import { sendWave } from "../../store/actions/caption.actions";

const Home = props => {
  const { captions, connectWallet, currentAccount } = props;
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
              setCaptionsLoading(true);
              sendWave(message, (res) => {
                setCaptionsLoading(false)
                res && setMessage("")
              });
            }}
          >
            {captionsLoading ? <Loader size="small" color="#fff" /> : "Send a wave"}
          </SearchButton>
        </SearchWrapper>
      </SearchSection>
      <CaptionsContainer>
        {Array.isArray(captions) && captions.length ? (
          captions.map(caption => (
            <CaptionCard key={caption.id}>
              {caption.tag ? (
                <CaptionCardHeader>{caption.tag}</CaptionCardHeader>
              ) : null}
              {caption.caption ? (
                <CaptionText>{caption.caption}</CaptionText>
              ) : null}
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
