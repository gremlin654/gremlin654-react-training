import { render, screen } from '@testing-library/react';
import React from 'react';
import { UserCard } from './UserCard';

const renderCard = {
  name: 'Andrey',
  surname: 'Smith',
  date: '2022-10-10',
  country: 'Belarus',
  gender: false,
  img: 'https://cdn21vek.by/img/galleries/7141/530/preview/vivobooke410mabv1517_asus_61c4415cbea7f.jpeg',
};

const renderCard2 = {
  name: 'Вася',
  surname: 'Smith',
  date: '2022-09-10',
  country: 'Ukraine',
  gender: true,
  img: 'https://cdn21vek.by/img/galleries/7141/530/preview/vivobooke410mabv1517_asus_61c4415cbea7f.jpeg',
};

describe('UserCard', () => {
  it('renders', () => {
    render(<UserCard card={renderCard} />);

    expect(screen.getByText(/Andrey/i)).toBeInTheDocument();
    expect(screen.getByText(/Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-10-10/i)).toBeInTheDocument();
    expect(screen.getByText(/Belarus/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByTestId('user-card-image')).toBeInTheDocument();
  });

  it('renders new card', () => {
    render(<UserCard card={renderCard2} />);

    expect(screen.getByText(/Вася/i)).toBeInTheDocument();
    expect(screen.getByText(/Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-09-10/i)).toBeInTheDocument();
    expect(screen.getByText(/Ukraine/i)).toBeInTheDocument();
    expect(screen.getByText(/Female/i)).toBeInTheDocument();
    expect(screen.getByTestId('user-card-image')).toBeInTheDocument();
  });
});
