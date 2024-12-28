import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../frontend/static/js/home';

describe('HomePage', () => {
  it('renders welcome message', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('What are you looking for?')).toBeInTheDocument();
  });

  it('renders service links', () => {
    const { getAllByRole } = render(<HomePage />);
    const links = getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/tickets/bus');
    expect(links[1]).toHaveAttribute('href', '/tickets/train');
  });

  it('renders service images', () => {
    const { getAllByRole } = render(<HomePage />);
    const images = getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/img/bus.jpeg');
    expect(images[1]).toHaveAttribute('src', '/img/train.jpg');
  });
});