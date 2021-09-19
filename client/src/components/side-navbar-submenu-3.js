import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/side-navbar-submenu-3.css';


const SideNavbarSubmenu3 = (props) => {
  return (
    <div className="side-navbar-submenu-3">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=american',
            state: {
              foodSearched: 'american',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>American</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=caribbean',
            state: {
              foodSearched: 'caribbean',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Caribbean</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=latin+american',
            state: {
              foodSearched: 'latin american',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Latin American</div>
          </Link>
        </li>

        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=mexican',
            state: {
              foodSearched: 'mexican',
            },
          }}
          onClick={props.closeSideNavbar}>
            <div>Mexican</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


SideNavbarSubmenu3.propTypes = {
  closeSideNavbar: PropTypes.func,
};


export default SideNavbarSubmenu3;
