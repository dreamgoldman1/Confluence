import React, { useState, useEffect } from 'react'

// Importing font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

// importing data source
import destinationJson from '../json/campuses.json'

// Types definition
type SearchResultsProps = {
  cancelAction(): void
  confirmAction(): void
  selectAction(idx: number): void
  filterResult: destinationList
  selectedClass: string[]
};

type itemResultsProps = {
  selectAction(idx: number): void
  filterResult: destinationList
  selectedClass: string[]
};

type destinationList = { 
  id: string
  name: string
  location: {
    id: string
    country: string
  }
}[]

// Interfaces
interface DestinationList { 
  id: string
  name: string
  location: {
    id: string
    country: string
  }
}

const ItemResult = (props: itemResultsProps) => {
  const { selectAction, filterResult, selectedClass } = props
  const iconGraduation = <FontAwesomeIcon icon={faGraduationCap} />

  const renderElements = () => {
    let item = filterResult.map((ele, idx) => {
      let campus = ele.name.split(' - ')
      return (
        <div className={`item-result ${selectedClass[idx] ? selectedClass[idx] : ''}`} key={idx} onClick={() => selectAction(idx)}>
          <div>
            <span>{iconGraduation}</span>
            <div className="city-name">{campus[0]}</div>
          </div>
          <div>
            <div className="country">{campus[1]}, {ele.location.country}</div>
          </div>
        </div>
      )
    })
    return item
  }
  
  return (<div>{renderElements()}</div>)
}

const SearchResults = (props: SearchResultsProps) => {
  const { cancelAction, filterResult, selectAction, selectedClass, confirmAction } = props

  return (
    <section className='results-box provider col-4'>
      <section className='results'>
        <h3>Results</h3>
        {filterResult.length > 0 &&
          <ItemResult filterResult={filterResult} selectAction={selectAction} selectedClass={selectedClass} />
        }
        {filterResult.length === 0 &&
          <div><p>Enter a provider to see results</p></div>
        }
      </section>

      <section className='action-buttons'>
        <button className="btn btn-link cancel-button" onClick={cancelAction} >Cancel</button>
        <button className="btn btn-outline-secondary confirm-button" onClick={confirmAction}>Confirm</button>
      </section>
    </section>
  )
}

const SelectProv = () => {
  const [showResults, setShowResults] = useState(false)
  const [destination, setDestination] = useState('')
  const [filterResult, setFilterResult] = useState<DestinationList[]>([])
  const [selectedClass, setSelectedClass] = useState<string[]>([''])
  const [countSelected, setCountSelected] = useState(0)

  const iconSearch = <FontAwesomeIcon icon={faMagnifyingGlass} />

  useEffect(() => {
    let count: string[] = selectedClass.filter((ele) => {
      if (ele === 'selected'){
        return ele
      }
      return false
    })
    setCountSelected(count.length)
  }, [selectedClass]) 

  let handleInput = () => {
    setShowResults(true)
  }

  let cancelAction = () => {
    setShowResults(false)
    setFilterResult([])
    setDestination('')
  }

  let confirmAction = () => {
    setShowResults(false)
    setDestination(`Selected ${countSelected}`)
  }

  let handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass([''])
    setDestination(e.currentTarget.value)
    let filteredResultArr: DestinationList[] = destinationJson.filter((item: { id:string; name:string; location:{ id:string; country:string;}; }) => {
      return item.name.toLowerCase().includes(destination.toLowerCase())
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
  }

  return (
    <>
      <div className='select-search-box col-4'>
        <label className='label' htmlFor='search-dest'>Provider</label>
        <input className='search-dest' id='search-dest' onClick={handleInput} onChange={handleOnchange} value={destination} name="searchDest" type="text" placeholder='Search' autoComplete="off" />
        <div className="search">{iconSearch}</div>
      </div>

      {showResults && <SearchResults cancelAction={cancelAction} filterResult={filterResult} selectAction={selectAction} selectedClass={selectedClass} confirmAction={confirmAction} />}
    </>
  )
}

export default SelectProv