import React, { Component } from 'react';
import { IApiCardProps } from 'types/types';
import './ApiCard.scss';

export class ApiCard extends Component<IApiCardProps> {
  constructor(props: IApiCardProps | Readonly<IApiCardProps>) {
    super(props);
  }

  onClickModal = () => {
    const { id, gender, name, species, origin, created, image } = this.props.character;
    const character = {
      id: id,
      name: name,
      species: species,
      gender: gender,
      origin: origin.name,
      image: image,
      created: created,
    };
    this.props.handleChangeModalActive(character);
  };

  render() {
    const { image, name } = this.props.character;

    return (
      <div className="api-card__container" onClick={this.onClickModal} data-testid="character-card">
        <img className="api-card__image" src={image} alt={name} />
        <h3 className="api-card__title">{name}</h3>
      </div>
    );
  }
}
