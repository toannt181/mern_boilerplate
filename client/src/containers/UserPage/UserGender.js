import React from 'react'

function UserName({ form, onChangeForm }) {
  return (
    <div className="field is-horizontal">
      <div className="field-label">
        <label className="label">Gender</label>
      </div>
      <div className="field-body">
        <div className="field is-narrow">
          <div className="control">
            <div className="select">
              <select name="gender" value={form.gender} onChange={onChangeForm}>
                <option value="0">Select dropdown</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserName
