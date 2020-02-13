import React, { useState } from 'react'
import Modal from 'components/Modal'
const ChannelModal = ({ onInviteMember, onCloseModal }) => {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onClickCreateButton = () => {
    onInviteMember(email)
  }

  return (
    <Modal
      onClose={onCloseModal}
      title="Invite member"
      onAccept={onClickCreateButton}
    >
      <input className="input" type="email" placeholder="Email" value={email} onChange={onChange} />
    </Modal>
  )
}

export default ChannelModal
