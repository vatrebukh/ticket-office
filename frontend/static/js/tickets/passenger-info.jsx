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

    function setField(index, target) {
        setPassengers(passengers.map((passenger, i) => {
            return i === index 
                ? {...passenger, [target.name]: target.type === 'checkbox' ? target.checked : target.value}
                : passenger;
        }));
    }

    function removePassenger(index) {
        setPassengers(passengers.filter((passenger, i) => i !== index));
    }

    function addPassenger() {
        setPassengers([...passengers, {firstName: '', lastName: '', child: false}]);
    }

    return (
        <>
            <span className='section-title'>Passengers info</span>
            <div className='passengers'>
                {passengers.map(
                    (passenger, index) => <Passenger passenger={passenger} key={index} 
                                                     onChange={e => setField(index, e.target)} 
                                                     onDelete={() => removePassenger(index)} 
                                                     singlePassenger={passengers.length === 1}/>
                )}
                <button className='button-add' onClick={addPassenger}>Add passenger</button>
            </div>
        </>
    );
}

function Passenger({passenger, onChange, onDelete, singlePassenger}) {
    return (
        <div className='passenger'>
            <LabeledInput1 
                label='First Name' 
                name='firstName'
                value={passenger.firstName} 
                error={passenger.firstNameError}
                onChange={onChange} />
            <LabeledInput1 
                label='Last Name' 
                name='lastName'
                value={passenger.lastName} 
                error={passenger.lastNameError}
                onChange={onChange} />
            <LabeledBox 
                label='Is child' 
                name='child'
                value={passenger.child} 
                onChange={onChange} />
            { singlePassenger 
                ? ''
                : <span onClick={onDelete} ><img className='delete-small' src="/static/img/del.svg"></img></span>
            }
        </div>
    );
}