import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

const ChannelModal = ({ message, history, dispatchWarningModal }) => {
  const onClickAcceptButton = () => {
    history.push('/')
    dispatchWarningModal({ visible: false })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <h3 className="title-3">ERROR</h3>
                <p>{message}</p>
                <button className="button is-danger" onClick={onClickAcceptButton}>OK</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ChannelModal)
