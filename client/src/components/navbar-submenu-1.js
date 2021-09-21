import React from 'react';
import '../styles/navbar-submenu-1.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const NavbarSubmenu1 = (props) => {
  console.log(props);

  return (
    <div className="navbar-submenu-1">
      <ul>
        <li>
          <Link to={{
            pathname: '/search',
            search: '?search=main+courses',
            state: {
              food: 'main courses',
            },
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
              food: 'side dishes',
            },
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
              food: 'desserts',
            },
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
              food: 'appetizers',
            },
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
              food: 'soups',
            },
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
              food: 'sauces',
            },
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
              food: 'snacks',
            },
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
              food: 'beverages',
            },
          }}
          onClick={props.closeComponent}>
            <div>Beverages</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


NavbarSubmenu1.propTypes = {
  closeComponent: PropTypes.func,
};


export default NavbarSubmenu1;
