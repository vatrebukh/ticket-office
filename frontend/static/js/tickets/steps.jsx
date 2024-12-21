import React from 'react';

export function Steps({active}) {
    return (
        <div className="steps">
            <div className={active == 1 ? 'step cur-step' : 'step'}>1</div>
            <div className="line"></div>
            <div className={active == 2 ? 'step cur-step' : 'step'}>2</div>
            <div className="line"></div>
            <div className={active == 3 ? 'step cur-step' : 'step'}>3</div>
            <div className="line"></div>
            <div className={active == 4 ? 'step cur-step' : 'step'}>4</div>
        </div>
    );
}

export function Navigation({onPrev, onNext}) {
    return (
        <div className='controls'>
            <div>
                <button onClick={onPrev} >prev</button>
                <button onClick={onNext} >next</button>
            </div>
        </div>
    );
}

export function LabeledInput1({label, value, onChange}) {
    return (
        <div className='labeled'>
            <label className='small'>{label}</label>
            <input type='text' value={value} onChange={onChange}></input>
        </div>
    );
}

export function LabeledBox({label, value, onChange}) {
    return (
        <div className='labeled'>
            <label className='small'>{label}</label>
            <input type='checkbox' value={value} onChange={onChange}></input>
        </div>
    );
}