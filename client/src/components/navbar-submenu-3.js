import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/navbar-submenu-3.css';


const NavbarSubmenu3 = (props) => {
  return (
    <div className="navbar-submenu-3">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=american',
            state: {
              foodSearched: 'american',
            },
          }}
          onClick={props.closeComponent}>
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
          onClick={props.closeComponent}>
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
          onClick={props.closeComponent}>
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
          onClick={props.closeComponent}>
            <div>Mexican</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


NavbarSubmenu3.propTypes = {
  closeComponent: PropTypes.func,
};


export default NavbarSubmenu3;
