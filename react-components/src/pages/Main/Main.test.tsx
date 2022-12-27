import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Main } from './Main';
import axios from 'axios';
import { URL } from 'services/api';
import userEvent from '@testing-library/user-event';

const results = [
  {
    created: '2017-11-04T18:50:21.651Z',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    gender: '',
    id: 2,
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    name: 'Morty Smith',
    origin: { name: 'unknown', url: '' },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: 'https://rickandmortyapi.com/api/character/2',
  },
  {
    created: '2017-11-04T19:22:43.665Z',
    episode: ['https://rickandmortyapi.com/api/episode/51'],
    gender: 'Female',
    id: 4,
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    name: 'Beth Smith',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: 'https://rickandmortyapi.com/api/character/4',
  },
];

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Main component', () => {
  it('fetches characters from an API', async () => {
    const promise = Promise.resolve({ data: { results } });
    mockedAxios.get.mockImplementation(() => promise);

    render(<Main />);

    const charactersCards = await screen.findAllByTestId('character-card');

    expect(charactersCards.length).toBe(2);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(URL.MOCK_FETCH);
  });

  it('fetches characters from an API and reject', async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject(new Error()));

    render(<Main />);

    const message = await screen.findByText(/Sorry, we can't find the character/);

    expect(message).toBeInTheDocument();

    expect(screen.queryByTestId('character-card')).not.toBeInTheDocument();
  });

  it('input search', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { results } }));

    render(<Main />);

    const input = await screen.findByTestId('input-search');

    expect(input).toBeInTheDocument();

    fireEvent.input(input, {
      target: { value: '123' },
    });

    expect(screen.queryByTestId('input-search')).toContainHTML('123');

    const searchButton = await screen.findByTestId('button-search');
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(axios.get).toHaveBeenCalledTimes(2);

    expect(mockedAxios.get.mockImplementation(() => Promise.reject(new Error())));

    render(<Main />);

    const message = await screen.findByText(/Sorry, we can't find the character/);

    expect(message).toBeInTheDocument();
  });

  it('input search if keypress enter', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { results } }));

    render(<Main />);

    const input = await screen.findByTestId('input-search');

    expect(input).toBeInTheDocument();

    fireEvent.input(input, {
      target: { value: '123' },
    });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    mockedAxios.get.mockImplementation(() => Promise.reject(new Error()));

    render(<Main />);

    const message = await screen.findByText(/Sorry, we can't find the character/);

    expect(message).toBeInTheDocument();
  });

  it('input clear', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { results } }));

    render(<Main />);

    const input = await screen.findByTestId('input-search');

    expect(input).toBeInTheDocument();

    fireEvent.input(input, {
      target: { value: '123' },
    });

    expect(screen.queryByTestId('input-search')).toContainHTML('123');

    const croos = await screen.findByTestId('search-croos');

    fireEvent.click(croos);

    expect(screen.queryByTestId('input-search')).toContainHTML('');
  });

  it('render select ', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { results } }));

    render(<Main />);

    const select = await screen.findByTestId('select-life');
    const selectOption = (await screen.findByRole('option', { name: 'Dead' })) as HTMLOptionElement;

    expect(select).toBeInTheDocument();
    expect(selectOption).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(3);

    userEvent.selectOptions(select, selectOption);

    expect(selectOption.selected).toBe(true);
    expect(select).toHaveValue('dead');
  });

  it('open modal after click cards', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { results } }));

    render(<Main />);

    const charactersCards = await screen.findAllByTestId('character-card');

    fireEvent.click(charactersCards[0]);

    const modal = await screen.findByTestId('card-modal');

    expect(modal).toBeInTheDocument();

    const closeBtn = await screen.findByTestId('close-card-modal');

    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('close-card-modal')).not.toBeInTheDocument();
  });
});
