import { useState } from 'react';
import '../css/Form.css';
import {addThese, getDayNumber, getRulingNumber, getExpressionNumber, getSoulNumber} from '../calculations/calculations';

const Form = ({addRecord}) => {    
    const [uName, setUName] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");
    const [nameChecked, setNameChecked] = useState(true);
    const [dateChecked, setDateChecked] = useState(true);
    const [nickname, setNickname] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById("enter-record-form").style.display="none";
        const returnName = nameChecked ? uName : nickname;
        const nExpression = nameChecked ? getExpressionNumber(uName) : undefined;
        const nSoul = nameChecked ? getSoulNumber(uName) : undefined;
        const returnMonth = dateChecked ? addThese(dobMonth) : undefined;
        const returnYear = dateChecked ? dobYear : undefined;
        const nDay = dateChecked ? getDayNumber(dobDay) : undefined;
        const nRuling = dateChecked ? getRulingNumber(dobDay, dobMonth, dobYear) : undefined;
        addRecord(returnName, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul);
        clearForm();
    }
    
    const clearForm = () => {
        setUName("");
        setDobDay("");
        setDobMonth("");
        setDobYear("");
    }

    const closeForm = () => {
        clearForm();
        document.getElementById("enter-record-form").style.display="none";
    }
    
    const toggleName = () => {
        const nicknameField = document.getElementById("nickname-label");
        const nameField = document.getElementById("uName");
        setNameChecked(!nameChecked);
        nameField.disabled = nameChecked;
        if (!nameChecked) {
            nicknameField.style.opacity = 0;
        } else {
            nicknameField.style.opacity = 1;
        }
    }

    const toggleDate = () => {
        const date1 = document.getElementById("dobDay");
        const date2 = document.getElementById("dobMonth");
        const date3 = document.getElementById("dobYear");
        setDateChecked(!dateChecked);
        date1.disabled = dateChecked;
        date2.disabled = dateChecked;
        date3.disabled = dateChecked;
    }

    const nicknameSetter = (e) => {
        setNickname(e.target.value);
    }

    return (    
        <div id="enter-record-form">
            <form onSubmit={submitHandler}>
                <span className="close-btn" onClick={closeForm}>&times;</span>

                <fieldset>
                    <div>
                        <input id="whether-name" type="checkbox" checked={nameChecked} onChange={toggleName} />
                        <label htmlFor="whether-name" >Enter a name to calculate: <ul><li>expression number</li><li>soul number</li></ul></label>
                    </div>

                    <label htmlFor="uName" className="screen-reader-only">Enter a name here:</label>
                    <input id="uName" className="block-element" type="text" value={uName} onChange={(e) => {setUName(e.target.value);}} />
                </fieldset>
                <hr />

                <fieldset>
                    <div>
                        <input id="whether-date" type="checkbox" checked={dateChecked} onChange={toggleDate} />
                        <label htmlFor="whether-date">Enter a date to calculate: <ul><li>ruling number</li><li>day number</li></ul> (day / month / year)</label>
                    </div>
                    
                    <label htmlFor="dobDay" className="screen-reader-only">Day from date of birth:</label>
                        <input id="dobDay" type="number" value={dobDay} onChange={(e) => {setDobDay(e.target.value);}} placeholder="DD" max={31} className="input-2ch" />
                    <label htmlFor="dobMonth" className="screen-reader-only">Month from date of birth:</label>
                        <input id="dobMonth" type="number" value={dobMonth} onChange={(e) => {setDobMonth(e.target.value);}} placeholder="MM" max={12} className="input-2ch" />
                    <label htmlFor="dobYear" className="screen-reader-only">Year from date of birth:</label>
                        <input id="dobYear" type="number" value={dobYear} onChange={(e) => {setDobYear(e.target.value);}} placeholder="YY" max={3000} className="input-4ch" />
                    

                    <label className="block-element" id="nickname-label" >Enter a nickname to go with this date:
                        <input type="text" id="nickname" className="block-element" value={nickname} onChange={nicknameSetter} />
                    </label>

                </fieldset>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;