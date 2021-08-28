import React from 'react'

function Header () {
  return (
    <header id='header'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a></a>{/* Empty to make sure navbar-brand is aligned to the right */}
          <a className='navbar-brand d-flex'>jitomate 🍅</a>
        </div>
      </nav>
    </header>
  )
}

export default Header
