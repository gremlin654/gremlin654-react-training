import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MyInput } from './MyInput';

describe('Input', () => {
  it('renders', () => {
    render(<MyInput />);

    expect(screen.getByTestId('input-search')).toBeInTheDocument();
  });

  it('have focus', () => {
    render(<MyInput />);

    expect(screen.getByTestId('input-search')).toHaveFocus();
  });

  it('event', () => {
    render(<MyInput />);

    const input = screen.getByTestId('input-search');

    expect(input).toContainHTML('');

    fireEvent.input(input, {
      target: { value: '123' },
    });

    expect(screen.queryByTestId('input-search')).toContainHTML('123');
  });

  it('should initialise with the value stored in localStorage', () => {
    render(<MyInput />);

    const input = screen.getByTestId('input-search');

    expect(input).toContainHTML('');

    localStorage.setItem('input', '');

    fireEvent.input(input, {
      target: { value: 'model' },
    });

    localStorage.setItem('input', 'model');

    expect(localStorage.getItem('input')).toBe('model');
  });

  it('clear value in input', () => {
    render(<MyInput />);

    const input = screen.getByTestId('input-search');

    expect(input).toContainHTML('');

    localStorage.setItem('input', '');

    fireEvent.input(input, {
      target: { value: 'model' },
    });

    localStorage.setItem('input', 'model');

    const searchCroos = screen.getByTestId('search__croos');

    expect(input).toHaveValue('model');
    expect(localStorage.getItem('input')).toBe('model');
    expect(searchCroos).toBeInTheDocument();

    fireEvent.click(searchCroos);

    expect(input).toHaveValue('');
    expect(localStorage.getItem('input')).toBe('');
  });
});
