import React from 'react';
import { IApiCardProps } from 'types/types';
import './ApiCard.scss';

export const ApiCard: React.FC<IApiCardProps> = ({ handleChangeModalActive, character }) => {
  const { id, gender, name, species, origin, created, image } = character;

  const onClickModal = () => {
    const character = {
      id: id,
      name: name,
      species: species,
      gender: gender,
      origin: origin.name,
      image: image,
      created: created,
    };
    handleChangeModalActive(character);
  };

  return (
    <div className="api-card__container" onClick={onClickModal} data-testid="character-card">
      <img className="api-card__image" src={image} alt={name} />
      <h3 className="api-card__title">{name}</h3>
    </div>
  );
};
