import React, { useState } from "react";
import { func, array } from "prop-types";
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

const Home = props => {
  const { captions, getSearchedCaptions } = props;
  const [captionsLoading, setCaptionsLoading] = useState(false);
  return (
    <Container>
      <NavBar />
      <SearchSection>
        <SearchWrapper>
          <SearchInput placeholder="Add a message" />
          <SearchButton
            onClick={() => {
              setCaptionsLoading(true);
              getSearchedCaptions(() => setCaptionsLoading(false));
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

Home.defaultProps = {
  activeTags: [],
  captions: {
    tag: "",
    caption: ""
  },
  getSearchedCaptions: () => { }
};

Home.propTypes = {
  activeTags: array,
  captions: array,
  getSearchedCaptions: func
};

export default Home;
