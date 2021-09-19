import React from 'react';
import '../styles/error.css';
import PropTypes from 'prop-types';


const Error = (props) => {
  console.log('This is the ERROR component');

  return (
    <div className="error-container">
      <div className="ec-top">
        <h1 className="ec-title">An Error Occurred</h1>

        <button className="ec-close-btn-1" type="button"
          onClick={props.closeComponent}>
            &#10006;
        </button>
      </div>

      <div className="ec-bottom">
        <p>
            An unexpected problem was encountered. Here are a few things
            you can try:
        </p>

        <p className="p1">
          <span className="bullet-point-span">&#8226;</span>
            Reload the page
        </p>

        <p>
          <span className="bullet-point-span">&#8226;</span>
            Close the tab and open it again
        </p>

        <p>
          <span className="bullet-point-span">&#8226;</span>
            Wait a few minutes, and try again later
        </p>

        <button className="ec-close-btn-2" type="button"
          onClick={props.closeComponent}>
            &#10006;
        </button>
      </div>
    </div>
  );
};


Error.propTypes = {
  closeComponent: PropTypes.func,
};


export default Error;
