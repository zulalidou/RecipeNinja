import React from 'react'

import '../styles/dark-background.css';


const DarkBackground = (props) => {
    return (
        <div className='dark-background' onClick={props.closeBackground}>
        </div>
    )
}


export default DarkBackground
