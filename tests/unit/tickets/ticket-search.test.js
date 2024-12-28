import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TicketSearchPage from '../../../frontend/static/js/tickets/ticket-search';
import { searchRoutes } from '../../../frontend/static/js/service/ticket-service';
import '@testing-library/jest-dom';

// Mock the ticket service
jest.mock('../../../frontend/static/js/service/ticket-service');

describe('TicketSearch', () => {
    const mockTickets = [
        {id: 1, origin: 'New York', destination: 'London', departureTime: '10:00', arrivalTime: '22:00', price: 500, selected: false},
        {id: 2, origin: 'London', destination: 'Paris', departureTime: '14:00', arrivalTime: '15:30', price: 200, selected: false}
    ];
    
    test('validates input fields', async () => {
        render(<TicketSearchPage tickets={[]} setTickets={() => {}} checkTicketSelected={false} setCheckTicketSelected={() => {}} />);
        
        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        await waitFor(() => {
            const errorMessages = screen.getAllByText('Min 3 characters');
            expect(errorMessages).toHaveLength(2);
            errorMessages.forEach(message => {
                expect(message).toBeInTheDocument();
            });
        });
    });

    test('performs search with valid inputs', async () => {
        searchRoutes.mockResolvedValue(mockTickets);
        
        const setTickets = jest.fn();
        render(<TicketSearchPage 
            tickets={[]} 
            setTickets={setTickets} 
            checkTicketSelected={false} 
            setCheckTicketSelected={() => {}} 
        />);

        fireEvent.change(screen.getByLabelText('Origin'), {target: {value: 'New York'}});
        fireEvent.change(screen.getByLabelText('Destination'), {target: {value: 'London'}});
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => {
            expect(searchRoutes).toHaveBeenCalledWith('New York', 'London');
            expect(setTickets).toHaveBeenCalledWith(mockTickets);
        });
    });
});

describe('TicketResults', () => {
    const mockTickets = [
        {id: 1, origin: 'New York', destination: 'London', departureTime: '10:00', arrivalTime: '22:00', price: 500, selected: false},
        {id: 2, origin: 'London', destination: 'Paris', departureTime: '14:00', arrivalTime: '15:30', price: 200, selected: false}
    ];

    beforeEach(() => {
        searchRoutes.mockClear();
    });

    test('renders search form and results', () => {
        render(<TicketSearchPage tickets={[]} setTickets={() => {}} checkTicketSelected={false} setCheckTicketSelected={() => {}} />);
        
        expect(screen.getByText('Search menu')).toBeInTheDocument();
        expect(screen.getByText('Available seats')).toBeInTheDocument();
        expect(screen.getByLabelText('Origin')).toBeInTheDocument();
        expect(screen.getByLabelText('Destination')).toBeInTheDocument();
    });

    test('displays ticket details correctly', () => {
        render(<TicketSearchPage 
            tickets={mockTickets} 
            setTickets={() => {}} 
            checkTicketSelected={false} 
            setCheckTicketSelected={() => {}} 
        />);

        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getAllByText('London')).toHaveLength(2);
        expect(screen.getByText('500 USD')).toBeInTheDocument();
        expect(screen.getByText('12 hrs 00 min')).toBeInTheDocument();
    });

    test('handles ticket selection', () => {
        const setTickets = jest.fn();
        render(<TicketSearchPage 
            tickets={mockTickets} 
            setTickets={setTickets} 
            checkTicketSelected={false} 
            setCheckTicketSelected={() => {}} 
        />);

        fireEvent.click(screen.getByText('New York'));

        expect(setTickets).toHaveBeenCalled();
        const updatedTickets = setTickets.mock.calls[0][0];
        expect(updatedTickets[0].selected).toBe(true);
        expect(updatedTickets[1].selected).toBe(false);
    });

    test('calcTimeDifference calculates correct duration', () => {
        render(<TicketSearchPage 
            tickets={mockTickets} 
            setTickets={() => {}} 
            checkTicketSelected={false} 
            setCheckTicketSelected={() => {}} 
        />);

        expect(screen.getByText('12 hrs 00 min')).toBeInTheDocument();
        expect(screen.getByText('1 hrs 30 min')).toBeInTheDocument();
    });
});


