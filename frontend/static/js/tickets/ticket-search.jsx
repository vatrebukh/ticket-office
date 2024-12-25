import React from 'react';
import { useState } from 'react';
import { LabeledInput2, Navigation} from './steps';
import { busTickets } from './data';

export default function TicketSearchPage({tickets, setTickets, checkTicketSelected, setCheckTicketSelected}) {
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
            <SearchMenu searchHandler={setTickets} setCheckTicketSelected={setCheckTicketSelected} />
            <div className="search-page">
                <SearchResults 
                    tickets={tickets} 
                    handleClick={markSelectedTicket}
                    checkTicketSelected={checkTicketSelected} />
                <Navigation step={1} />
            </div>
        </div>
    );
}


function SearchMenu({searchHandler, setCheckTicketSelected}) {
    const today = new Date().toISOString().split('T')[0];
    const emptySearchData = {"origin": "", "destination": "", "date": today, "originErr": "", "destinationErr": ""}
    const [searchData, setSearchData] = useState(emptySearchData);
    const [searchEnabled, setSearchEnabled] = useState(true);

    async function doSearch(e) {
        e.preventDefault();
        setSearchEnabled(false);
        let hasErrors = validateInputs(searchData, setSearchData);
        if (hasErrors) {
            setSearchEnabled(true);
            return;
        }

        try {
            let tickets = await searchTickets(searchData.origin, searchData.destination);
            searchHandler(tickets);
            setSearchEnabled(true);
        } catch (error) {
            console.log(error);
            setSearchEnabled(true);
        }
        setCheckTicketSelected(false);
        setSearchData(emptySearchData);
    }

    const handleSearchInput = ({ name, value }) => {
        setSearchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='search-menu'>
            <span className='section-title'>Search menu</span>

            <LabeledInput2 label='Origin' value={searchData.origin} error={searchData.originErr} 
                           onChange={e => handleSearchInput(e.target)} />
            <LabeledInput2 label='Destination' value={searchData.destination} error={searchData.destinationErr} 
                           onChange={e => handleSearchInput(e.target)} />

            <label className='small'>Departure date</label>
            <input type='date' name = 'date' value={searchData.date} onChange={e => handleSearchInput(e.target)}></input>   

            <button className='button' disabled={!searchEnabled} onClick={e => doSearch(e)}>Search</button>
        </div>
    );
}

function validateInputs(searchData, setSearchData) {
    setSearchData({...searchData, 
        originErr: searchData.origin.length < 3 ? 'Min 3 characters' : '',
        destinationErr: searchData.destination.length < 3 ? 'Min 3 characters' : ''
    });
    return searchData.origin.length < 3 || searchData.destination.length < 3;
}

function searchTickets(origin, destination) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let res = busTickets.filter(ticket => containsString(ticket.origin, origin) && containsString(ticket.destination, destination))
            resolve(res);
        }, 1000);
    });
}

function SearchResults({tickets, handleClick, checkTicketSelected}) {
    return (
        <>
            <span className='section-title'>Available seats</span>
            { tickets && tickets.length === 0 ? <div className='notification-red'>No tickets found</div> : '' }
            { checkTicketSelected ? <div className='notification-red'>Select ticket</div> : ''}
            <div className='tickets'>
                {tickets && tickets.map(ticket => <TicketDetails ticket={ticket} key={ticket.id} markSelected={() => handleClick(ticket.id)}/>)}
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
