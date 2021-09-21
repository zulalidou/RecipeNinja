import React from 'react';
import '../styles/side-navbar-submenu-1.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const SideNavbarSubmenu1 = (props) => {
  return (
    <div className="side-navbar-submenu-1">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=main+courses',
            state: {
              food: 'main courses',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Main Courses</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=side+dishes',
            state: {
              food: 'side dishes',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Side Dishes</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=desserts',
            state: {
              food: 'desserts',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Desserts</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=appetizers',
            state: {
              food: 'appetizers',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Appetizers</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=soups',
            state: {
              food: 'soups',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Soups</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=sauces',
            state: {
              food: 'sauces',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Sauces</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=snacks',
            state: {
              food: 'snacks',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Snacks</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=beverages',
            state: {
              food: 'beverages',
            },
          }}>
            <div onClick={props.closeSideNavbar}>Beverages</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


SideNavbarSubmenu1.propTypes = {
  closeSideNavbar: PropTypes.func,
};


export default SideNavbarSubmenu1;
