import React from 'react';
import '../styles/side-navbar-submenu-5.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const SideNavbarSubmenu5 = (props) => {
  return (
    <div className="side-navbar-submenu-5">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=british',
            state: {
              food: 'british',
            },
          }}
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
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
          onClick={props.closeSideNavbar}>
            <div>Spanish</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


SideNavbarSubmenu5.propTypes = {
  closeSideNavbar: PropTypes.func,
};


export default SideNavbarSubmenu5;
