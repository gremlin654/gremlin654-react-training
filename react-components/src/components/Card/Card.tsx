import React from 'react';
import { ICardProps, StateCardType } from 'types/types';
import './Card.scss';
import { ReactComponent as LikeImg } from '../../assets/img/like.svg';
import { ReactComponent as FavouriteImg } from '../../assets/img/favourite.svg';

export class Card extends React.Component<ICardProps, StateCardType> {
  constructor(props: ICardProps | Readonly<ICardProps>) {
    super(props);
    this.state = {
      like: 'false',
      likesNumber: 0,
      favourite: 'false',
    };
    this.clickLike = this.clickLike.bind(this);
    this.clickFavourite = this.clickFavourite.bind(this);
  }

  clickLike = () => {
    const like = this.state.like === 'false' ? 'true' : 'false';
    this.setState({ like: like });
    this.state.like === 'false'
      ? this.setState({ likesNumber: this.state.likesNumber + 1 })
      : this.setState({ likesNumber: this.state.likesNumber - 1 });
  };

  clickFavourite = () => {
    const favourite = this.state.favourite === 'false' ? 'true' : 'false';
    this.setState({ favourite: favourite });
  };

  render() {
    const {
      model,
      RAM,
      SSDcapacity,
      VideoCardModel,
      img,
      processorModel,
      screenDiagonal,
      screenRefreshRate,
      screenResolution,
    } = this.props.notebook;
    const { favourite, like, likesNumber } = this.state;

    return (
      <div
        className={`card__container ${favourite === 'true' ? 'favourite' : ''}`}
        data-testid="card-container"
      >
        <div className="card__content">
          <h3 className="card__text">{model}</h3>
          <img className="card__img" src={img} alt={model} />
          <h5 className="card__text">
            Processor model: <span>{processorModel}</span>
          </h5>
          <h5 className="card__text">
            Video card model: <span>{VideoCardModel}</span>
          </h5>
          <h5 className="card__text">
            Screen diagonal: <span>{screenDiagonal}</span>
          </h5>
          <h5 className="card__text">
            Screen refresh rate: <span>{screenRefreshRate}</span>
          </h5>
          <h5 className="card__text">
            Screen resolution: <span>{screenResolution}</span>
          </h5>
          <h5 className="card__text">
            RAM: <span>{RAM}</span>
          </h5>
          <h5 className="card__text">
            SSD capacity: <span>{SSDcapacity}</span>
          </h5>
        </div>
        <div className="card__likes-container">
          <div className="card__button" data-testid="likeBtn">
            <LikeImg
              className="card__like-img"
              width="20px"
              height="20px"
              fill={`${like === 'true' ? 'green' : ''}`}
              onClick={this.clickLike}
              data-testid="likeImg"
            />
            {likesNumber}
          </div>
          <div className="card__button">
            <FavouriteImg
              className="card__favourite-img"
              width="20px"
              height="20px"
              fill={`${favourite === 'true' ? 'red' : ''}`}
              onClick={this.clickFavourite}
              data-testid="favouriteImg"
            />
          </div>
        </div>
      </div>
    );
  }
}
