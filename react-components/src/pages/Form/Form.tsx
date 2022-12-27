import { UserCard } from 'components/UserCard/UserCard';
import { UserForm } from 'components/UserForm/UserForm';
import { GlobalData } from 'context/context';
import React, { useContext } from 'react';
import { ACTION_TYPE } from 'types/enums';
import { IPersonCard } from 'types/types';
import './Form.scss';

export const Form = () => {
  const { stateForm, dispatchForm } = useContext(GlobalData);
  const { cards } = stateForm;

  const onSubmit = (card: IPersonCard) => {
    dispatchForm({
      type: ACTION_TYPE.SET_CARDS_FORM,
      payload: { ...stateForm, cards: [...cards, card] },
    });
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
