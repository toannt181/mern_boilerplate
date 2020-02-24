import React, { useState } from 'react'
import Modal from 'components/Modal'
import Select from 'components/Select'

const ChannelModal = ({ onInviteMember, members =[], onCloseModal }) => {
  const [email, setEmail] = useState('')

  const onChange = (option) => {
    setEmail(option)
  }

  const onClickCreateButton = () => {
    onInviteMember(email.email)
  }

  const options = members.map(member => ({ value: member._id, label: `${member.name} (${member.email})`, email: member.email }))

  return (
    <Modal
      onClose={onCloseModal}
      title="Invite member"
      onAccept={onClickCreateButton}
    >
      <Select options={options} value={email} onChange={onChange} />
    </Modal>
  )
}

export default ChannelModal
