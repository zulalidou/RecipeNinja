import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import NavbarSubmenu3 from './navbar-submenu-3';
import NavbarSubmenu4 from './navbar-submenu-4';
import NavbarSubmenu5 from './navbar-submenu-5';

import '../styles/navbar-submenu-2.css';

import RightArrowIcon from '../images/right-arrow.png';


const NavbarSubmenu2 = (props) => {
    const [showNavbarSubmenu3, setShowNavbarSubmenu3] = useState(false)
    const [showNavbarSubmenu4, setShowNavbarSubmenu4] = useState(false)
    const [showNavbarSubmenu5, setShowNavbarSubmenu5] = useState(false)

    return (
        <div className="navbar-submenu-2">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=africa',
                        state: {
                            foodSearched: 'africa'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Africa</div>
                    </Link>
                </li>

                <li>
                    <div id="navbar-americas"
                        onMouseEnter={() => setShowNavbarSubmenu3(true)}
                        onMouseLeave={() => setShowNavbarSubmenu3(false)}>
                        Americas<img src={RightArrowIcon} alt="right arrow icon"/>

                        {showNavbarSubmenu3 && <NavbarSubmenu3 closeComponent={props.closeComponent} />}
                    </div>
                </li>

                <li>
                    <div id="navbar-asia"
                        onMouseEnter={() => setShowNavbarSubmenu4(true)}
                        onMouseLeave={() => setShowNavbarSubmenu4(false)}>
                        Asia<img src={RightArrowIcon} alt="right arrow icon"/>

                        {showNavbarSubmenu4 && <NavbarSubmenu4 closeComponent={props.closeComponent} />}
                    </div>
                </li>

                <li>
                    <div id="navbar-europe"
                        onMouseEnter={() => setShowNavbarSubmenu5(true)}
                        onMouseLeave={() => setShowNavbarSubmenu5(false)}>
                        Europe
                        <img src={RightArrowIcon} alt="right arrow icon"/>

                        {showNavbarSubmenu5 && <NavbarSubmenu5 closeComponent={props.closeComponent} />}
                    </div>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=mediterranean',
                        state: {
                            foodSearched: 'mediterranean'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Mediterranean</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=middle+east',
                        state: {
                            foodSearched: 'middle east'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Middle East</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default NavbarSubmenu2
