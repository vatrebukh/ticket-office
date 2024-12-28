import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TicketPayment from '../../../frontend/static/js/tickets/ticket-payment';
import '@testing-library/jest-dom';

describe('TicketPayment component', () => {
    it('should render payment methods', () => {
        render(<TicketPayment totalPrice={100} />);
        expect(screen.getByText('Select Payment Method')).toBeInTheDocument();
        expect(screen.getByLabelText('cash')).toBeInTheDocument();
        expect(screen.getByLabelText('card')).toBeInTheDocument();
    });

    it('should show cash payment section when cash method selected', () => {
        render(<TicketPayment totalPrice={100} />);
        fireEvent.click(screen.getByLabelText('cash'));
        expect(screen.getByText('Complete')).toBeInTheDocument();
    });

    it('should show card payment section when card method selected', () => {
        render(<TicketPayment totalPrice={100} />);
        fireEvent.click(screen.getByLabelText('card'));
        expect(screen.getByText('Card number')).toBeInTheDocument();
        expect(screen.getByText('Card holder')).toBeInTheDocument();
    });

    it('should validate card payment details', () => {
        render(<TicketPayment totalPrice={100} />);
        fireEvent.click(screen.getByLabelText('card'));
        
        fireEvent.change(screen.getByLabelText('Card number'), {target: {value: '123'}});
        fireEvent.change(screen.getByLabelText('Card holder'), {target: {value: 'Jo'}});
        fireEvent.click(screen.getByText('Complete payment'));

        expect(screen.getByText('Card number is not valid')).toBeInTheDocument();
        expect(screen.getByText('Min 3 characters required')).toBeInTheDocument();
    });

    it('should complete card payment with valid details', async () => {
        render(<TicketPayment totalPrice={100} />);
        fireEvent.click(screen.getByLabelText('card'));
        
        fireEvent.change(screen.getByLabelText('Card number'), {target: {value: '1234567890123456'}});
        fireEvent.change(screen.getByLabelText('Card holder'), {target: {value: 'John Doe'}});
        fireEvent.click(screen.getByText('Complete payment'));

        await waitFor(() => {
            expect(screen.getByText('Thank you')).toBeInTheDocument();
        });
    });

    it('should complete cash payment', async () => {
        render(<TicketPayment totalPrice={100} />);
        fireEvent.click(screen.getByLabelText('cash'));
        fireEvent.click(screen.getByText('Complete'));

        await waitFor(() => {
            expect(screen.getByText('Thank you')).toBeInTheDocument();
        });
    });
});
