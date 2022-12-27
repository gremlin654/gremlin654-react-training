import React from 'react';
import './AboutUs.scss';

export const AboutUs = () => {
  return (
    <div className="about__container">
      <div className="about__title-container">
        <h1 className="about__title">Hey there! I am Andrey!</h1>
        <div className="about__title-img">
          <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" />
        </div>
      </div>
      <div className="about__img">
        <img src="https://media.giphy.com/media/dWesBcTLavkZuG35MI/giphy.gif" />
      </div>
    </div>
  );
};
