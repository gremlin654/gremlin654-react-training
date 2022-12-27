import { render, screen } from '@testing-library/react';
import React from 'react';
import { MyInputApi } from './MyInputApi';

describe('Input', () => {
  it('renders', () => {
    render(
      <MyInputApi
        searchValue={''}
        handleChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        }}
        clearInput={function (): void {
          throw new Error('Function not implemented.');
        }}
        onKeyPressHandler={function (event: React.KeyboardEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    expect(screen.getByTestId('input-search')).toBeInTheDocument();
  });
});
