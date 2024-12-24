import React from 'react';
import { Navigation, LabeledInput1, LabeledBox} from './steps';

export default function PassengerInfo({passengers, setPassengers}) {

    return (
        <div className="page">
            <div className='passengers-page'>
                <Passengers 
                    passengers={passengers} 
                    setPassengers={setPassengers} />
                <Navigation step={2}  />
            </div>
        </div>
    );
}

function Passengers({passengers, setPassengers}) {

    function setFirstName(index, firstName) {
        setPassengers(passengers.map((passenger, i) => {
            return i === index 
                ? {...passenger, firstName: firstName}
                : passenger;
        }));
    }

    function setLastName(index, lastName) {
        setPassengers(passengers.map((passenger, i) => {
            return i === index
                ? {...passenger, lastName: lastName}
                : passenger;
        }));
    }

    function setChild(index, child) {
        setPassengers(passengers.map((passenger, i) => {
            return i === index 
                ? {...passenger, child: child} 
                : passenger;
        }));
    }

    return (
        <>
            <span className='section-title'>Passengers info</span>
            <div className='passengers'>
                {passengers.map(
                    (passenger, index) => <Passenger passenger={passenger} key={index} 
                                                     handleFirstName={(firstName) => setFirstName(index, firstName)} 
                                                     handleLastName={(lastName) => setLastName(index, lastName)} 
                                                     handleChild={(child) => setChild(index, child)} />
                )}
            </div>
        </>
    );
}

function Passenger({passenger, handleFirstName, handleLastName, handleChild}) {
    return (
        <div className='passenger'>
            <LabeledInput1 
                label='First Name' 
                value={passenger.firstName} 
                error=''
                onChange={e => handleFirstName(e.target.value)} />
            <LabeledInput1 
                label='Last Name' 
                value={passenger.lastName} 
                error=''
                onChange={e => handleLastName(e.target.value)} />
            <LabeledBox 
                label='Is child' 
                value={passenger.child} 
                onChange={e => handleChild(e.target.checked)} />
        </div>
    );
}