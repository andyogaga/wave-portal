import React, { useEffect, useState } from 'react'
import Captions from './Captions'
import { getCaptions, clearCaptions, createCaptionAlone } from '../../store/actions/caption.actions'
import { connect } from 'react-redux'
import { func, array } from 'prop-types'

const CaptionsContainer = props => {
  const { getCaptions, clearCaptions, captions, createCaptionAlone } = props
  const [captionsLoading, setCaptionsLoading] = useState(true)

  useEffect(() => {
    // getCaptions(() => setCaptionsLoading(false))
    return () => {
      clearCaptions()
    };
  }, [])

  return (
    <Captions
      captions={captions}
      captionsLoading={captionsLoading}
      createCaptionAlone={createCaptionAlone}
    />
  )
}

const mapStateToProps = ({ captions }) => ({
  captions: captions.captions
})

CaptionsContainer.defaultProps = {
  getCaptions: () => { },
  clearCaptions: () => { },
  createCaptionAlone: () => { },
  captions: []
}

CaptionsContainer.propTypes = {
  getCaptions: func,
  clearCaptions: func,
  captions: array,
  createCaptionAlone: func
}

export default connect(mapStateToProps, { getCaptions, clearCaptions, createCaptionAlone })(CaptionsContainer)
