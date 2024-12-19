import React from 'react';

export default function HomePage() {
    return (
        <div id="service-menu">
            <div className="welcome" >What are you looking for?</div>
            <Service link="/tickets" name = "Buy tickets"/>
            <Service link="/tickets" name = "Buy tickets"/>
        </div>
    );
}

function Service({link, name}) {
    return (
        <div className="service">
            <a href={link} data-link>{name}</a>
        </div>
    );
}