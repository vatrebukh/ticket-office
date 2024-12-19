import React from 'react';
import Steps from './steps';

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
    return (
        <div className='search_menu'>
            <span>Search menu</span>
            <br></br>
            <br></br>
            <label>Origin</label>
            <input type='text'></input>
            <br></br>
            <label>Destination</label>
            <input type='text'></input>
            <br></br>
            <label>Departure date</label>
            <input type='date'></input>
            <br></br>
            <button>Search</button>
        </div>
    );
}

function SearchResults() {
    return (
        <>
            <span>Available seats</span>
            <br></br>
            <div className='tickets'>
                <div className='item'>ticket description 1</div>
                <div className='item'>ticket description 2</div>
                <div className='item'>ticket description 3</div>
                <div className='item'>ticket description 4</div>
            </div>
        </>
    );
}

function Navigation() {
    return (
        <div className='controls'>
            <button>prev</button>
            <button>next</button>
        </div>
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