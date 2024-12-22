import React from 'react';
import { Navigation } from './steps';

export default function TicketConfirmation({ticket, passengers, pageSetter}) {
    return (
        <div className="page">
            <TicketInfo 
                ticket={ticket} 
                passengers={passengers} />
            <div className="confirmation-page">
                <div className="passengers">
                    <span className="section-title">Passengers info</span>
                    {passengers.map((passenger, index) => < PassengerInfo key={index} passenger={passenger} />)}
                </div>
                <br />
                <br />
                <div>
                    <span>Total cost: </span>
                    <span className='strong' >{passengers.map(p => p.child ? 0.5 : 1.0).reduce((a, b) => a + b, 0) * ticket.price}</span>
                    <span className='strong' > USD</span>
                </div>
                <Navigation 
                    step={3} 
                    onPrev={pageSetter}
                    onNext={pageSetter} />
            </div>
        </div>
    );
}

function TicketInfo({ticket, passengers}) {
    return (
        <div className='search-menu'>
            <span className='section-title'>Route details</span>
            <span >Origin: 
                <span className="strong"> {ticket.origin}</span>
            </span>
            <br />
            <span>Departure time: {ticket.departureTime}</span>
            <br />
            <br />
            <span >Destination: 
                <span className="strong"> {ticket.destination}</span>
            </span>
            <br />
            <span>Arrival time: {ticket.arrivalTime}</span>
            <br />
            <br />
            <span >Passengers: 
                <span className="strong"> {passengers.length}</span>
            </span>
            <br />
            <br />
        </div>
    );
}

function PassengerInfo({passenger}) {
    return (
        <div className="passenger">
            <span className="strong">{passenger.firstName.toUpperCase()} {passenger.lastName.toUpperCase()} </span>
            <span>&nbsp;{passenger.child ? '(c)' : ''}</span>
        </div>
    );
}