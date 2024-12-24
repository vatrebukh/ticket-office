import React from 'react';

export function Navigation({step, onPrev, onNext}) {
    return (
        <>
            <div className='controls'>
                <div>
                    <button onClick={() => onPrev(step - 1)} >prev</button>
                    <button onClick={() => onNext(step + 1)} >next</button>
                </div>
            </div>
            < Steps active={step} />
        </>
    );
}

function Steps({active}) {
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

export function LabeledInput1({label, value, error, onChange}) {
    return (
        <div className='labeled'>
            <label className='small'>{label}</label>
            <input type='text' value={value} onChange={onChange}></input>
            <label className={error ? 'small error' : ''}>{error}</label>
        </div>
    );
}

export function LabeledInput2({label, value, error, onChange}) {
    return (
        <div className='labeled-2'>
            <label className='small'>{label}</label>
            <input type='text' name={label.toLowerCase()} value={value} onChange={onChange}></input>
            <label className={error ? 'small error' : ''}>{error}</label>
        </div>
    );
}

export function LabeledBox({label, value, onChange}) {
    return (
        <div className='labeled'>
            <label className='small'>{label}</label>
            <input type='checkbox' checked={value} onChange={onChange}></input>
        </div>
    );
}