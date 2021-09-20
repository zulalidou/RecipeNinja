import React, {useState, useEffect} from 'react';
import '../styles/side-navbar.css';
import UpArrowIcon from '../images/up-arrow.png';
import DownArrowIcon from '../images/down-arrow.png';
import CloseIcon from '../images/close.png';
import SideNavbarSubmenu1 from './side-navbar-submenu-1';
import SideNavbarSubmenu2 from './side-navbar-submenu-2';
import DarkBackground from './dark-background';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const SideNavbar = (props) => {
  let drawerClasses = 'side-navbar';
  const [showSideNavbarSubmenu1, setShowSideNavbarSubmenu1] = useState(false);
  const [showSideNavbarSubmenu2, setShowSideNavbarSubmenu2] = useState(false);
  const [closeComponent, setCloseComponent] = useState(false);


  useEffect(() => {
    if (closeComponent) {
      setShowSideNavbarSubmenu1(false);
      setShowSideNavbarSubmenu2(false);
      props.closeSideNavbar();

      setCloseComponent(false);
    }
  });

  if (props.show) {
    drawerClasses = 'side-navbar open';
  }

  return (
    <nav>
      {
        props.show &&
        <DarkBackground closeBackground={() => setCloseComponent(true)}/>
      }

      <nav className={drawerClasses}>

        <div>
          <img className='close-img' src={CloseIcon} alt='close'
            onClick={() => setCloseComponent(true)}/>

          <Link to='/about'
            className='side-navbar-about-container'
            onClick={() => setCloseComponent(true)}>
            <div className='side-navbar-about'><strong>About</strong></div>
          </Link>


          <div className='side-navbar-meal-types'
            onClick={() => setShowSideNavbarSubmenu1(!showSideNavbarSubmenu1)}>
            <strong>Meal Types</strong>

            {
              showSideNavbarSubmenu1 ?
              <img src={UpArrowIcon} alt="up arrow"/> :
              <img src={DownArrowIcon} alt="down arrow"/>
            }
          </div>

          {
            showSideNavbarSubmenu1 &&
            <SideNavbarSubmenu1
              closeSideNavbar={() => setCloseComponent(true)}/>
          }

          <div className='side-navbar-cuisines'
            onClick={() => setShowSideNavbarSubmenu2(!showSideNavbarSubmenu2)}>
            <strong>Cuisines</strong>

            {
              showSideNavbarSubmenu2 ?
              <img src={UpArrowIcon} alt="up arrow"/> :
              <img src={DownArrowIcon} alt="down arrow"/>
            }
          </div>

          {
            showSideNavbarSubmenu2 &&
            <SideNavbarSubmenu2
              closeSideNavbar={() => setCloseComponent(true)}/>
          }
        </div>
      </nav>
    </nav>
  );
};


SideNavbar.propTypes = {
  closeSideNavbar: PropTypes.func,
  show: PropTypes.bool,
};


export default SideNavbar;
