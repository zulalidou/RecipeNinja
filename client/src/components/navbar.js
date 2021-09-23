import React, {useState} from 'react';
import '../styles/navbar.css';
import LogoIcon from '../images/logo.png';
import DownArrowIcon from '../images/down-arrow.png';
import HamburgerIcon from '../images/hamburger.png';
import MagnifyingGlassIcon from '../images/magnifying-glass.png';
import CloseIcon from '../images/close.png';
import NavbarSubmenu1 from './navbar-submenu-1';
import NavbarSubmenu2 from './navbar-submenu-2';
import SideNavbar from './side-navbar';

import {Link, useHistory} from 'react-router-dom';


/*
 * - Gets called every time a key is pressed in either of the search bars.
 * - When the enter key is pressed, sends the user to the search page,
 *   along with some state
 */
const keyPressed = (history, element, showBottomSearchBar, showSideNavbar) => {
  if (window.event.key === 'Enter') {
    window.event.preventDefault();

    const food = document.getElementById(element).value
        .toLowerCase().trim();

    if (food === '') {
      return;
    }

    showBottomSearchBar(false);
    showSideNavbar(false);

    history.push({
      pathname: '/search',
      search: `?search=${food}`,
      state: {food: food},
    });
  }
};


const Navbar = () => {
  const history = useHistory();
  const [showNavbarSubmenu1, setShowNavbarSubmenu1] = useState(false);
  const [showNavbarSubmenu2, setShowNavbarSubmenu2] = useState(false);
  const [showBottomSearchBar, setShowBottomSearchBar] = useState(false);
  const [showSideNavbar, setShowSideNavbar] = useState(false);


  return (
    <nav>
      <div className="navbar-top">
        <div className="navbar-top-main">
          <div className='hamburger-icon-container'
            onClick={() => setShowSideNavbar(true)}>
            <img src={HamburgerIcon} alt='hamburger'/>
          </div>

          <div className="logo-container">
            <a href="/">
              <img className="navbar-img" src={LogoIcon} alt="logo"/>
            </a>
          </div>

          <div className="search-container">
            <form>
              <input id="search-bar" type="text" placeholder="Find a recipe"
                autoComplete="off"
                onKeyPress={() => keyPressed(history,
                    'search-bar',
                    setShowBottomSearchBar,
                    setShowSideNavbar)}
                required/>
            </form>
          </div>

          <Link className="navbar-about" to="/about">About</Link>

          <div className='magnifying-glass-icon-container'
            onClick={() => setShowBottomSearchBar(!showBottomSearchBar)}>
            {
                showBottomSearchBar ?

                <img src={CloseIcon} alt='close'/> :
                <img src={MagnifyingGlassIcon} alt='magnifying glass'/>
            }
          </div>
        </div>
      </div>

      <div className="navbar-bottom">
        <ul>
          <li className="navbar-bottom-meal-types"
            onMouseEnter={() => setShowNavbarSubmenu1(true)}
            onMouseLeave={() => setShowNavbarSubmenu1(false)}>
                        MEAL TYPES
            <img src={DownArrowIcon} alt="down arrow"/>

            {
              showNavbarSubmenu1 &&
              <NavbarSubmenu1
                closeComponent={() => setShowNavbarSubmenu1(false)}/>
            }
          </li>

          <li className="navbar-bottom-cuisines"
            onMouseEnter={() => setShowNavbarSubmenu2(true)}
            onMouseLeave={() => setShowNavbarSubmenu2(false)}>
                        CUISINES
            <img src={DownArrowIcon} alt="down arrow"/>

            {
              showNavbarSubmenu2 &&
              <NavbarSubmenu2
                closeComponent={() => setShowNavbarSubmenu2(false)}/>
            }
          </li>
        </ul>
      </div>

      {
        showBottomSearchBar &&

        <div className="search-container-2">
          <form>
            <input id="search-bar-2" type="text" placeholder="Find a recipe"
              autoComplete="off"
              onKeyPress={() => keyPressed(history,
                  'search-bar-2',
                  setShowBottomSearchBar,
                  setShowSideNavbar)}
              required/>
          </form>
        </div>
      }

      {/*
        * The SideNavbar component is always on the screen, but it's moved to
        * the left, completely out of sight. The process of it getting
        * displayed is:
        * 1. The user clicks on the hamburger icon (so now the code in the
        *    SideNavbar starts to execute)
        * 2. The if condition in the SideNavbar component executes, giving the
        *    component the 'side-navbar open' class name
        * 3. With a class name of 'side-navbar open', the css styles for that
        *    class get applied to the component, making the component slide
        *    into view.
      */}
      <SideNavbar show={showSideNavbar}
        closeSideNavbar={() => setShowSideNavbar(false)}/>
    </nav>
  );
};


export default Navbar;
