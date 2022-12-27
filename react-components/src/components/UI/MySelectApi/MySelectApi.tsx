import React, { Component } from 'react';
import { SortTypeStatus } from 'types/types';

export interface IMySelectProps {
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export class MySelectApi extends Component<IMySelectProps> {
  constructor(props: IMySelectProps | Readonly<IMySelectProps>) {
    super(props);
  }
  render() {
    return (
      <label className="api-page__select-container">
        <span className="api-page__select-text">Status:</span>
        <select
          className="api-page__select"
          onChange={this.props.onChangeSelect}
          data-testid="select-life"
        >
          <option value={SortTypeStatus.alive}>Alive</option>
          <option value={SortTypeStatus.dead}>Dead</option>
          <option value={SortTypeStatus.unknown}>Unknown</option>
        </select>
      </label>
    );
  }
}
