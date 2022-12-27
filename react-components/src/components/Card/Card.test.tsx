import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

const renderCard = {
  id: '1',
  model: 'Asus VivoBook E410MA-BV1517',
  img: 'https://cdn21vek.by/img/galleries/7141/530/preview/vivobooke410mabv1517_asus_61c4415cbea7f.jpeg',
  screenDiagonal: '14.0',
  screenResolution: '1366x768 (HD)',
  screenRefreshRate: '60 Hz',
  processorModel: 'Intel Celeron N4020',
  RAM: '4 GB',
  SSDcapacity: '256 GB',
  VideoCardModel: 'Intel UHD Graphics 600',
};

describe('Card', () => {
  it('renders', () => {
    render(<Card notebook={renderCard} />);

    expect(screen.getByText(/Processor model/i)).toBeInTheDocument();
    expect(screen.getByText(/Video card model/i)).toBeInTheDocument();
    expect(screen.getByText(/Screen diagonal/i)).toBeInTheDocument();
    expect(screen.getByText(/Screen refresh rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Screen resolution/i)).toBeInTheDocument();
    expect(screen.getByText(/RAM/i)).toBeInTheDocument();
    expect(screen.getByText(/SSD capacity/i)).toBeInTheDocument();
  });

  it('click like', () => {
    render(<Card notebook={renderCard} />);

    const likeImg = screen.getByTestId('likeImg');
    const likeBtn = screen.getByTestId('likeBtn');

    expect(likeBtn).toHaveTextContent('0');

    fireEvent.click(likeImg);

    expect(likeImg).toHaveStyle('fill: ');
    expect(likeBtn).toHaveTextContent('1');
  });

  it('click favourite', () => {
    render(<Card notebook={renderCard} />);

    const favouriteImg = screen.getByTestId('favouriteImg');
    const cardContainer = screen.getByTestId('card-container');

    fireEvent.click(favouriteImg);

    expect(favouriteImg).toHaveStyle('fill: ');
    expect(cardContainer).toHaveClass('favourite');
  });
});
