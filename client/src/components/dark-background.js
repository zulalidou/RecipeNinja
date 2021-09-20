import React from 'react';
import '../styles/dark-background.css';
import PropTypes from 'prop-types';


const DarkBackground = (props) => {
  return (
    <div className='dark-background' onClick={props.closeBackground}>
    </div>
  );
};


DarkBackground.propTypes = {
  closeBackground: PropTypes.func,
};


export default DarkBackground;
