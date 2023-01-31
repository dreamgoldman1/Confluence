import React from 'react'

// Importing font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserBox = () => {
  const iconUser = <FontAwesomeIcon icon={faUser} />
  return (
    <section className='user-box'>
      <div className='icon'>{iconUser}</div>
      <div className='flag'>
        <img
          alt="Mexico"
          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/MX.svg" />
      </div>
      <div className='country'>{'Mexico, On shore'}</div>
    </section>

  )
}

export default UserBox