import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Header } from 'components/Header/Header';
import { Main } from 'pages/Main/Main';
import { AboutUs } from 'pages/AboutUs/AboutUs';

describe('App', () => {
  it('render App', () => {
    render(<App />);
  });

  it('navigation test', () => {
    render(
      <MemoryRouter initialEntries={['/', '/about']}>
        <Header />
        <Main notebooks={[]} />
        <AboutUs />
      </MemoryRouter>
    );
  });
});
