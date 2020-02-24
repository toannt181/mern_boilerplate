import React, { useState } from 'react'

const ChannelModal = ({ onCreateChannel, onCloseModal }) => {
  const [channelName, setChannelName] = useState('')

  const onChangeName = (e) => {
    setChannelName(e.target.value)
  }

  const onClickCreateButton = () => {
    onCreateChannel(channelName)
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New channel name</p>
          <button className="delete" aria-label="close" onClick={onCloseModal} />
        </header>
        <section className="modal-card-body">
          <input className="input" type="text" placeholder="Text input" value={channelName} onChange={onChangeName} />
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={onClickCreateButton}>Create</button>
          <button className="button" onClick={onCloseModal}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default ChannelModal
