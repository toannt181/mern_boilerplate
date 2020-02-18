import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LetterAvatar from 'components/LetterAvatar'
import { actions as appActions } from 'slices/appSlice'

export const ModalWrapper = styled.div`
  .item {
    display: flex;

    p {
      font-size: ${({ theme }) => theme.size.small};

      &:first-child {
        width: 120px;
      }
    }

    .label {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`

const UserModal = (props) => {
  const {
    viewUserId = null,
    guestUserInfo: user,
    dispatchFetchViewUserInfo,
    dispatchUpdateViewUserId,
    dispatchUpdateGuestUserInfo,
  } = props

  useEffect(() => {
    if (viewUserId) {
      dispatchFetchViewUserInfo({ userId: viewUserId })
    }
  }, [viewUserId, dispatchFetchViewUserInfo])

  const onCloseModal = () => {
    dispatchUpdateViewUserId(null)
    dispatchUpdateGuestUserInfo({})
  }

  return (
    <ModalWrapper className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{user.name}</p>
          <button className="delete" aria-label="close" onClick={onCloseModal} />
        </header>
        <section className="modal-card-body">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <LetterAvatar
                    className="is-medium"
                    color={user.avatar}
                    background={user.thumbnail}
                  >
                    {user.name && user.name[0]}
                  </LetterAvatar>
                </div>
                <div className="media-content">
                  <p className="title is-4 mb-2">{user.name}</p>
                  <p className="subtitle is-6 mb-2">{user.email}</p>
                </div>
              </div>

              <div className="content">
                <p>{user.comment}</p>
                <div className="item">
                  <p className="label">Display name</p>
                  <p className="">{user.name}</p>
                </div>
                <div className="item">
                  <p className="label">Gender</p>
                  <p className="">{user.gender}</p>
                </div>
                <div className="item">
                  <p className="label">Phone</p>
                  <p className="">{user.telNo}</p>
                </div>
                <div className="item">
                  <p className="label">Organization</p>
                  <p className="">{user.organization}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ModalWrapper>
  )
}

export default connect(
  state => ({
    viewUserId: state.app.viewUserId,
    guestUserInfo: state.app.guestUserInfo,
  }),
  {
    dispatchFetchViewUserInfo: appActions.dispatchFetchViewUserInfo,
    dispatchUpdateViewUserId: appActions.dispatchUpdateViewUserId,
    dispatchUpdateGuestUserInfo: appActions.dispatchUpdateGuestUserInfo,
  }
)(UserModal)
