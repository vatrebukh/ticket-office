import { Router } from "./router.js";

const routes = [
    { path: '/', view: () => viewHome() },
    { path: '/home', view: () => viewHome() },
    { path: '/seats', view: () => viewSeats() },
    { path: '/payment', view: () => viewPayment() },
];

const router = new Router(routes);

export const navigate = () => {
    let { route, params } = router.findRoute(location.pathname);
    route.view(params);
};

window.addEventListener("popstate", navigate);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            navigate();
        }
    });

    navigate();
});


async function viewHome() {
    document.getElementById('root').innerHTML = 'Select destination';
}

async function viewSeats() {
    document.getElementById('root').innerHTML = 'Select seats';
}

async function viewPayment() {
    document.getElementById('root').innerHTML = 'Ready to pay';
}

