import React from 'react';
import { SortTypeStatus } from 'types/enums';
import { IMySelectByStatusProps } from 'types/types';

export const MySelectByStatus: React.FC<IMySelectByStatusProps> = ({
  onChangeStatus,
  sortByStatus,
}) => {
  return (
    <label className="api-page__select-container">
      <span className="api-page__select-text">Status:</span>
      <select
        className="api-page__select"
        value={sortByStatus}
        onChange={onChangeStatus}
        data-testid="select-life"
      >
        <option value={SortTypeStatus.empty}>Empty</option>
        <option value={SortTypeStatus.alive}>Alive</option>
        <option value={SortTypeStatus.dead}>Dead</option>
        <option value={SortTypeStatus.unknown}>Unknown</option>
      </select>
    </label>
  );
};
