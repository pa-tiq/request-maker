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
              to='/ticket'
            >
              Ticket
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to='/HDT'
            >
              HDT
            </NavLink>
          </li>
        </Fragment>
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <h1>Request maker</h1>
      {navigation}
    </header>
  );
};

export default MainHeader;
