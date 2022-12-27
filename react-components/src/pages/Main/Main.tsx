import axios, { AxiosResponse } from 'axios';
import { ApiCard } from 'components/ApiCard/ApiCard';
import { ApiCardModal } from 'components/ApiCardModal/ApiCardModal';
import { MyInputApi } from 'components/UI/MyInputApi/MyInputApi';
import { MySelectApi } from 'components/UI/MySelectApi/MySelectApi';
import { Preloader } from 'components/UI/Preloader/Preloader';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { URL } from 'services/api';
import { ICharacterModalData, IСharacter, IСharactersResponse, SortTypeStatus } from 'types/types';
import './Main.scss';

export interface IModalDataDefault {
  id: number;
  name: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
  created: string;
}

export const modalDataDefault = {
  id: 0,
  name: '',
  species: '',
  gender: '',
  origin: '',
  image: '',
  created: '',
};

export const Main = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [sortByStatus, setSortByStatus] = useState<string>(SortTypeStatus.alive);
  const [characters, setCharacters] = useState<IСharacter[]>([]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalDataDefault>(modalDataDefault);

  const getAllCharacters = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<IСharactersResponse> = await axios.get(
        `${URL.BASE}api/character/?page=${page}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response: AxiosResponse<IСharactersResponse> = await axios.get(
        `${URL.BASE}api/character/?page=${page}&name=${searchValue}&status=${sortByStatus}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortByStatus(event.target.value);
  };

  const clear = () => {
    setSearchValue('');
  };

  const handleChangeModalActive = (character: ICharacterModalData) => {
    setIsModalActive(true);
    setModalData(character);
  };

  const handleChangeModalClose = () => {
    setIsModalActive(false);
    setModalData(modalDataDefault);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      setSearchValue(event.currentTarget.value);
    }
  };

  return (
    <div className="api-page__container" data-testid="api-page-container">
      <form className="api-page__form" onSubmit={handleSubmit}>
        <label className="api-page__search-container">
          <MyInputApi
            searchValue={searchValue}
            handleChange={handleChange}
            clear={clear}
            onKeyPressHandler={onKeyPressHandler}
          />
        </label>
        <MySelectApi onChangeSelect={onChangeSelect} />
        <button
          className="api-page__search-button"
          type="submit"
          disabled={!searchValue.length}
          data-testid="button-search"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="api-page__card-container">
          {characters.length ? (
            characters.map((character) => (
              <ApiCard
                key={character.id}
                character={character}
                isModalActive={isModalActive}
                handleChangeModalActive={handleChangeModalActive}
              />
            ))
          ) : (
            <h2 className="api-page__error-title">{`Sorry, we can't find the character.`}</h2>
          )}
          {isModalActive && (
            <ApiCardModal handleChangeModalClose={handleChangeModalClose} modalData={modalData} />
          )}
        </div>
      )}
    </div>
  );
};
