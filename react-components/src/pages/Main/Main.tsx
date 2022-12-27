import axios, { AxiosResponse } from 'axios';
import { ApiCard } from 'components/ApiCard/ApiCard';
import { ApiCardModal } from 'components/ApiCardModal/ApiCardModal';
import { MyInputApi } from 'components/UI/MyInputApi/MyInputApi';
import { MySelectApi } from 'components/UI/MySelectApi/MySelectApi';
import { Preloader } from 'components/UI/Preloader/Preloader';
import React, { ChangeEvent } from 'react';
import { URL } from 'services/api';
import {
  IApiPageState,
  ICharacterModalData,
  IСharacter,
  IСharactersResponse,
  SortTypeStatus,
} from 'types/types';
import './Main.scss';

export class Main extends React.Component<Record<string, unknown>, IApiPageState> {
  constructor(props: Record<string, unknown> | Readonly<Record<string, unknown>>) {
    super(props);
    this.state = {
      searchValue: '',
      isLoading: false,
      page: 1,
      sortByStatus: SortTypeStatus.alive,
      characters: [] as IСharacter[],
      isModalActive: false,
      modalData: { id: 0, name: '', species: '', gender: '', origin: '', image: '', created: '' },
    };
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    const { page } = this.state;
    try {
      const response: AxiosResponse<IСharactersResponse> = await axios.get(
        `${URL.BASE}api/character/?page=${page}`
      );
      this.setState({ characters: response.data.results });
    } catch (error) {
      console.error;
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { searchValue, sortByStatus, page } = this.state;
    try {
      const response: AxiosResponse<IСharactersResponse> = await axios.get(
        `${URL.BASE}api/character/?page=${page}&name=${searchValue}&status=${sortByStatus}`
      );
      this.setState({ characters: response.data.results });
    } catch (error) {
      this.setState({ characters: [] });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sortByStatus: event.target.value });
  };

  clear = () => {
    this.setState({ searchValue: '' });
  };

  handleChangeModalActive = (character: ICharacterModalData) => {
    this.setState({
      isModalActive: true,
      modalData: character,
    });
  };

  handleChangeModalClose = () => {
    this.setState({
      isModalActive: false,
      modalData: { id: 0, name: '', species: '', gender: '', origin: '', image: '', created: '' },
    });
  };

  onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      this.setState({ searchValue: event.currentTarget.value });
    }
  };

  render() {
    const { isLoading, searchValue, characters, isModalActive, modalData } = this.state;

    return (
      <div className="api-page__container" data-testid="api-page-container">
        <form className="api-page__form" onSubmit={this.handleSubmit}>
          <label className="api-page__search-container">
            <MyInputApi
              searchValue={searchValue}
              handleChange={this.handleChange}
              clear={this.clear}
              onKeyPressHandler={this.onKeyPressHandler}
            />
          </label>
          <MySelectApi onChangeSelect={this.onChangeSelect} />
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
                  handleChangeModalActive={this.handleChangeModalActive}
                />
              ))
            ) : (
              <h2 className="api-page__error-title">{`Sorry, we can't find the character.`}</h2>
            )}
            {isModalActive && (
              <ApiCardModal
                handleChangeModalClose={this.handleChangeModalClose}
                modalData={modalData}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
