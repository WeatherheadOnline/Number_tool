import { useState } from 'react';
import '../css/Form.css';
import {getDayNumber, getRulingNumber, getExpressionNumber, getSoulNumber} from '../calculations/calculations';

//   To do:
//////////////////////////////////////////
////   Add a "close/cancel button"   /////
//////////////////////////////////////////



const Form = ({addRecord}) => {    
    const [uName, setUName] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById("enter-record-form").style.display="none";
        const nDay = getDayNumber(dobDay);
        const nRuling = getRulingNumber(dobDay, dobMonth, dobYear);
        const nExpression = getExpressionNumber(uName);
        const nSoul = getSoulNumber(uName);
        addRecord(uName, dobDay, dobMonth, dobYear, nDay, nRuling, nExpression, nSoul);
        clearForm();
    }

    const clearForm = () => {
        setUName("");
        setDobDay("");
        setDobMonth("");
        setDobYear("");
    }

    return (    
        <div id="enter-record-form">
            <p>Hello World</p>
            <form onSubmit={submitHandler}>

                <label htmlFor="uName" className="block-element">Your name goes here:</label>
                <input id="uName" className="block-element" type="text" value={uName} onChange={(e) => {setUName(e.target.value);}} />
                

                <p className="p-label">Enter your date of birth (day / month / year):</p>
                <label htmlFor="dobDay"  className="screen-reader-only">Day from date of birth:</label>
                    <input id="dobDay" type="number" value={dobDay} onChange={(e) => {setDobDay(e.target.value);}} placeholder="DD" max={31} className="input-2ch" />
                <label htmlFor="dobMonth"  className="screen-reader-only">Month from date of birth:</label>
                    <input id="dobDay" type="number" value={dobMonth} onChange={(e) => {setDobMonth(e.target.value);}} placeholder="MM" max={12} className="input-2ch" />
                <label htmlFor="dobYear"  className="screen-reader-only">Year from date of birth:</label>
                    <input id="dobDay" type="number" value={dobYear} onChange={(e) => {setDobYear(e.target.value);}} placeholder="YY" max={3000} className="input-4ch" />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;

