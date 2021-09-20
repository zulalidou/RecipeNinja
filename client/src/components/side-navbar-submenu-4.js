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
              foodSearched: 'chinese',
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
              foodSearched: 'indian',
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
              foodSearched: 'japanese',
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
              foodSearched: 'korean',
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
              foodSearched: 'thai',
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
              foodSearched: 'vietnamese',
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
