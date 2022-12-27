import React, { Component } from 'react';
import { IApiCardModalProps } from 'types/types';
import './ApiCardModal.scss';

export class ApiCardModal extends Component<IApiCardModalProps> {
  constructor(props: IApiCardModalProps | Readonly<IApiCardModalProps>) {
    super(props);
  }

  render() {
    const { created, id, gender, image, name, origin, species } = this.props.modalData;

    return (
      <div
        className="wrapper__modale"
        onClick={this.props.handleChangeModalClose}
        data-testid="card-modal"
      >
        <div className="modale__window">
          <button className="modale__window-close-btn" data-testid="close-card-modal">
            ╳
          </button>
          <div className="modale__window-body">
            <div className="modale__window-container">
              <div className="window__container-img" onClick={(event) => event.stopPropagation()}>
                <img src={image} alt={`${id}`} data-testid="modal-image" />
              </div>
              <div
                className="window__contairer-body"
                onClick={(event) => event.stopPropagation()}
                data-testid="modal-window"
              >
                <div className="window__container-about">
                  <ul className="about__contaner">
                    <li className="about__container-text">
                      <span>Name:</span> {name}
                    </li>
                    <li className="about__container-text">
                      <span>Species:</span> {species}
                    </li>
                    <li className="about__container-text">
                      <span>Origin:</span> {origin}
                    </li>
                    <li className="about__container-text">
                      <span>Gender:</span> {gender}
                    </li>
                    <li className="about__container-text">
                      <span>Created:</span> {created}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
