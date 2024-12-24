import React from 'react';
import { useState } from 'react';
import TicketSearchPage from './ticket-search';
import PassengerInfo from './passenger-info';
import TicketConfirmation from './ticket-confirmation';
import TicketPayment from './ticket-payment';
import { StepContext } from './StepContext';

export default function TicketMainPage() {
    const [step, setStep] = useState(1);
    const [tickets, setTickets] = useState(null);
    const [passengers, setPassengers] = useState([{"firstName": "", "lastName": "", "child": false}]);
    const [checkTicketSelected, setCheckTicketSelected] = useState(false);

    function handleStep(step) {
        if (step < 1 || step > 4) {
            return;
        }
        if (step === 2) {
            let selectedTicket = tickets && tickets.find(ticket => ticket.selected);
            setCheckTicketSelected(!selectedTicket);
            setStep(selectedTicket ? step : step - 1);
        } else if (step === 3) {
            let hasErrors = validatePassengers(passengers, setPassengers);
            setStep(hasErrors ? step - 1 : step);
        } else {
            setStep(step);
        }
    }
    
    if (step === 1) {
        return (
            <StepContext.Provider value={handleStep}>
                <TicketSearchPage 
                    tickets={tickets} 
                    setTickets={setTickets}
                    checkTicketSelected={checkTicketSelected}
                    setCheckTicketSelected={setCheckTicketSelected} />
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

function validatePassengers(passengers, setPassengers) {
    let hasErrors = false;
    if (passengers.length === 0) {
        return true;
    }
    let validated = passengers.map(passenger => {
        let [fne, lne] = '';
        if (!passenger.firstName) {
            fne = 'First name is required';
            hasErrors = true;
        }
        if (!passenger.lastName) {
            lne = 'Last name is required';
            hasErrors = true;
        }
        return {...passenger, firstNameError: fne, lastNameError: lne}
    });
    setPassengers(validated);
    return hasErrors;
}