import React from 'react';
import { SortTypeGender } from 'types/enums';
import { IMySelectByGenderProps } from 'types/types';

export const MySelectByGender: React.FC<IMySelectByGenderProps> = ({
  onChangeGender,
  sortByGender,
}) => {
  return (
    <label className="api-page__select-container">
      <span className="api-page__select-text">Gender:</span>
      <select
        className="api-page__select"
        value={sortByGender}
        onChange={onChangeGender}
        data-testid="select-life"
      >
        <option value={SortTypeGender.empty}>Empty</option>
        <option value={SortTypeGender.unknown}>Unknown</option>
        <option value={SortTypeGender.male}>Male</option>
        <option value={SortTypeGender.female}>Female</option>
        <option value={SortTypeGender.genderless}>Genderless</option>
      </select>
    </label>
  );
};
