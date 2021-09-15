import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/navbar-submenu-1.css';


const NavbarSubmenu1 = (props) => {
    console.log(props)

    return (
        <div className="navbar-submenu-1">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=main+courses',
                        state: {
                            foodSearched: 'main courses'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Main Courses</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=side+dishes',
                        state: {
                            foodSearched: 'side dishes'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Side Dishes</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=desserts',
                        state: {
                            foodSearched: 'desserts'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Desserts</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=appetizers',
                        state: {
                            foodSearched: 'appetizers'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Appetizers</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=soups',
                        state: {
                            foodSearched: 'soups'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Soups</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=sauces',
                        state: {
                            foodSearched: 'sauces'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Sauces</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=snacks',
                        state: {
                            foodSearched: 'snacks'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Snacks</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=beverages',
                        state: {
                            foodSearched: 'beverages'
                        }
                    }}
                    onClick={props.closeComponent}>
                        <div>Beverages</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default NavbarSubmenu1
