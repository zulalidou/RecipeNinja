import React from 'react';
import '../styles/navbar-submenu-5.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const NavbarSubmenu5 = (props) => {
  return (
    <div className="navbar-submenu-5">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=british',
            state: {
              food: 'british',
            },
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
              food: 'eastern european',
            },
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
              food: 'french',
            },
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
              food: 'german',
            },
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
              food: 'greek',
            },
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
              food: 'irish',
            },
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
              food: 'italian',
            },
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
              food: 'nordic',
            },
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
              food: 'spanish',
            },
          }}
          onClick={props.closeComponent}>
            <div>Spanish</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


NavbarSubmenu5.propTypes = {
  closeComponent: PropTypes.func,
};


export default NavbarSubmenu5;
