import { GlobalData } from 'context/context';
import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import './CharacterPage.scss';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { stateSearch } = useContext(GlobalData);
  const { id, image, created, gender, name, origin, species } = stateSearch.characterData;

  if (id === 0) {
    return <Navigate to="/" replace />;
  }

  const goBack = () => navigate(-1);

  return (
    <div className="character-page__container">
      <div className="character-page__button-container">
        <button className="character-page__button" onClick={goBack}>
          Back
        </button>
      </div>
      <h2 className="character-page__title">{name}</h2>
      <h3 className="character-page__text">
        Origin: <span>{origin}</span>
      </h3>
      <h3 className="character-page__text">
        Gender: <span>{gender}</span>
      </h3>
      <h3 className="character-page__text">
        Species: <span>{species}</span>
      </h3>
      <h3 className="character-page__text">
        Created: <span>{created}</span>
      </h3>
      <img className="character-page__img" src={image} alt={name} />
    </div>
  );
};
