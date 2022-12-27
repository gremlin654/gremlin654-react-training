import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ICharacterModalData } from 'types/types';
import { ApiCard } from './ApiCard';

const renderCard = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

// describe('ApiCard', () => {
//   it('renders', () => {
//     render(
//       <ApiCard
//         character={renderCard}
//         isModalActive={false}
//         handleChangeModalActive={function (character: ICharacterModalData): void {
//           throw new Error('Function not implemented.');
//         }}
//       />
//     );

//     expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
//   });
// });
