import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import {
  Container,
  SearchSection,
  SearchInput,
  CaptionCard,
  CaptionsContainer,
  SearchButton,
  SearchWrapper,
  TagText,
  EmptyContentText
} from "../../components";
import styled from "styled-components";
import { bool, func, array } from "prop-types";
import Loader from "../../components/Loader";
import { Formik } from "formik";
import * as Yup from "yup";

const NewCaptionCard = styled(CaptionCard)`
  height: auto;
  min-height: 6rem;
`;
const CaptionWrite = styled(TagText)`
  color: #000;
  margin: auto;

  &:first-letter {
    text-transform: uppercase;
  }
`;

const MyCaptionContainer = styled(CaptionsContainer)`
  margin: auto;
`;

const AddCaptionContainer = styled(SearchSection)`
  padding-top: 8rem;
  padding-bottom: 8rem;
`;

const AddCaptionWrapper = styled(SearchWrapper)``;

const AddCaptionInput = styled(SearchInput)``;

const AddCaptionButton = styled(SearchButton)``;

const captionValidation = Yup.object().shape({
  caption: Yup.string()
    .required("Required!")
    .min(2, "You must have more than one letter")
});

const Captions = props => {
  const { captions, captionsLoading, createCaptionAlone } = props;
  const [addCaptionLoading, setAddCaptionLoading] = useState(false);

  return (
    <Container>
      <NavBar />
      <Formik
        initialValues={{
          caption: ""
        }}
        validationSchema={captionValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setAddCaptionLoading(true);
          createCaptionAlone(values.caption, () => {
            setSubmitting(false);
            resetForm();
            setAddCaptionLoading(false);
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          isSubmitting,
          handleBlur
        }) => {
          return (
            <AddCaptionContainer>
              <AddCaptionWrapper>
                <AddCaptionInput
                  name="caption"
                  value={values.caption}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Enter Captions to Add"
                />
                <AddCaptionButton type="submit" onClick={handleSubmit}>
                  {addCaptionLoading ? (
                    <Loader size="small" color="#fff" />
                  ) : (
                    "Add Caption"
                  )}
                </AddCaptionButton>
              </AddCaptionWrapper>
              {errors.caption &&
              touched.caption && ( // This is the error element to be shown if field is touched or does not pass the schema tests
                  <span
                    data-testid={`caption-error`}
                    style={{ fontSize: "0.9rem", color: "red", marginTop: '1rem' }}
                  >
                    {errors.caption}
                  </span>
                )}
            </AddCaptionContainer>
          );
        }}
      </Formik>

      {captionsLoading ? (
        <Loader size="small" />
      ) : (
        <MyCaptionContainer>
          {Array.isArray(captions) && captions.length ? (
            captions.map((caption) => (
              <NewCaptionCard key={caption.id}>
                <CaptionWrite>{caption.caption}</CaptionWrite>
              </NewCaptionCard>
            ))
          ) : (
            <EmptyContentText>No Captions Yet</EmptyContentText>
          )}
        </MyCaptionContainer>
      )}
    </Container>
  );
};

Captions.defaultProps = {
  captions: [],
  captionsLoading: false,
  createCaptionAlone: () => {}
};

Captions.propTypes = {
  captions: array,
  captionsLoading: bool,
  createCaptionAlone: func
};

export default Captions;
