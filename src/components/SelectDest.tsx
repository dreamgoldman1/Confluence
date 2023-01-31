import React, { useState } from 'react'

// Importing font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons'

// importing data source
import destinationJson from '../json/destination.json'

// Types definition
type SearchResultsProps = {
  cancelAction(): void
  confirmAction(): void
  selectAction(idx: number): void
  filterResult: destinationList
  selectedClass: string[]
  countSelected: number
};

type itemResultsProps = {
  selectAction(idx: number): void
  filterResult: destinationList
  selectedClass: string[]
};

type destinationList = { 
  city: string
  codeCountry: string
  country: string
}[]

// Interfaces
interface DestinationList { 
  city: string
  codeCountry: string
  country: string
}

const ItemResult = (props: itemResultsProps) => {
  const { selectAction, filterResult, selectedClass } = props
  const iconLocation = <FontAwesomeIcon icon={faLocationDot} />

  const renderElements = () => {
    let item = filterResult.map((ele, idx) => {
      let src = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${ele.codeCountry}.svg`
      return (
        <div className={`item-result ${selectedClass[idx] ? selectedClass[idx] : ''}`} key={idx} onClick={() => selectAction(idx)}>
          <div>
            <span>{iconLocation}</span>
            <div className='flag'>
              <img
                alt = {ele.country}
                src = {src} />
            </div>
            <div className="city-name">{ele.city}</div>
          </div>
          <div>
            <div className="country">{ele.codeCountry}, {ele.country}</div>
          </div>
        </div>
      )
    })
    return item
  }
  
  return (<div>{renderElements()}</div>)
}

const SearchResults = (props: SearchResultsProps) => {
  const { cancelAction, filterResult, selectAction, selectedClass, countSelected, confirmAction } = props

  return (
    <section className='results-box col-6'>
      <section className='results'>
        <h3>Results</h3>
        {filterResult.length > 0 &&
          <ItemResult filterResult={filterResult} selectAction={selectAction} selectedClass={selectedClass} />
        }
        {filterResult.length === 0 &&
          <div><p>Enter a destination to see results</p></div>
        }
      </section>

      {/*  
      <section className='selected-items'>
        <h3>Selected ({countSelected})</h3>
      </section>
      */}
      <section className='action-buttons'>
        <button className="btn btn-link cancel-button" onClick={cancelAction} >Cancel</button>
        <button className="btn btn-outline-secondary confirm-button" onClick={confirmAction}>Confirm</button>
      </section>
    </section>
  )
}

const SelectDest = () => {
  const [showResults, setShowResults] = useState(false)
  const [destination, setDestination] = useState('')
  const [filterResult, setFilterResult] = useState<DestinationList[]>([])
  const [selectedClass, setSelectedClass] = useState<string[]>([''])
  const [countSelected, setCountSelected] = useState(0)

  const iconSearch = <FontAwesomeIcon icon={faMagnifyingGlass} />

  let handleInput = () => {
    setShowResults(true)
  }

  let cancelAction = () => {
    setShowResults(false)
    setFilterResult([])
    setDestination('')
  }

  let confirmAction = () => {
    let count: string[] = selectedClass.filter((ele) => {
      if (ele === 'selected'){
        return ele
      }
      return false
    })
    setCountSelected(count.length)
    setShowResults(false)
    setDestination(`Selected ${countSelected}`)
  }

  let handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass([''])
    setDestination(e.currentTarget.value)
    let filteredResultArr: DestinationList[] = destinationJson.filter(item => {
      return item.country.toLowerCase().includes(destination.toLowerCase())
    })
    setFilterResult(filteredResultArr)
  }

  let selectAction = (idx: number) => {
    let selectedElements = [...selectedClass]
    if (selectedElements[idx] === undefined || selectedElements[idx] === ''){
      selectedElements[idx] = 'selected'
    }else{
      selectedElements[idx] = ''
    }
    setSelectedClass(selectedElements)

    let count: string[] = selectedClass.filter((ele) => {
      if (ele === 'selected'){
        return ele
      }
      return false
    })
    setCountSelected(count.length)
  }

  return (
    <div className='row select-search-container'>
      <div className='select-search-box col-4'>
        <label className='label' htmlFor='search-dest'>Destination</label>
        <input className='search-dest' id='search-dest' onClick={handleInput} onChange={handleOnchange} value={destination} name="searchDest" type="text" placeholder='Search' />
        <div className="search">{iconSearch}</div>
      </div>

      {showResults && <SearchResults cancelAction={cancelAction} filterResult={filterResult} selectAction={selectAction} selectedClass={selectedClass} countSelected={countSelected} confirmAction={confirmAction} />}

    </div>
  )
}

export default SelectDest