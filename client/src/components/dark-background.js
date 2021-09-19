import React from 'react';
import PropTypes from 'prop-types';
import '../styles/dark-background.css';


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
