import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'utils/constants';
import './Header.scss';

export class Header extends React.Component {
  state = {
    active: '',
  };

  render() {
    return (
      <header className="header__container">
        <nav className="header__navigation ">
          <ul className="header__navigation-list">
            <li>
              <Link
                className={`${this.state.active === 'main' ? 'active' : ''}`}
                to={PATH.MAIN}
                onClick={() => this.setState({ active: 'main' })}
                data-testid="main-link"
              >
                Main
              </Link>
            </li>
            <li>
              <Link
                className={`${this.state.active === 'about' ? 'active' : ''}`}
                to={PATH.ABOUT_US}
                onClick={() => this.setState({ active: 'about' })}
                data-testid="about-link"
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
