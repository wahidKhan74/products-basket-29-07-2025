// src/components/__tests__/Footer.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
    
  test('renders the footer notice and close button', () => {
    render(<Footer />);

    // Verify footer message
    expect(
      screen.getByText(/follow us on twitter/i)
    ).toBeInTheDocument();

    // Verify close button
    const closeButton = screen.getByRole('button', { name: /close footer/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('hides the footer when close button is clicked', () => {
    render(<Footer />);
    const closeButton = screen.getByRole('button', { name: /close footer/i });

    fireEvent.click(closeButton);

    expect(
      screen.queryByText(/follow us on twitter/i)
    ).not.toBeInTheDocument();
  });
});
