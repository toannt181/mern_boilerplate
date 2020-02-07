import React from 'react'

function UserOrganization({ form, onChangeForm }) {
  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Organization</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="e.g. Partnership opportunity" name="organizationName" value={form.organizationName} onChange={onChangeForm} />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Question</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea className="textarea" placeholder="Explain how you can describe yourself" name="comment" value={form.comment} onChange={onChangeForm}></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserOrganization
