import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TicketConfirmation from '../../../frontend/static/js/tickets/ticket-confirmation';
import '@testing-library/jest-dom';


describe('TicketConfirmation component', () => {
    const mockTicket = {
        origin: 'New York',
        destination: 'Boston',
        departureTime: '09:00',
        arrivalTime: '11:00', 
        price: 100
    };

    const mockPassengers = [
        {firstName: 'John', lastName: 'Doe', child: false},
        {firstName: 'Jane', lastName: 'Doe', child: true}
    ];

    test('renders ticket information correctly', () => {
        render(<TicketConfirmation ticket={mockTicket} passengers={mockPassengers} />);
        
        expect(screen.getByText(/Origin:/i)).toBeInTheDocument();
        expect(screen.getByText(/New York/i)).toBeInTheDocument();
        expect(screen.getByText(/Boston/i)).toBeInTheDocument();
        expect(screen.getByText(/09:00/i)).toBeInTheDocument();
        expect(screen.getByText(/11:00/i)).toBeInTheDocument();
    });

    test('renders passenger information correctly', () => {
        render(<TicketConfirmation ticket={mockTicket} passengers={mockPassengers} />);

        expect(screen.getByText(/JOHN DOE/i)).toBeInTheDocument();
        expect(screen.getByText(/JANE DOE/i)).toBeInTheDocument();
        expect(screen.getByText(/\(c\)/i)).toBeInTheDocument();
    });

    test('calculates total cost correctly with child discount', () => {
        render(<TicketConfirmation ticket={mockTicket} passengers={mockPassengers} />);
        expect(screen.getByText('150')).toBeInTheDocument();
        expect(screen.getByText('USD')).toBeInTheDocument();
    });
});
