import React from 'react';

export default function HomePage() {
    return (
        <div id="service-menu">
            <div className="welcome" >What are you looking for?</div>
            <Service link="/tickets/bus" name="Travel by bus" image="/static/img/bus.jpeg"/>
            <Service link="/tickets/train" name="Travel by train" image="/static/img/train.jpg"/>
        </div>
    );
}

function Service({link, name, image}) {
    return (
        <div className="service">
            <a href={link} data-link>
                <img src={image}></img>
                <span>{name}</span>
            </a>
        </div>
    );
}