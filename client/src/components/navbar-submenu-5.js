import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/navbar-submenu-5.css';


const NavbarSubmenu5 = (props) => {
    return (
        <div className="navbar-submenu-5">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=british',
                        state: {
                            foodSearched: 'british'
                        }
                    }}
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
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
                    onClick={props.closeComponent}>
                        <div>Spanish</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default NavbarSubmenu5
