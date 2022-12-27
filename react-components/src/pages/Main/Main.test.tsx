import { render, screen } from '@testing-library/react';
import React from 'react';
import { Main } from './Main';
import { notebooks } from '../../data/notebooks';
import { Card } from 'components/Card/Card';

describe('Main component', () => {
  it('renders', () => {
    render(<Main notebooks={notebooks} />);

    expect(screen.getByTestId('cards-container')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(notebooks.map((card) => <Card key={card.id} notebook={card} />));
  });

  it('Main snaphot', () => {
    const main = render(<Main notebooks={notebooks} />);

    expect(main).toMatchSnapshot();
  });
});
