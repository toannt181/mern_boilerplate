import React from 'react'
import cn from 'classnames'

function UserName({ form, onChangeForm }) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Display name</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control is-expanded has-icons-left">
            <input className={cn('input', { 'is-danger': !form.name })} required type="text" placeholder="Name" name="name" value={form.name} onChange={onChangeForm} />
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </p>
          {!form.name && (
            <p className="help is-danger">
              This field is required
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserName
