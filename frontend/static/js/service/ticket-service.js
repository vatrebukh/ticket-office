import { busRoutes, userTrips } from './data';

export function searchRoutes(origin, destination) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let res = busRoutes.filter(ticket => containsString(ticket.origin, origin) && containsString(ticket.destination, destination))
            resolve(res);
        }, 700);
    });
}

export function searchActiveTickets(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let ut = userTrips.filter(ticket => ticket.username === username && ticket.date >= new Date().toISOString())
                .map(ticket => {
                    let busRoute = busRoutes.find(br => br.id === ticket.routeId);
                    return {...ticket, ...busRoute};
                });
            resolve(ut);
        }, 600);
    });
}

export function searchPastTickets(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let ut = userTrips.filter(ticket => ticket.username === username && ticket.date < new Date().toISOString())
                .map(ticket => {
                    let busRoute = busRoutes.find(br => br.id === ticket.routeId);
                    return {...ticket, ...busRoute};
                });
            resolve(ut);
        }, 600);
    });
}


function containsString(string, substring) {
    return string.toLowerCase().includes(substring.toLowerCase());
}