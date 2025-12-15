import React from 'react';

export default function HomePage() {
    return (
        <div id="service-menu">
            <div className="welcome" >What are you looking for?</div>
            <Service 
                link="/tickets/bus" 
                name="Travel by bus" 
                image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&auto=format"
                description="Comfortable and affordable bus travel connecting cities across the country"
            />
            <Service 
                link="/tickets/train" 
                name="Travel by train" 
                image="https://images.unsplash.com/photo-1527295110-5145f6b148d0?w=400&h=300&fit=crop&auto=format"
                description="Fast and scenic train journeys with modern amenities and spacious seating"
            />
        </div>
    );
}

function Service({link, name, image, description}) {
    return (
        <div className="service">
            <a href={link} data-link>
                <img src={image} alt={name}></img>
                <div className="service-content">
                    <span className="service-name">{name}</span>
                    <p className="service-description">{description}</p>
                </div>
            </a>
        </div>
    );
}