import React from 'react';
import { useState } from 'react';
import { Navigation, Steps} from './steps';

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
        <div className='search_menu'>
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
    return (
        <>
            <span className='section-title'>Available seats</span>
            <div className='tickets'>
                <div className='item'>ticket description 1</div>
                <div className='item'>ticket description 2</div>
                <div className='item'>ticket description 3</div>
                <div className='item'>ticket description 4</div>
            </div>
        </>
    );
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