import React from 'react';

// Global Styles
import './css/Global.css';

// Components
import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="App">
      <div className='first-block'></div>
      <div className='container main'>
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
