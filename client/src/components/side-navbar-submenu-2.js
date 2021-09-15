import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import SideNavbarSubmenu3 from './side-navbar-submenu-3';
import SideNavbarSubmenu4 from './side-navbar-submenu-4';
import SideNavbarSubmenu5 from './side-navbar-submenu-5';

import '../styles/side-navbar-submenu-2.css';

import UpArrowIcon from '../images/up-arrow.png';
import DownArrowIcon from '../images/down-arrow.png';

const SideNavbarSubmenu2 = (props) => {
    const [showSideNavbarSubmenu3, setShowSideNavbarSubmenu3] = useState(false)
    const [showSideNavbarSubmenu4, setShowSideNavbarSubmenu4] = useState(false)
    const [showSideNavbarSubmenu5, setShowSideNavbarSubmenu5] = useState(false)

    return (
        <div className="side-navbar-submenu-2">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=africa',
                        state: {
                            foodSearched: 'africa'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Africa</div>
                    </Link>
                </li>

                <li>
                    <div className="side-navbar-americas" onClick={() => setShowSideNavbarSubmenu3(!showSideNavbarSubmenu3)}>
                        <strong>Americas</strong>

                        {(showSideNavbarSubmenu3) ?
                            <img src={UpArrowIcon} alt="up arrow"/>
                            :
                            <img src={DownArrowIcon} alt="down arrow"/>
                        }
                    </div>
                </li>

                {showSideNavbarSubmenu3 && <SideNavbarSubmenu3 closeSideNavbar={props.closeSideNavbar} />}

                <li>
                    <div className="side-navbar-asia" onClick={() => setShowSideNavbarSubmenu4(!showSideNavbarSubmenu4)}>
                        <strong>Asia</strong>

                        {(showSideNavbarSubmenu4) ?
                            <img src={UpArrowIcon} alt="up arrow"/>
                            :
                            <img src={DownArrowIcon} alt="down arrow"/>
                        }
                    </div>
                </li>

                {showSideNavbarSubmenu4 && <SideNavbarSubmenu4 closeSideNavbar={props.closeSideNavbar} />}

                <li>
                    <div className="side-navbar-europe" onClick={() => setShowSideNavbarSubmenu5(!showSideNavbarSubmenu5)}>
                        <strong>Europe</strong>

                        {(showSideNavbarSubmenu5) ?
                            <img src={UpArrowIcon} alt="up arrow"/>
                            :
                            <img src={DownArrowIcon} alt="down arrow"/>
                        }
                    </div>
                </li>

                {showSideNavbarSubmenu5 && <SideNavbarSubmenu5 closeSideNavbar={props.closeSideNavbar} />}

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=mediterranean',
                        state: {
                            foodSearched: 'mediterranean'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
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
                    onClick={props.closeSideNavbar}>
                        <div>Middle East</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default SideNavbarSubmenu2
