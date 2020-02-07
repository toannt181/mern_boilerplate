import React from 'react'
import styled from 'styled-components'

export const UserAvatarWrapper = styled.div`
  .avatar-container {
    display: block;

    .btn-group {
      margin-top: 16px;
      
      .btn {
        width: 120px;
        display: inline-block;
      }
    }
  }
`

export const AvatarWrapper = styled.div`
  width: 120px;
  height: 120px;
  background: ${({ theme }) => theme.colors.gray13} center center;
  border-radius: ${({ theme }) => theme.radius.large};
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;

  .fa {
    font-size: 64px;
    color: ${({ theme }) => theme.colors.white};
  }
`

function UserPage({ form, onChangeValue, onChangeFile }) {
  const background = form.thumbnail
  return (
    <UserAvatarWrapper className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Profile picture</label>
      </div>
      <div className="field-body avatar-container">
        <AvatarWrapper className="avatar d-center" background={background}>
          {!!background || <i className="fa fa-user" />}
        </AvatarWrapper>
        <div className="btn-group">
          <label className="btn file-label mr-2">
            <input className="file-input" type="file" name="file" onChange={onChangeFile} />
            <div className="button is-fullwidth is-primary">Replace</div>
          </label>
          <button type="button" className="btn button is-danger is-light" onClick={() => onChangeValue({ name: 'thumbnail', value: null })}>Remove</button>
        </div>
      </div>
    </UserAvatarWrapper>
  )
}

export default UserPage
