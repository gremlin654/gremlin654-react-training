import { MyInput } from 'components/Input/MyInput';
import React from 'react';
import './Main.scss';
import { IMainProps } from '../../types/types';
import { Card } from 'components/Card/Card';

export class Main extends React.Component<IMainProps> {
  constructor(props: IMainProps | Readonly<IMainProps>) {
    super(props);
  }

  render() {
    return (
      <div className="main__container">
        <MyInput />
        <div className="cards__container" data-testid="cards-container">
          {this.props.notebooks.map((card) => (
            <Card key={card.id} notebook={card} />
          ))}
        </div>
      </div>
    );
  }
}
