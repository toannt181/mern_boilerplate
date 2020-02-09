import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

const ChannelModal = ({ message = '', title = '', onClickAccept = null, history, dispatchWarningModal }) => {
  const onClickAcceptButton = () => {
    if (onClickAccept) {
      return onClickAccept()
    }
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
                <h3 className="title-3">{title || 'ERROR'}</h3>
                <p dangerouslySetInnerHTML={{ __html: message }} />
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
