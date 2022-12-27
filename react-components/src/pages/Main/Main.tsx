import React, { ChangeEvent, useContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ApiCard } from 'components/ApiCard/ApiCard';
import { MyInputApi } from 'components/UI/MyInputApi/MyInputApi';
import { MySelectByGender } from 'components/UI/MySelectByGender/MySelectByGender';
import { MySelectBySpecies } from 'components/UI/MySelectBySpecies/MySelectBySpecies';
import { MySelectByStatus } from 'components/UI/MySelectByStatus/MySelectByStatus';
import { Preloader } from 'components/UI/Preloader/Preloader';
import { GlobalData } from 'context/context';
import { URL } from 'services/api';
import { ICharacterData, ICharactersPagesInfo, IСharactersResponse } from 'types/types';
import './Main.scss';
import { Pagination } from 'components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import { ACTION_TYPE } from 'types/enums';

export const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { stateSearch, dispatchSearch } = useContext(GlobalData);
  const { searchValue, characters, page, sortByStatus, sortByGender, sortBySpecies } = stateSearch;

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response: AxiosResponse<IСharactersResponse> = await axios.get(
        `${URL.BASE}api/character/?page=${page}&name=${searchValue}&status=${sortByStatus}&gender=${sortByGender}&species=${sortBySpecies}`
      );
      dispatchSearch({
        type: ACTION_TYPE.SET_CHARACTERS,
        payload: { ...stateSearch, characters: response.data.results },
      });
      dispatchSearch({
        type: ACTION_TYPE.SET_INFO,
        payload: { ...stateSearch, info: response.data.info },
      });
      dispatchSearch({
        type: ACTION_TYPE.SET_PAGE,
        payload: { ...stateSearch, page: 1 },
      });
      getPages(response.data.info);
    } catch (error) {
      dispatchSearch({
        type: ACTION_TYPE.SET_CHARACTERS,
        payload: { ...stateSearch, characters: null },
      });
      dispatchSearch({
        type: ACTION_TYPE.SET_INFO,
        payload: { ...stateSearch, info: null },
      });
      dispatchSearch({
        type: ACTION_TYPE.SET_PAGE,
        payload: { ...stateSearch, page: 1 },
      });
      dispatchSearch({ type: ACTION_TYPE.SET_PAGES, payload: { ...stateSearch, pages: [] } });
    } finally {
      setIsLoading(false);
    }
  };

  const getPages = (info: ICharactersPagesInfo) => {
    if (info?.pages) {
      let arrayNumber: number[] = [];
      for (let i = 1; i <= info?.pages; i++) {
        arrayNumber = [...arrayNumber, i];
      }
      dispatchSearch({
        type: ACTION_TYPE.SET_PAGES,
        payload: { ...stateSearch, pages: arrayNumber },
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchSearch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { ...stateSearch, searchValue: event.target.value },
    });
  };

  const onChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatchSearch({
      type: ACTION_TYPE.SET_SORT_STATUS,
      payload: { ...stateSearch, sortByStatus: event.target.value },
    });
  };

  const onChangeGender = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatchSearch({
      type: ACTION_TYPE.SET_SORT_GENDER,
      payload: { ...stateSearch, sortByGender: event.target.value },
    });
  };

  const onChangeSpecies = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatchSearch({
      type: ACTION_TYPE.SET_SORT_SPECIES,
      payload: { ...stateSearch, sortBySpecies: event.target.value },
    });
  };

  const clear = () => {
    dispatchSearch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { ...stateSearch, searchValue: '' },
    });
  };

  const handleChangeCharacter = (character: ICharacterData) => {
    dispatchSearch({
      type: ACTION_TYPE.SET_CHARACTER_DATA,
      payload: { ...stateSearch, characterData: character },
    });
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      dispatchSearch({
        type: ACTION_TYPE.SET_VALUE,
        payload: { ...stateSearch, searchValue: event.currentTarget.value },
      });
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
        <MySelectByStatus onChangeStatus={onChangeStatus} sortByStatus={sortByStatus} />
        <MySelectByGender onChangeGender={onChangeGender} sortByGender={sortByGender} />
        <MySelectBySpecies onChangeSpecies={onChangeSpecies} sortBySpecies={sortBySpecies} />
        <button className="api-page__search-button" type="submit" data-testid="button-search">
          Search
        </button>
      </form>
      <Pagination setIsLoading={setIsLoading} getPages={getPages} />
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="api-page__card-container">
          {characters && characters.length ? (
            characters.map((character) => (
              <Link key={character.id} to={`/character/${character.id}`}>
                <ApiCard character={character} handleChangeCharacter={handleChangeCharacter} />
              </Link>
            ))
          ) : (
            <h2 className="api-page__error-title">{`Sorry, we can't find the character.`}</h2>
          )}
        </div>
      )}
    </div>
  );
};
