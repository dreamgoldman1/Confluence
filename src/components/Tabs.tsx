import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import SelectDest from './SelectDest'

const Tabs = () => {
  const comment = <FontAwesomeIcon icon={faComment} />
  const graduation = <FontAwesomeIcon icon={faGraduationCap} />
  return (
    <section className='tabs'>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">{comment} Language</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{graduation} Higher Ed.</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
          <SelectDest />
        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>...</div>
      </div>
    </section>
  )
}

export default Tabs