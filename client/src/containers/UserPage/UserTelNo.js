import React from 'react'

function UserName({ form, onChangeForm }) {
  return (
    <div className="field is-horizontal">
      <div className="field-label"></div>
      <div className="field-body">
        <div className="field is-expanded">
          <div className="field has-addons">
            <div className="control">
              <div className="button is-static">
                +84
              </div>
            </div>
            <p className="control is-expanded">
              <input className="input" type="tel" placeholder="Your phone number" name="telNo" value={form.telNo} onChange={onChangeForm} />
            </p>
          </div>
          <p className="help">Do not enter the first zero</p>
        </div>
      </div>
    </div>
  )
}

export default UserName
