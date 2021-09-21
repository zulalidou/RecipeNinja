import React from 'react';
import '../styles/navbar-submenu-4.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const NavbarSubmenu4 = (props) => {
  return (
    <div className="navbar-submenu-4">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=chinese',
            state: {
              food: 'chinese',
            },
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
              food: 'indian',
            },
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
              food: 'japanese',
            },
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
              food: 'korean',
            },
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
              food: 'thai',
            },
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
              food: 'vietnamese',
            },
          }}
          onClick={props.closeComponent}>
            <div>Vietnamese</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


NavbarSubmenu4.propTypes = {
  closeComponent: PropTypes.func,
};


export default NavbarSubmenu4;
