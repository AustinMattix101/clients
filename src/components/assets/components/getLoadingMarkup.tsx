import { logo512 } from '../logo';
import '../../app/App.css';
import React from 'react';

const getLoadingMarkup = (): JSX.Element => {
  return (
    <>
    <div className="fixed-container">
      <div className="container">
        <div className="App">
          <div className="py-4 text-center">
            <img src={logo512} className="App-logo" alt="logo" />
            <h2 className="App">Loading...</h2>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default getLoadingMarkup;