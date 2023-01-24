import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserBox = () => {
  const iconUser = <FontAwesomeIcon icon={faUser} />
  return (
    <section className='user-box'>
        <div className='icon'>{iconUser}</div>
        <div className='flag'>
        <img
          alt="United States"
          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/MX.svg"/>
        </div>
        <div className='country'>{'Mexico, On shore'}</div>
    </section>
    
  )
}

export default UserBox