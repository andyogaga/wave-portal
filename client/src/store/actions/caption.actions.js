import { callApi } from "../../utils"
import {CREATE_CAPTION, GET_CAPTIONS, ADD_TAG, ADD_CAPTIONS, CLEAR_CAPTIONS} from '../../utils/constants'

export const createCaption = (caption, tags, cb) => async dispatch => {
  try {
    let res;
    if(Array.isArray(tags) && tags.length){
      res = await callApi('/caption/multi', {
        caption,
        tags
      }, 'POST')
      if(res){
        dispatch({
          type: CREATE_CAPTION,
          payload: caption
        })
      }
    } else {
      res = await callApi('/caption', {
        caption
      }, 'POST')
      if(res){
        dispatch({
          type: CREATE_CAPTION,
          payload: caption
        })
      }
    }
  } catch (error) {
    console.log(error)
  } finally{
    cb()
  }
}

export const getCaptions =  cb => async dispatch => {
  try {
      const res = await callApi('/caption', null, 'GET')
      
      if(res && res.status === "success"){
        const {data: {captions}} = res
        dispatch({
          type: GET_CAPTIONS,
          payload: captions
        })
      }
  } catch (error) {
    console.log(error)
  }finally{
    cb()
  }
}

export const getCaptionByTagId =  (id, cb) => async dispatch => {
  try {
      const res = await callApi(`/caption/withTag?tagId=${id}`, null, 'GET')
      if(res && res.status === "success"){
        const {data: {captions, tag}} = res
        const newCaptions = captions.map((caption, i) => {
          return {
            id: i,
            tag,
            caption
          }
        })
        dispatch({
          type: ADD_CAPTIONS,
          payload: newCaptions
        })
        dispatch({
          type: ADD_TAG,
          payload: tag
        })
      }
  } catch (error) {
    console.log(error)
  }finally{
    cb()
  }
}

export const createCaptionAlone = (caption, cb) => async dispatch => {
  try {
    const res = await callApi(
      "/caption",
      {
        caption
      },
      "POST"
    );
    if (res.status === "success") {
      const {id, caption: newC} = res.data;
      const newCaption = {
          id,
          caption: newC
        }
      dispatch({
        type: CREATE_CAPTION,
        payload: newCaption
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    cb();
  }
};

export const clearCaptions = () => dispatch => dispatch({
  type: CLEAR_CAPTIONS
});