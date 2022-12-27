import { render, screen } from '@testing-library/react';
import React from 'react';
import Form from './Form';
import UserForm from 'components/UserForm/UserForm';
import UserCard from 'components/UserCard/UserCard';
import { IPersonCard } from '../../types/types';

const personCard = {
  name: 'Andrey',
  surname: 'smith',
  date: 'string',
  country: 'string',
  gender: false,
  img: '',
};

describe('Form component', () => {
  it('render Form', () => {
    render(<Form />);
  });

  it('renders components', () => {
    render(<Form />);

    expect(screen.getByText('Please fill out the user form')).toBeInTheDocument();
    expect(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );
    expect(<UserCard card={personCard} />);
  });
});
