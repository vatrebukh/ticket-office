import { Router } from "../../frontend/static/js/router";

const routes = [
    { path: '/', view: () => viewHome() },
    { path: '/home', view: () => viewTeams() },
    { path: '/home/new', view: () => createTeam() },
    { path: '/home/:id', view: (args) => viewTeams(args) }
];

describe('findRoute', () => {
    const router = new Router(routes);
    test('should return root for not matched url', () => {
        expect(router.findRoute('/test').route.path).toBe('/');
    });
    test('should return matched route', () => {
        expect(router.findRoute('/home').route.path).toBe('/home');
    });
    test('should return matched route ignoring trailing slash', () => {
        expect(router.findRoute('/home/').route.path).toBe('/home');
    });
    test('should return matched route by two path params', () => {
        expect(router.findRoute('/home/new').route.path).toBe('/home/new');
    });
    test('should return matched route with placeholder', () => {
        expect(router.findRoute('/home/1').route.path).toBe('/home/:id');
    });
})