import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/navbar-submenu-4.css';


const NavbarSubmenu4 = (props) => {
    return (
        <div className="navbar-submenu-4">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=chinese',
                        state: {
                            foodSearched: 'chinese'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Chinese</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=indian',
                        state: {
                            foodSearched: 'indian'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Indian</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=japanese',
                        state: {
                            foodSearched: 'japanese'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Japanese</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=korean',
                        state: {
                            foodSearched: 'korean'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Korean</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=thai',
                        state: {
                            foodSearched: 'thai'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Thai</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=vietnamese',
                        state: {
                            foodSearched: 'vietnamese'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Vietnamese</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default NavbarSubmenu4
