import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchCharactersData } from 'store/reducers/ActionCreators';
import { SearchSlice } from 'store/reducers/SearchSlice';
import './Pagination.scss';

export const Pagination = () => {
  const { info, page, searchValue, sortByStatus, sortByGender, sortBySpecies, pages } =
    useAppSelector((state) => state.SearchSlice);
  const dispatch = useAppDispatch();
  const { setPage } = SearchSlice.actions;

  useEffect(() => {
    dispatch(fetchCharactersData({ page, searchValue, sortByGender, sortBySpecies, sortByStatus }));
  }, [page]);

  const getNextPage = () => {
    dispatch(setPage(page + 1));
  };

  const getPrevPage = async () => {
    dispatch(setPage(page - 1));
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
              <select value={page} onChange={(event) => dispatch(setPage(+event.target.value))}>
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
