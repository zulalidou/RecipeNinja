import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/side-navbar-submenu-5.css';


const SideNavbarSubmenu5 = (props) => {
    return (
        <div className="side-navbar-submenu-5">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=british',
                        state: {
                            foodSearched: 'british'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>British</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=eastern+european',
                        state: {
                            foodSearched: 'eastern european'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Eastern European</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=french',
                        state: {
                            foodSearched: 'french'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>French</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=german',
                        state: {
                            foodSearched: 'german'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>German</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=greek',
                        state: {
                            foodSearched: 'greek'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Greek</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=irish',
                        state: {
                            foodSearched: 'irish'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Irish</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=italian',
                        state: {
                            foodSearched: 'italian'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Italian</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=nordic',
                        state: {
                            foodSearched: 'nordic'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Nordic</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=spanish',
                        state: {
                            foodSearched: 'spanish'
                        }
                    }}
                    onClick={props.closeSideNavbar}>
                        <div>Spanish</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default SideNavbarSubmenu5
