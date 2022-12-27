import React from 'react';
import { IStateInput } from 'types/types';
import './MyInput.scss';

export class MyInput extends React.Component<Record<string, never>, IStateInput> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  clear = () => {
    this.setState({
      inputValue: '',
    });
    localStorage.setItem('input', '');
  };

  componentDidMount() {
    this.setState({ inputValue: localStorage.getItem('input') ?? '' });
  }

  componentWillUnmount() {
    localStorage.setItem('input', this.state.inputValue);
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search__container">
        <input
          className={`${this.state.inputValue ? 'search__input_close' : 'search__input'}`}
          type="text"
          value={inputValue}
          onChange={this.handleChange}
          placeholder="Search..."
          autoFocus
          data-testid="input-search"
        />
        <div
          className={`${this.state.inputValue ? 'search__croos' : ''}`}
          onClick={this.clear}
          data-testid="search__croos"
        ></div>
      </div>
    );
  }
}
