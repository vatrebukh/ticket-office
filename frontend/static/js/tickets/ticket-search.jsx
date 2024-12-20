import React from 'react';
import { useState } from 'react';
import { Navigation, Steps} from './steps';
import { busTickets } from './data';

export default function TicketSearchPage() {
    return (
        <div className="page">
            <SearchMenu />
            <div className="main">
                <SearchResults />
                <Navigation />
                <Steps active="1" />
            </div>
        </div>
    );
}


function SearchMenu() {
    const today = new Date().toISOString().split('T')[0];
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(today);

    function onSubmit() {
        console.log(`Origin: ${origin}, Destination: ${destination}, Date: ${date}`);
        setOrigin('');
        setDestination('');
        setDate(today);
    }

    return (
        <div className='search-menu'>
            <span className='section-title'>Search menu</span>

            <label className='small'>Origin</label>
            <input type='text' value={origin} onChange={e => setOrigin(e.target.value)}></input>

            <label className='small'>Destination</label>
            <input type='text' value={destination} onChange={e => setDestination(e.target.value)}></input>

            <label className='small'>Departure date</label>
            <input type='date' value={date} onChange={e => setDate(e.target.value)}></input>   

            <button className='button' onClick={onSubmit}>Search</button>
        </div>
    );
}

function SearchResults() {
    const [tickets, setTickets] = useState(busTickets);

    function selectTicket(ticketId) {   
        setTickets(tickets.map(ticket => {   
            if (ticket.id === ticketId) {
                return {...ticket, selected: !ticket.selected}
            } else {
                return {...ticket, selected: false}
            }
        }));
    }

    return (
        <>
            <span className='section-title'>Available seats</span>
            <div className='tickets'>
                {tickets.map(ticket => <TicketDetails ticket={ticket} key={ticket.id} selectTicket={() => selectTicket(ticket.id)}/>)}
            </div>
        </>
    );
}

function TicketDetails({ticket, selectTicket}) {
    return (
        <div className={'ticket' + (ticket.selected ? ' selected' : '')} onClick={selectTicket}>
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

function calcTimeDifference(time1, time2) {
    let time1Parts = time1.split(':');
    let time2Parts = time2.split(':');
    let time1Minutes = parseInt(time1Parts[0]) * 60 + parseInt(time1Parts[1]);
    let time2Minutes = parseInt(time2Parts[0]) * 60 + parseInt(time2Parts[1]);
    let hours = Math.floor((time2Minutes - time1Minutes) / 60);
    let minutes = (time2Minutes - time1Minutes) % 60;
    return `${hours} hrs ${minutes.toString().padStart(2, '0')} min`;
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