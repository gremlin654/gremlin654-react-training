import UserCard from 'components/UserCard/UserCard';
import UserForm from 'components/UserForm/UserForm';
import React from 'react';
import { IFormPageState, IPersonCard } from 'types/types';
import './Form.scss';

export default class Form extends React.Component<Record<string, unknown>, IFormPageState> {
  constructor(props: Record<string, unknown> | Readonly<Record<string, unknown>>) {
    super(props);
    this.state = {
      cards: [] as IPersonCard[],
    };
  }
  onSubmit = (card: IPersonCard) => {
    this.setState(({ cards }) => {
      const prevCards = [...cards];
      return { cards: [...prevCards, card] };
    });
  };

  render() {
    return (
      <div className="form__container">
        <h1 className="form__title">Please fill out the user form</h1>
        <UserForm onSubmit={this.onSubmit} />
        <div className="form__cards">
          {this.state.cards.map((card: IPersonCard) => (
            <UserCard card={card} key={card.name + Math.random()} />
          ))}
        </div>
      </div>
    );
  }
}
