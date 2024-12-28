import React from 'react';
import { useState } from 'react';
import { Navigation, LabeledInput1 } from './steps';

export default function TicketPayment({totalPrice}) {

    const [cashHidden, setCashHidden] = useState(true);
    const [cardHidden, setCardHidden] = useState(true);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    if (paymentCompleted) {
        return (
            <div className="page">
            <div className="payment-page">
                <div className="payment">
                    <div className="notification-green">Thank you</div>
                </div>
            </div>
        </div>
        );
    }

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
                        <CashPayment cashHidden={cashHidden} setPaymentCompleted={setPaymentCompleted} />
                        <CardPayment cardHidden={cardHidden} setPaymentCompleted={setPaymentCompleted} />
                    </div>
                </div>
                <Navigation step={4} />
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

function CashPayment({cashHidden, setPaymentCompleted}) {

    function complete() {
        console.log('Ticket reservation completed');
        setPaymentCompleted(true);
    }

    return (
        <div className={cashHidden ? 'hidden' : 'payment-cash'}>
        <button className='button' onClick={complete}>Complete</button>
    </div>
    );
}

function CardPayment({cardHidden, setPaymentCompleted}) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardError, setCardError] = useState({"cardNumber": "", "cardHolder": ""});

    function completePayment() {
        let hasError = validateCard(cardNumber, cardHolder, setCardError);
        if (!hasError) {
            setCardNumber('');
            setCardHolder('');
            console.log(`Ticket payment completed. Card ${cardNumber}, holder: ${cardHolder}`);
            setPaymentCompleted(true);
        }
    }

    return (
        <div className={cardHidden ? 'hidden' : 'payment-card'}>
            <LabeledInput1 
                label="Card number" 
                name={"cardNumber"}
                value={cardNumber} 
                error={cardError.cardNumber}
                onChange={e => setCardNumber(e.target.value)} />
            <LabeledInput1 
                label="Card holder" 
                name={"cardHolder"}
                value={cardHolder} 
                error={cardError.cardHolder}
                onChange={e => setCardHolder(e.target.value)} />
            <button className='button' onClick={completePayment}>Complete payment</button>
        </div>
    );
}

function validateCard(cardNumber, cardHolder, setCardError) {
    let cardNumberError = cardNumber.length !== 16 ? "Card number is not valid" : "";
    let cardHolderError = cardHolder.length < 3 ? "Min 3 characters required" : "";

    setCardError({"cardNumber": cardNumberError, "cardHolder": cardHolderError});

    return cardNumberError || cardHolderError;
}