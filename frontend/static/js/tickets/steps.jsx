import React from 'react';

export default function Steps({active}) {
    return (
        <div className="path-line">
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