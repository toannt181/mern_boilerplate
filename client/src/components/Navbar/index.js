import React from 'react'

function Navbar() {
  return (
    <nav className="navbar" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">Mern</a>
        </div>
        <div className="navbar-menu">
          <a href="/users/register" className="btn btn-primary">Register</a>
          <a href="/users/login" className="btn btn-primary">Login</a>
          <a href="/users/logout" className="btn btn-primary">Logout</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
