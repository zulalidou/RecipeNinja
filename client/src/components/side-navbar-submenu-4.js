import React from 'react';
import '../styles/side-navbar-submenu-4.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const SideNavbarSubmenu4 = (props) => {
  return (
    <div className="side-navbar-submenu-4">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=chinese',
            state: {
              food: 'chinese',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Chinese</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=indian',
            state: {
              food: 'indian',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Indian</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=japanese',
            state: {
              food: 'japanese',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Japanese</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=korean',
            state: {
              food: 'korean',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Korean</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=thai',
            state: {
              food: 'thai',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Thai</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=vietnamese',
            state: {
              food: 'vietnamese',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Vietnamese</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


SideNavbarSubmenu4.propTypes = {
  closeSideNavbar: PropTypes.func,
};


export default SideNavbarSubmenu4;
