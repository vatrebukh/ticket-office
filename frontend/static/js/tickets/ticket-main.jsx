import React from 'react';
import { useState } from 'react';
import TicketSearchPage from './ticket-search';
import PassengerInfo from './passenger-info';
import TicketConfirmation from './ticket-confirmation';
import TicketPayment from './ticket-payment';

export default function TicketMainPage() {
    const [step, setStep] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [passengers, setPassengers] = useState([{"firstName": "", "lastName": "", "child": false}]);

    function handleSetStep(step) {
        if (step >= 1 && step <= 4) {
            setStep(step);
        }
    }
    
    if (step === 1) {
        return (
            <TicketSearchPage 
                pageSetter={handleSetStep} 
                tickets={tickets} 
                setTickets={setTickets} />
        );
    } else if (step === 2) {
        return (
            <PassengerInfo 
                pageSetter={handleSetStep} 
                passengers={passengers} 
                setPassengers={setPassengers} />
        );
    } else if (step === 3) {       
        return (
            <TicketConfirmation 
                pageSetter={handleSetStep} 
                passengers={passengers} 
                ticket={tickets.find(ticket => ticket.selected)} />
        );
    } else if (step === 4) {
        let totalPrice = passengers.map(p => p.child ? 0.5 : 1.0).reduce((a, b) => a + b, 0) * tickets.find(ticket => ticket.selected).price;
        return (
            <TicketPayment 
                pageSetter={handleSetStep}
                totalPrice={totalPrice} />
        );
    }
}