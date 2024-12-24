import React from 'react';
import { useState } from 'react';
import TicketSearchPage from './ticket-search';
import PassengerInfo from './passenger-info';
import TicketConfirmation from './ticket-confirmation';
import TicketPayment from './ticket-payment';
import { StepContext } from './StepContext';

export default function TicketMainPage() {
    const [step, setStep] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [passengers, setPassengers] = useState([{"firstName": "", "lastName": "", "child": false}]);

    function handleStep(step) {
        if (step < 1 || step > 4) {
            return;
        }
        if (step === 2) {
            let isTicketSelected = tickets.find(ticket => ticket.selected);
            setStep(isTicketSelected ? step : step - 1); //TODO: set error in context instead
        } else if (step === 3) {
            let errors = validatePassengers(passengers);
            setStep(errors ? step - 1 : step); //TODO: set error in context instead
        } else {
            setStep(step);
        }
    }
    
    if (step === 1) {
        return (
            <StepContext.Provider value={handleStep}>
                <TicketSearchPage 
                    tickets={tickets} 
                    setTickets={setTickets} />
            </StepContext.Provider >
        );
    } else if (step === 2) {
        return (
            <StepContext.Provider value={handleStep}>
                <PassengerInfo 
                    passengers={passengers} 
                    setPassengers={setPassengers} />
            </StepContext.Provider>
        );
    } else if (step === 3) {       
        return (
            <StepContext.Provider value={handleStep}>
                <TicketConfirmation 
                    passengers={passengers} 
                    ticket={tickets.find(ticket => ticket.selected)} />
            </StepContext.Provider>
        );
    } else if (step === 4) {
        let totalPrice = passengers.map(p => p.child ? 0.5 : 1.0).reduce((a, b) => a + b, 0) * tickets.find(ticket => ticket.selected).price;
        return (
            <StepContext.Provider value={handleStep}>
                <TicketPayment 
                    totalPrice={totalPrice} />
            </StepContext.Provider>
        );
    }
}

function validatePassengers(passengers) {
    let hasErrors = false;
    passengers.forEach(passenger => {
        if (!passenger.firstName || !passenger.lastName) {
            console.log('All passengers must have first and last name');
            hasErrors = true;
        }
    })
    return hasErrors;
}