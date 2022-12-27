import React, { ChangeEvent } from 'react';
import { ApiCard } from 'components/ApiCard/ApiCard';
import { MyInputApi } from 'components/UI/MyInputApi/MyInputApi';
import { MySelectByGender } from 'components/UI/MySelectByGender/MySelectByGender';
import { MySelectBySpecies } from 'components/UI/MySelectBySpecies/MySelectBySpecies';
import { MySelectByStatus } from 'components/UI/MySelectByStatus/MySelectByStatus';
import { Preloader } from 'components/UI/Preloader/Preloader';
import { ICharacterData } from 'types/types';
import { Pagination } from 'components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchCharactersData } from 'store/reducers/ActionCreators';
import { SearchSlice } from 'store/reducers/SearchSlice';
import './Main.scss';

export const Main = () => {
  const {
    isLoading,
    error,
    characters,
    page,
    searchValue,
    sortByGender,
    sortBySpecies,
    sortByStatus,
  } = useAppSelector((state) => state.SearchSlice);
  const { setValue, setSortStatus, setSortGender, setSortSpecies, clear, setCharacterData } =
    SearchSlice.actions;
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchCharactersData({ page, searchValue, sortByGender, sortBySpecies, sortByStatus }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(event.target.value));
  };

  const onChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortStatus(event.target.value));
  };

  const onChangeGender = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortGender(event.target.value));
  };

  const onChangeSpecies = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortSpecies(event.target.value));
  };

  const clearInput = () => {
    dispatch(clear(''));
  };

  const handleChangeCharacter = (character: ICharacterData) => {
    dispatch(setCharacterData(character));
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      dispatch(setValue(event.currentTarget.value));
    }
  };

  return (
    <div className="api-page__container" data-testid="api-page-container">
      <form className="api-page__form" onSubmit={handleSubmit}>
        <label className="api-page__search-container">
          <MyInputApi
            searchValue={searchValue}
            handleChange={handleChange}
            clearInput={clearInput}
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
      <Pagination />
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
            <h2 className="api-page__error-title">{error}</h2>
          )}
        </div>
      )}
    </div>
  );
};
