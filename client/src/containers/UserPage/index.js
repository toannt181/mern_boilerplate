import React, { useState, memo, useEffect } from 'react'
import styled from 'styled-components'
import UserAvatar from './UserAvatar'
import UserName from './UserName'
import UserGender from './UserGender'
import UserTelNo from './UserTelNo'
import UserOrganization from './UserOrganization'

import { connect } from 'react-redux'
import { actions as userActions } from 'slices/userSlice'

export const UserPageWrapper = styled.div`
  padding: 16px 40px;
`

function readURL(file, callback) {
  const reader = new FileReader()
  reader.onload = (e) => {
    callback(e.target.result)
  }
  reader.readAsDataURL(file)
}

const INIT_FORM = {
  name: '',
  telNo: '',
  gender: '',
  organizationName: '',
  comment: '',
  thumbnail: '',
  isDeleteThumbnail: false,
}

function UserPage({ user, dispatchPostUserInfo }) {
  const [form, setForm] = useState({ ...INIT_FORM })

  useEffect(() => {
    const {
      name,
      telNo,
      gender,
      organizationName,
      comment,
      thumbnail,
    } = user
    setForm({
      ...INIT_FORM,
      thumbnail: thumbnail || '',
      name,
      telNo: telNo || '',
      gender,
      organizationName: organizationName || '',
      comment: comment || '',
    })
  }, [user, setForm])

  const onChangeForm = (e) => {
    const value = { [e.target.name]: e.target.value }
    setForm(state => ({ ...state, ...value }))
  }

  const onChangeValue = (e) => {
    const data = {}
    if (e.name === 'thumbnail') {
      data.isDeleteThumbnail = true
    }
    setForm(state => ({ ...state, [e.name]: e.value, ...data }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('isDeleteThumbnail', form.isDeleteThumbnail)
    dispatchPostUserInfo({ data: formData })
  }

  const onChangeFile = (e) => {
    readURL(e.target.files[0], (thumbnail) => {
      setForm(state => ({ ...state, thumbnail }))
    })
  }

  return (
    <UserPageWrapper>
      <h2 className="title is-2 mb-4">Account information</h2>
      <form onSubmit={onSubmit}>
        <UserAvatar form={form} onChangeValue={onChangeValue} onChangeFile={onChangeFile} />
        <UserName form={form} onChangeForm={onChangeForm} />
        <UserGender form={form} onChangeForm={onChangeForm} />
        <UserTelNo form={form} onChangeForm={onChangeForm} />
        <UserOrganization form={form} onChangeForm={onChangeForm} />
        <div className="field is-horizontal">
          <div className="field-label">
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary is-fullwidth">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </UserPageWrapper>
  )
}

export default memo(connect(
  state => ({
    user: state.app.user,
  }),
  {
    dispatchPostUserInfo: userActions.dispatchPostUserInfo,
  }
)(UserPage))
