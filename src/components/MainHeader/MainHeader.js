import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  const navigation = (
    <nav>
      <ul>
        <Fragment>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to='/home'
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to='/users'
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to='/admin'
            >
              Admin
            </NavLink>
          </li>
        </Fragment>
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <h1>Request maker</h1>
    </header>
  );
};

export default MainHeader;
