import React from 'react';
import Steps from './steps';

export default function TicketSearchPage() {
    return (
        <>
            <Steps active="1" />
            <Steps active="2" />
            <Steps active="3" />
            <Steps active="4" />
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