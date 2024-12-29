export const busRoutes = [
    {"id": 1, "origin": "Seattle", "destination": "Portland", "departureTime": "08:00", "arrivalTime": "11:00", "price": 15},
    {"id": 2, "origin": "Seattle", "destination": "Portland", "departureTime": "10:00", "arrivalTime": "12:50", "price": 12},
    {"id": 3, "origin": "Seattle", "destination": "Portland", "departureTime": "14:00", "arrivalTime": "16:50", "price": 12},
    {"id": 4, "origin": "Seattle", "destination": "Portland", "departureTime": "18:00", "arrivalTime": "21:10", "price": 16},
    {"id": 5, "origin": "Seattle", "destination": "San Francisco", "departureTime": "06:00", "arrivalTime": "17:00", "price": 55},
    {"id": 6, "origin": "Seattle", "destination": "San Francisco", "departureTime": "08:00", "arrivalTime": "18:30", "price": 60},
    {"id": 7, "origin": "Seattle", "destination": "San Francisco", "departureTime": "10:00", "arrivalTime": "20:00", "price": 60},
    {"id": 8, "origin": "Seattle", "destination": "San Francisco", "departureTime": "12:00", "arrivalTime": "22:30", "price": 70},
]


export const userTrips = [
    {"id": 101, "username": "johnny", "routeId": 7, "date": "2024-12-08", "passengers": ["John"]},
    {"id": 102, "username": "johnny", "routeId": 1, "date": "2024-12-14", "passengers": ["John"]},
    {"id": 103, "username": "johnny", "routeId": 1, "date": "2024-12-20", "passengers": ["John", "Jane"]},
    {"id": 104, "username": "johnny", "routeId": 4, "date": "2024-12-30", "passengers": ["John"]},
]

export const users = [
    {"username": "johnny", "password": "bravo", "fullName": "John River", "city": "Seattle", "role": "user", "miles": 1988},
    {"username": "jane", "password": "jane", "fullName": "Jane Doe", "city": "Portland", "role": "user", "miles": 0},
]