import React, { useState, useEffect, useContext } from 'react';
import ProfileMenu from './profile-menu';
import ProfileInfo from './profile-info';
import { searchActiveTickets , searchPastTickets} from '../service/ticket-service';
import { SessionContext } from './SessionContext';
import LoginForm from '../login';

export default function UserProfile() {
    const sessionUser = useContext(SessionContext);
    if (!sessionUser) {
        return <LoginForm />;
    }

    const [menu, setMenu] = useState(profileMenu);
    let activeSection = menu.find(link => link.active)?.section;

    return (
        <div className="page">
            <ProfileMenu menu={menu} setMenu={setMenu} />
            {!activeSection || activeSection == 'info' ? <ProfileInfo /> : null}
            {activeSection == 'active' ? <ActiveTrips /> : null}
            {activeSection == 'past' ? <PastTrips /> : null}
        </div>
    );
}


function ActiveTrips() {
    const [tickets, setTickets] = useState([]);
    const sessionUser = useContext(SessionContext);

    useEffect(() => {
        async function fetchTickets() {
            const result = await searchActiveTickets(sessionUser.username);
            setTickets(result);
        }

        fetchTickets();
    }, []);

    return (
        <div className='profile-page'>
            <span className='section-title'>My Tickets</span>
            <Trips tickets={tickets} />
        </div>
    );
}

function PastTrips() {
    const [tickets, setTickets] = useState([]);
    const sessionUser = useContext(SessionContext);

    useEffect(() => {
        async function fetchTickets() {
            const result = await searchPastTickets(sessionUser.username);
            setTickets(result);
        }

        fetchTickets();
    }, []);

    return (
        <div className='profile-page'>
            <span className='section-title'>Past Trips</span>
            <Trips tickets={tickets} />
        </div>
    );
}

function Trips({tickets}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Passengers</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket, index) => (
                    <tr key={index}>
                        <td>{ticket.date}</td>
                        <td>{ticket.origin}</td>
                        <td>{ticket.destination}</td>
                        <td>
                            {ticket.passengers.map((passenger, index) => (
                                <React.Fragment key={index}>
                                    {passenger}
                                    <br />
                                </React.Fragment>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const profileMenu = [
    {name: 'My Info', active: false, section: 'info'},
    {name: 'Active Tickets', active: false, section: 'active'},
    {name: 'Past Trips', active: false, section: 'past'},
]