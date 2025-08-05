import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', ()=>{

    test('renders the maintenance notice' , ()=>{
        // render the component
        render(<Header />);
        expect(screen.getByText(/System maintenance tonight at 11:00 PM/i))
        .toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('hides the banner when close button is clicked', () => {
        // render the component
        render(<Header />);
        const closeButton = screen.getByRole('button');

        // Click the ✖ button
        fireEvent.click(closeButton);

        // Now the notice should not be in the document
        expect(screen.queryByText(/System maintenance tonight at 11:00 PM/i))
        .not.toBeInTheDocument();
    });
});