import React from 'react';
import '../styles/page-not-found.css';
import PageNotFoundIcon from '../images/page-not-found.png';
import {Link} from 'react-router-dom';


const PageNotFound = () => {
  document.title = 'Page not found';

  return (
    <div className='page-not-found-container'>
      <h1>This page isn&apos;t available</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.
      </p>

      <div className="page-not-found-icon-container">
        <img className="page-not-found-icon" src={PageNotFoundIcon}
          alt="page not found"/>
      </div>

      <br/>

      <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
        <button className='page-not-found-btn'>
          Main Menu
        </button>
      </Link>
    </div>
  );
};


export default PageNotFound;
