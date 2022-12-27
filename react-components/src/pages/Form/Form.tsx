import { UserCard } from 'components/UserCard/UserCard';
import { UserForm } from 'components/UserForm/UserForm';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FormSlice } from 'store/reducers/FormSlice';
import { IPersonCard } from 'types/types';
import './Form.scss';

export const Form = () => {
  const { cards } = useAppSelector((state) => state.FormSlice);
  const { setCardForm } = FormSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit = (card: IPersonCard) => {
    dispatch(setCardForm(card));
  };

  return (
    <div className="form__container">
      <h1 className="form__title">Please fill out the user form</h1>
      <UserForm onSubmit={onSubmit} />
      <div className="form__cards">
        {cards &&
          cards.map((card: IPersonCard) => (
            <UserCard card={card} key={card.name + Math.random()} />
          ))}
      </div>
    </div>
  );
};
