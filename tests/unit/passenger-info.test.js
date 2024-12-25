import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PassengerInfo from '../../frontend/static/js/tickets/passenger-info';


describe('PassengerInfo Component', () => {
    let passengers, setPassengers;

    beforeEach(() => {
        passengers = [
            { firstName: 'John', lastName: 'Doe', child: false },
            { firstName: 'Jane', lastName: 'Doe', child: true }
        ];
        setPassengers = jest.fn();
    });

    test('renders correctly', () => {
        render(<PassengerInfo passengers={passengers} setPassengers={setPassengers} />);
        expect(screen.getByText('Passengers info')).toBeInTheDocument();
    });

    test('renders the correct number of passengers', () => {
        render(<PassengerInfo passengers={passengers} setPassengers={setPassengers} />);
        expect(screen.getAllByText('First Name').length).toBe(2);
        expect(screen.getAllByText('Last Name').length).toBe(2);
    });

    test('adds a new passenger', () => {
        render(<PassengerInfo passengers={passengers} setPassengers={setPassengers} />);
        fireEvent.click(screen.getByText('Add passenger'));
        expect(setPassengers).toHaveBeenCalledWith([
            ...passengers,
            { firstName: '', lastName: '', child: false }
        ]);
    });

    test('removes a passenger', () => {
        render(<PassengerInfo passengers={passengers} setPassengers={setPassengers} />);
        fireEvent.click(screen.getAllByRole('img')[0]);
        expect(setPassengers).toHaveBeenCalledWith([passengers[1]]);
    });

    test('updates passenger information', () => {
        render(<PassengerInfo passengers={passengers} setPassengers={setPassengers} />);
        fireEvent.change(screen.getByDisplayValue('John'), { target: { value: 'Johnny', name: 'firstName' } });
        expect(setPassengers).toHaveBeenCalledWith([
            { ...passengers[0], firstName: 'Johnny' },
            passengers[1]
        ]);
    });
});