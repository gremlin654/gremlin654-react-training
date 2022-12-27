import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ApiCardModal } from './ApiCardModal';

const modalData = {
  created: '2017-11-04T18:50:21.651Z',
  gender: '',
  id: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  name: 'Morty Smith',
  origin: 'unknown',
  species: 'Human',
};

describe('Modal companent', () => {
  it('render', () => {
    render(<ApiCardModal handleChangeModalClose={function (): void {}} modalData={modalData} />);

    expect(screen.getByText('2017-11-04T18:50:21.651Z')).toBeInTheDocument();
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  it('do not close modal window if click in image', () => {
    render(<ApiCardModal handleChangeModalClose={function (): void {}} modalData={modalData} />);

    const image = screen.getByRole('img');

    userEvent.click(image);

    expect(image).toBeInTheDocument();
  });

  it('do not close modal window if click in window', () => {
    render(<ApiCardModal handleChangeModalClose={function (): void {}} modalData={modalData} />);

    const window = screen.getByTestId('modal-window');

    userEvent.click(window);

    expect(window).toBeInTheDocument();
  });
});
