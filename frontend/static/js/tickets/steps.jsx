import React, {useContext} from 'react';
import { StepContext } from './StepContext';

export function Navigation({step}) {

    const stepHandler = useContext(StepContext);

    return (
        <>
            <div className='controls'>
                <div>
                    <button disabled={step == 1} onClick={() => stepHandler(step - 1)} >prev</button>
                    <button disabled={step == 4} onClick={() => stepHandler(step + 1)} >next</button>
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

export function LabeledInput1({label, name, value, error, onChange}) {
    return (
        <div className='labeled'>
            <label htmlFor={name} className='small'>{label}</label>
            <input type='text' name={name} id={name} value={value} onChange={onChange}></input>
            {error && <label className='small error'>{error}</label>}
        </div>
    );
}

export function LabeledInput2({label, value, error, onChange}) {
    return (
        <div className='labeled-2'>
            <label className='small' htmlFor={label.toLowerCase()} >{label}</label>
            <input type='text' name={label.toLowerCase()} id={label.toLowerCase()} value={value} onChange={onChange}></input>
            <label className={error ? 'small error' : ''}>{error}</label>
        </div>
    );
}

export function LabeledBox({label, name, value, onChange}) {
    return (
        <div className='labeled'>
            <label className='small'>{label}</label>
            <input type='checkbox' name={name} checked={value} onChange={onChange}></input>
        </div>
    );
}