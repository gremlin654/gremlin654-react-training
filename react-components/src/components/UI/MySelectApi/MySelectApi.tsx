import React from 'react';
import { IMySelectProps, SortTypeStatus } from 'types/types';

export const MySelectApi: React.FC<IMySelectProps> = ({ onChangeSelect }) => {
  return (
    <label className="api-page__select-container">
      <span className="api-page__select-text">Status:</span>
      <select className="api-page__select" onChange={onChangeSelect} data-testid="select-life">
        <option value={SortTypeStatus.alive}>Alive</option>
        <option value={SortTypeStatus.dead}>Dead</option>
        <option value={SortTypeStatus.unknown}>Unknown</option>
      </select>
    </label>
  );
};
