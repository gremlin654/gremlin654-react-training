import React from 'react';
import { IApiCardProps } from 'types/types';
import './ApiCard.scss';

export const ApiCard: React.FC<IApiCardProps> = ({ character, handleChangeCharacter }) => {
  const { id, gender, name, species, origin, created, image } = character;

  const onClickCharacter = () => {
    const character = {
      id: id,
      name: name,
      species: species,
      gender: gender,
      origin: origin.name,
      image: image,
      created: created,
    };
    handleChangeCharacter(character);
  };

  return (
    <div className="api-card__container" data-testid="character-card" onClick={onClickCharacter}>
      <img className="api-card__image" src={image} alt={name} />
      <h3 className="api-card__title">{name}</h3>
    </div>
  );
};
