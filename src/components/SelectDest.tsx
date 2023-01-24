import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SelectDest = () => {
  const iconSearch = <FontAwesomeIcon icon={faMagnifyingGlass} />
  return (
    <div className='select-search-box'>
      <div className='label'>Destination</div>
      <input type="text" />
      <div className="search">{iconSearch}</div>
    </div>
  )
}

export default SelectDest