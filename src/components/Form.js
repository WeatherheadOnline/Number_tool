import { useState } from 'react';
import '../css/Form.css';

const Form = ({addRecord}) => {    
    const [uName, setUName] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById("enter-record-form").style.display="none";
        addRecord(uName, dobDay, dobMonth, dobYear);
        clearForm();
        console.log(uName + " " + dobDay + "/" + dobMonth + "/" + dobYear);
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

                <label className="block-element">Your name goes here:
                    <input className="block-element" type="text" value={uName} onChange={(e) => {setUName(e.target.value);}} />
                </label>

                <p>Enter your date of birth (day / month / year):</p>
                <label htmlFor="dobDay"  className="screen-reader-only">Day from date of birth:</label>
                    <input id="dobDay" type="number" value={dobDay} onChange={(e) => {setDobDay(e.target.value);}} placeholder="DD" max={31} maxLength={2} />
                <label htmlFor="dobMonth"  className="screen-reader-only">Month from date of birth:</label>
                    <input id="dobDay" type="number" value={dobMonth} onChange={(e) => {setDobMonth(e.target.value);}} placeholder="MM" max={12} maxLength={2} />
                <label htmlFor="dobYear"  className="screen-reader-only">Year from date of birth:</label>
                    <input id="dobDay" type="number" value={dobYear} onChange={(e) => {setDobYear(e.target.value);}} placeholder="YY" max={3000} maxLength={4} />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;

