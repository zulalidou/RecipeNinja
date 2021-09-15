import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/side-navbar-submenu-1.css';


const SideNavbarSubmenu1 = (props) => {
    console.log(props)

    return (
        <div className="side-navbar-submenu-1">
            <ul>
                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=main+courses',
                        state: {
                            foodSearched: 'main courses'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Main Courses</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=side+dishes',
                        state: {
                            foodSearched: 'side dishes'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Side Dishes</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=desserts',
                        state: {
                            foodSearched: 'desserts'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Desserts</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=appetizers',
                        state: {
                            foodSearched: 'appetizers'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Appetizers</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=soups',
                        state: {
                            foodSearched: 'soups'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Soups</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=sauces',
                        state: {
                            foodSearched: 'sauces'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Sauces</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=snacks',
                        state: {
                            foodSearched: 'snacks'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Snacks</div>
                    </Link>
                </li>

                <li>
                    <Link to={{
                        pathname: '/search',
                        search: '?search=beverages',
                        state: {
                            foodSearched: 'beverages'
                        }
                    }}>
                        <div onClick={props.closeSideNavbar}>Beverages</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default SideNavbarSubmenu1
