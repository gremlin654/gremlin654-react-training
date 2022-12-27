import React from 'react';
import { IUserCard } from 'types/types';
import './UserCard.scss';

export const UserCard: React.FC<IUserCard> = ({ card }) => {
  const { name, surname, country, date, gender, img } = card;
  return (
    <div className="card__container">
      <div className="card__content">
        <img className="card__img" src={img as string} alt={name} data-testid="user-card-image" />
        <h5 className="card__text">
          Name: <span>{name}</span>
        </h5>
        <h5 className="card__text">
          Surname: <span>{surname}</span>
        </h5>
        <h5 className="card__text">
          Country: <span>{country}</span>
        </h5>
        <h5 className="card__text">
          Date of birth: <span>{date}</span>
        </h5>
        <h5 className="card__text">
          Gender: <span>{`${gender ? 'Female' : 'Male'}`}</span>
        </h5>
      </div>
    </div>
  );
};
