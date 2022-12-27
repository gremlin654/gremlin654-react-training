import React from 'react';
import { SortTypeSpecies } from 'types/enums';
import { IMySelectBySpeciesProps } from 'types/types';

export const MySelectBySpecies: React.FC<IMySelectBySpeciesProps> = ({
  onChangeSpecies,
  sortBySpecies,
}) => {
  return (
    <label className="api-page__select-container">
      <span className="api-page__select-text">Species:</span>
      <select
        className="api-page__select"
        value={sortBySpecies}
        onChange={onChangeSpecies}
        data-testid="select-life"
      >
        <option value={SortTypeSpecies.Empty}>Empty</option>
        <option value={SortTypeSpecies.Alien}>Alien</option>
        <option value={SortTypeSpecies.Animal}>Animal</option>
        <option value={SortTypeSpecies.Cronenberg}>Cronenberg</option>
        <option value={SortTypeSpecies.Human}>Human</option>
        <option value={SortTypeSpecies.Humanoid}>Humanoid</option>
        <option value={SortTypeSpecies.Poopybutthole}>Poopybutthole</option>
        <option value={SortTypeSpecies.unknown}>Unknown</option>
      </select>
    </label>
  );
};
