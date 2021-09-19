import React from 'react';
import PropTypes from 'prop-types';


const Error = (props) => {
  console.log('hellow world!!');

  return (
    <div className="error-container">
      <div className="error-container">
        <div className="ec-top">
          <div className="ec-title">
            <h3>Internal Error</h3>
          </div>

          <div className="ec-closer">
            <button className="ec-close-container-btn" type="button"
              onClick={props.closeComponent}>
                &#10006;
            </button>
          </div>
        </div>

        <hr/>

        <div className="ec-middle">
          <p>
            An unexpected problem was encountered. Here are a few things
            you can try:
          </p>

          <p>
            <span className="bullet-point-span">&#8226;</span>
            Reload the page
          </p>
          <p>
            <span className="bullet-point-span">&#8226;</span>
            Wait a few minutes, and try again later
          </p>
        </div>

        <div className="ec-bottom">
          <div className="ec-bottom-container">
            <button className="ec-bottom-btn" type="button"
              onClick={props.closeComponent}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


Error.propTypes = {
  closeComponent: PropTypes.func,
};


export default Error;
