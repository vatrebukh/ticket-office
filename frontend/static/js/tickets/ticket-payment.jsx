import React from 'react';
import { useState } from 'react';
import { Navigation, Steps, LabeledInput1} from './steps';

export default function TicketPayment({pageSetter, totalPrice}) {

    const [cashHidden, setCashHidden] = useState(true);
    const [cardHidden, setCardHidden] = useState(true);

    function showCashDetails() {
        setCashHidden(false);    
        setCardHidden(true);
    }

    function showCardDetails() {
        setCashHidden(true);    
        setCardHidden(false);
    }

    return (
        <div className="page">
            <div className="payment-page">
                <div className="payment">
                    <span className="section-title">Select Payment Method</span>
                    <div className="payment-methods">
                        <PaymentMethod method="cash" handleClick={showCashDetails} />
                        <PaymentMethod method="card" handleClick={showCardDetails} />
                    </div>
                    <div className="payment-details">
                        <div>{totalPrice} USD</div>
                        <CashPayment cashHidden={cashHidden} />
                        <CardPayment cardHidden={cardHidden} />
                    </div>
                </div>
                <Navigation onPrev={() => pageSetter(3)} onNext={() => pageSetter(5)}/>
                <Steps active={4} />
            </div>
        </div>
    );
}

function PaymentMethod({method, handleClick}) {
    return (
        <div className="payment-method">
            <input type="radio" id={`payment-${method}`} name="payment-method" value={method} onClick={handleClick}></input>
            <label htmlFor={`payment-${method}`}>{method} </label>
        </div>
    );
}

function CashPayment({cashHidden}) {

    function complete() {
        console.log('Ticket reservation completed');
    }

    return (
        <div className={cashHidden ? 'hidden' : 'payment-cash'}>
        <button className='button' onClick={complete}>Complete</button>
    </div>
    );
}

function CardPayment({cardHidden}) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');

    function completePayment() {
        console.log(`Ticket payment completed. Card ${cardNumber}, holder: ${cardHolder}`);
        setCardNumber('');
        setCardHolder('');
    }

    return (
        <div className={cardHidden ? 'hidden' : 'payment-card'}>
            <LabeledInput1 label="Card number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
            <LabeledInput1 label="Card holder" value={cardHolder} onChange={e => setCardHolder(e.target.value)} />
            <button className='button' onClick={completePayment}>Complete payment</button>
        </div>
    );
}