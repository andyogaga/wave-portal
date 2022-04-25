import React, { useEffect } from "react";
import { connect } from "react-redux";
import Home from "./Home";
import {
  getCaptions,
  getCaptionByTagId,
  clearCaptions
} from "../../store/actions/caption.actions";
import { func, array } from "prop-types";

const HomeContainer = props => {
  const {
    getCaptionByTagId,
    activeCaptions,
    activeTags,
    clearActiveTags,
    clearCaptions
  } = props;

  useEffect(() => {
    return () => {
      clearActiveTags();
      clearCaptions();
    };
  }, []);

  const getSearchedCaptions = cb => {
    // Choose a random number from 1 to 10
    const randomId = Math.floor(Math.random() * 9) + 1;
    getCaptionByTagId(randomId, cb);
  };

  return (
    <Home
      captions={activeCaptions}
      activeTags={activeTags}
      getSearchedCaptions={getSearchedCaptions}
    />
  );
};

const mapStateToProps = state => ({
  activeCaptions: state.captions.activeCaptions,
});

HomeContainer.defaultProps = {
  getCaptionByTagId: () => { },
  getCaptions: () => { },
  clearActiveTags: () => { },
  clearCaptions: () => { },
  activeCaptions: [],
  activeTags: []
}

HomeContainer.propTypes = {
  getCaptions: func,
  getCaptionByTagId: func,
  clearActiveTags: func,
  clearCaptions: func,
  activeCaptions: array,
  activeTags: array
}

export default connect(mapStateToProps, {
  getCaptions,
  getCaptionByTagId,
  clearCaptions
})(HomeContainer);
