import { UserCard } from 'components/UserCard/UserCard';
import { UserForm } from 'components/UserForm/UserForm';
import React, { useState } from 'react';
import { IPersonCard } from 'types/types';
import './Form.scss';

export const Form = () => {
  const [cards, setCards] = useState<IPersonCard[]>([]);
  const onSubmit = (card: IPersonCard) => {
    setCards([...cards, card]);
  };

  return (
    <div className="form__container">
      <h1 className="form__title">Please fill out the user form</h1>
      <UserForm onSubmit={onSubmit} />
      <div className="form__cards">
        {cards.map((card: IPersonCard) => (
          <UserCard card={card} key={card.name + Math.random()} />
        ))}
      </div>
    </div>
  );
};
