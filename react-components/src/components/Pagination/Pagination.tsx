import axios, { AxiosResponse } from 'axios';
import { GlobalData } from 'context/context';
import React, { useContext, useEffect } from 'react';
import { IPaginationProps, IСharactersResponse } from 'types/types';
import { URL } from 'services/api';
import { ACTION_TYPE } from 'types/enums';
import './Pagination.scss';

export const Pagination: React.FC<IPaginationProps> = ({ setIsLoading, getPages }) => {
  const { stateSearch, dispatchSearch } = useContext(GlobalData);
  const { info, page, searchValue, sortByStatus, sortByGender, sortBySpecies, pages } = stateSearch;

  const getPageData = async () => {
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
      dispatchSearch({ type: ACTION_TYPE.SET_PAGES, payload: { ...stateSearch, pages: [] } });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
  }, [page]);

  const getNextPage = async () => {
    dispatchSearch({
      type: ACTION_TYPE.SET_PAGE,
      payload: { ...stateSearch, page: page + 1 },
    });
  };

  const getPrevPage = async () => {
    dispatchSearch({
      type: ACTION_TYPE.SET_PAGE,
      payload: { ...stateSearch, page: page - 1 },
    });
  };

  return (
    <div className="pagination__container">
      {info && (
        <>
          <h3 className="pagination__characters">
            Characters: <span>{info.count}</span>
          </h3>
          <div className="pagination__container-control">
            <button className="pagination__button" onClick={getPrevPage} disabled={!info.prev}>
              Prev
            </button>
            <div className="pagination__container-select">
              <p className="pagination__text">Page:</p>
              <select
                value={page}
                onChange={(event) =>
                  dispatchSearch({
                    type: ACTION_TYPE.SET_PAGE,
                    payload: { ...stateSearch, page: +event.target.value },
                  })
                }
              >
                {pages &&
                  pages.map((number) => <option key={number + Math.random()}>{number}</option>)}
              </select>
              <p className="pagination__text">{`from ${info.pages}`}</p>
            </div>
            <button className="pagination__button" onClick={getNextPage} disabled={!info.next}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
