import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from 'utils/constants';
import './Header.scss';

export const Header = () => {
  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '');

  return (
    <header className="header__container">
      <nav className="header__navigation ">
        <ul className="header__navigation-list">
          <li>
            <NavLink className={setActive} to={PATH.MAIN} data-testid="main-link" end>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to={PATH.ABOUT_US} data-testid="about-link">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to={PATH.FORM} data-testid="form-link">
              Form
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
