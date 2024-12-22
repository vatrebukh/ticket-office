import React from 'react';
import { useState } from 'react';
import { LabeledInput2, Navigation} from './steps';
import { busTickets } from './data';

export default function TicketSearchPage({pageSetter, tickets, setTickets}) {
    function markSelectedTicket(ticketId) {   
        setTickets(tickets.map(ticket => {   
            if (ticket.id === ticketId) {
                return {...ticket, selected: !ticket.selected}
            } else {
                return {...ticket, selected: false}
            }
        }));
    }

    return (
        <div className="page">
            <SearchMenu searchHandler={setTickets} />
            <div className="search-page">
                <SearchResults 
                    tickets={tickets} 
                    handleClick={markSelectedTicket} />
                <Navigation 
                    step={1} 
                    onPrev={pageSetter}
                    onNext={pageSetter} />
            </div>
        </div>
    );
}


function SearchMenu({searchHandler}) {
    const today = new Date().toISOString().split('T')[0];
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(today);
    const [errOrigin, setErrOrigin] = useState('');
    const [errDestination, setErrDestination] = useState('');

    function doSearch() {
        let hasErrors = validateInputs(origin, destination, setErrOrigin, setErrDestination);
        if (hasErrors) {
            return;
        }

        searchHandler(
            busTickets.filter(ticket => containsString(ticket.origin, origin) && containsString(ticket.destination, destination))
        );
        clearFields();
    }

    function clearFields() {
        setOrigin('');
        setDestination('');
        setDate(today);
    }

    return (
        <div className='search-menu'>
            <span className='section-title'>Search menu</span>

            <LabeledInput2 label='Origin' value={origin} error={errOrigin} 
                           onChange={e => setOrigin(e.target.value)} />
            <LabeledInput2 label='Destination' value={destination} error={errDestination} 
                           onChange={e => setDestination(e.target.value)} />

            <label className='small'>Departure date</label>
            <input type='date' value={date} onChange={e => setDate(e.target.value)}></input>   

            <button className='button' onClick={doSearch}>Search</button>
        </div>
    );
}

function validateInputs(origin, destination, setErrOrigin, setErrDestination) {
    let hasErrors = false;
    if (origin.length < 3) {
        setErrOrigin('Min 3 characters');
        hasErrors = true;
    } else {
        setErrOrigin('');
    }
    if (destination.length < 3) {
        setErrDestination('Min 3 characters');
        hasErrors = true;
    } else {
        setErrDestination('');
    }
    return hasErrors;
}

function SearchResults({tickets, handleClick}) {
    return (
        <>
            <span className='section-title'>Available seats</span>
            <div className='tickets'>
                {tickets.map(ticket => <TicketDetails ticket={ticket} key={ticket.id} markSelected={() => handleClick(ticket.id)}/>)}
            </div>
        </>
    );
}

function TicketDetails({ticket, markSelected}) {
    return (
        <div className={'ticket' + (ticket.selected ? ' selected' : '')} onClick={markSelected}>
            <div className='route'>
                <span className='strong'>{ticket.origin}</span>
                <span> - </span>
                <span className='strong'>{ticket.destination}</span>
            </div>
            <div className='route small'>
                <span>Departure time: {ticket.departureTime}</span>
                <span>{calcTimeDifference(ticket.departureTime, ticket.arrivalTime)}</span>
                <span>Arrival time: {ticket.arrivalTime}</span>
            </div>
            <div className='price'>{ticket.price} USD</div>
        </div>
    );
}

export function calcTimeDifference(time1, time2) {
    let time1Parts = time1.split(':');
    let time2Parts = time2.split(':');
    let time1Minutes = parseInt(time1Parts[0]) * 60 + parseInt(time1Parts[1]);
    let time2Minutes = parseInt(time2Parts[0]) * 60 + parseInt(time2Parts[1]);
    let hours = Math.floor((time2Minutes - time1Minutes) / 60);
    let minutes = (time2Minutes - time1Minutes) % 60;
    return `${hours} hrs ${minutes.toString().padStart(2, '0')} min`;
}

function containsString(string, substring) {
    return string.toLowerCase().includes(substring.toLowerCase());
}


/*
search menu
 title
 origin (input with predefined search)
 destination (input with predefined search)
 date (calendar)

search results
 title
 result item (component)
  name (text)
  description (text)
  departure from origin (date)
  arrival to destination (date)
  journey time (hh:mm)
  free seats (number)
  price
 click on row will mark it as selected

-- common component to all pages 
navigation
 prev page (button) / cancel button since no prev page?
 next page (button) / click on prise will redirect to next page? or it will only select row from result?


-- common component to all pages 
steps
 image or css?

*/