import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Header } from './Header';

describe('Header', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const linkMain = screen.getByTestId('main-link');
    const linkAbout = screen.getByTestId('about-link');

    expect(linkMain).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
  });

  it('add active class on link on click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const linkMain = screen.getByTestId('main-link');
    const linkAbout = screen.getByTestId('about-link');

    fireEvent.click(linkMain);

    expect(linkMain).toHaveClass('active');
    expect(screen.queryByTestId('about-link')).not.toHaveClass('active');

    fireEvent.click(linkAbout);

    expect(linkAbout).toHaveClass('active');
    expect(screen.queryByTestId('main-link')).not.toHaveClass('active');
  });
});
