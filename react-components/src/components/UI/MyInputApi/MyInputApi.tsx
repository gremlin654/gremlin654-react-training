import React from 'react';
import { IMyInputProps } from 'types/types';
import './MyInputApi.scss';

export const MyInputApi: React.FC<IMyInputProps> = ({
  clear,
  handleChange,
  onKeyPressHandler,
  searchValue,
}) => {
  return (
    <div className="search__container">
      <input
        className={`${searchValue ? 'search__input_close' : 'search__input'}`}
        type="text"
        value={searchValue}
        placeholder="Search characters..."
        onChange={handleChange}
        onKeyDown={(event) => onKeyPressHandler(event)}
        autoFocus
        data-testid="input-search"
      />
      <div
        className={`${searchValue ? 'search__croos' : ''}`}
        onClick={clear}
        data-testid="search-croos"
      ></div>
    </div>
  );
};
