import { useState, useEffect } from 'react';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from './Tooltip';
import '../css/Form.css';
import {getDayNumber, getRulingNumber, getExpressionNumber, getSoulNumber} from '../calculations/calculations';

const Form = ({addRecord}) => {    

        // Setting initial state

    const [nameChecked, setNameChecked] = useState(true);
    const [uName, setUName] = useState("");   
    const [nameOptions, setNameOptions] = useState("vowels-only");
    const [customWs, setCustomWs] = useState("0");
    const [customYs, setCustomYs] = useState("0");
    const [dateChecked, setDateChecked] = useState(true);
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");
    const [dateOptions, setDateOptions] = useState("date-all-together");
    const [nickname, setNickname] = useState("");
    const [notesField, setNotesField] = useState("");
    const [nicknameRequired, setNicknameRequired] = useState(false);

        // Setting state

    const toggleName = () => setNameChecked(!nameChecked);
    const toggleDate = () => setDateChecked(!dateChecked);
    const nameOptionsHandler = e => setNameOptions(e.target.value);
    const customWHandler = e => setCustomWs(e.target.value);
    const customYHandler = e => setCustomYs(e.target.value);
    const dateOptionsHandler = e => setDateOptions(e.target.value);
    const nicknameSetter = e => setNickname(e.target.value);
    const notesFieldHandler = e => setNotesField(e.target.value);
    const nicknameReqSetter = () => setNicknameRequired(!nameChecked);
        // Side effects 

    useEffect(() => {     // Toggle visibility of the nickname field and the enabled-disabled state of the name field
        const nicknameField = document.getElementById("nickname-label");
        const nameField = document.getElementById("uName");
        nameField.disabled = !nameChecked;
        if (nameChecked) {
            nicknameField.style.opacity = 0;
        } else {
            nicknameField.style.opacity = 1;
        };
        nicknameReqSetter();
    }, [nameChecked])
    
    // useEffect(() => {
    // }, [nameChecked]);

    useEffect(() => {      // Toggle visibility of the additional input fields for the "custom" option under the "name" field
        let customWYinput = document.getElementById("customWYinput");
        if(nameOptions==="custom-Ws-Ys") {
            customWYinput.style.opacity = 1;
        } else {
            customWYinput.style.opacity = 0;
        }
    }, [nameOptions])

    useEffect(() => {      // If the date checkbox is de-selected, disable the date fields and clear their contents. 
        const date1 = document.getElementById("dobDay");     
        const date2 = document.getElementById("dobMonth");
        const date3 = document.getElementById("dobYear");
        date1.disabled = !dateChecked;
        date2.disabled = !dateChecked;
        date3.disabled = !dateChecked;
        if(!dateChecked) {  // Without this: if the user enters a date, and then unchecks the date checkbox, they will be prompted to enter text into the now-invisible "nickname" field, and the date will be processed as though the checkbox was selected.
            setDobDay("");
            setDobMonth("");
            setDobYear("");
        }
    }, [dateChecked]);

        // Event handlers

    const submitHandler = (e) => {
        e.preventDefault();
        if(!nameChecked && !dateChecked) {  // If neither name or a date checkboxes are selected, close the form without clearing it (keeping any data they may have entered before de-selecting the checkboxes)
            document.getElementById("enter-record-form").style.display="none"; 
            return;
        }
        document.getElementById("enter-record-form").style.display="none";
        const returnName = nameChecked ? uName : nickname;
        const nExpression = nameChecked ? getExpressionNumber(uName).toString() : undefined;
        const nSoul = nameChecked ? getSoulNumber(uName, nameOptions, customWs, customYs).toString() : undefined;
        const returnDay = dobDay !== "" ? dobDay : undefined;
        const returnMonth = dobMonth !== "" ? dobMonth : undefined;
        const returnYear = dobYear !== "" ? dobYear : undefined;
        const nDay = dobDay !== "" ? getDayNumber(dobDay).toString() : undefined;
        const nRuling = dobYear !=="" ? getRulingNumber(dobDay, dobMonth, dobYear, dateOptions).toString() : undefined;
        const notes = notesField !== "" ? notesField : undefined ;
        addRecord(returnName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes);
        clearForm(e);
    }
    
    const clearForm = (e) => {
        e.preventDefault();
        setUName("");
        setDobDay("");
        setDobMonth("");
        setDobYear("");
        setCustomWs("0");
        setCustomYs("0");
        setNickname("");
        setNotesField("");
    }

    const closeForm = (e) => {
        clearForm(e);
        document.getElementById("enter-record-form").style.display="none";
    }

    const toggleCollapsed = e => {
        const moreOptions = e.target.nextSibling;
        if (moreOptions.style.display === "block") {
            moreOptions.style.display = "none";
        } else {
            moreOptions.style.display = "block";
        }
    };

        // The return method

    return (    
        <div id="enter-record-form">
            <form onSubmit={submitHandler}>
                <div className="close-btn" onClick={closeForm}>
                    <span>&times;</span>

                </div>

                <fieldset>
                    <div className="checkbox-wrapper">
                        <input id="whether-name" type="checkbox" checked={nameChecked} onChange={toggleName} />
                        <label>Enter a name to calculate: <ul><li>expression number</li><li>soul number</li></ul></label>
                    </div>

                    <label htmlFor="uName" className="screen-reader-only">Enter a name here:</label>
                    <input id="uName" className="block-element" type="text" value={uName} onChange={(e) => {setUName(e.target.value);}} required={nameChecked} />

                    <div>
                        <div className="collapse-btn" onClick={toggleCollapsed}>More options</div>
                        <div className="hidden-options" >
                            To calculate soul number:
                            <label htmlFor="vowels-only" className="block-element">
                                <input type="radio" id="vowels-only" name="name-options" value="vowels-only" checked={nameOptions==="vowels-only"} onChange={nameOptionsHandler} />
                                Only include A-E-I-O-U
                            </label>

                            <label htmlFor="some-Ws-Ys" className="block-element">
                                <input type="radio" id="some-Ws-Ys" name="name-options" value="some-Ws-Ys" checked={nameOptions==="some-Ws-Ys"} onChange={nameOptionsHandler} />
                                 Include some Ws and Ys
                                <Tooltip elementTag="p" visible="?" hidden='Following the guidelines by Matthew Oliver Goodwin in "Numerology the Complete Guide, Volume I: The Personality Reading". W is a vowel when it is preceded by a natural vowel and pronounced together as one sound. Y is a vowel when there is no other vowel in a syllable, or when it is preceded by a natural vowel and pronounced together as one sound. (ISBN-13: 978-1564148599)' />
                            </label>
                            
                            <label htmlFor="custom-Ws-Ys" className="block-element">
                                <input type="radio" id="custom-Ws-Ys" name="name-options" value="custom-Ws-Ys" checked={nameOptions==="custom-Ws-Ys"} onChange={nameOptionsHandler} />
                                Custom
                            </label>
                            <div id="customWYinput">
                                <label className="block-element">This many Ws
                                    <input type="number" id="customWs" value={customWs} onChange={customWHandler} maxLength={2} min={0} max={20} className="input-2ch" />
                                </label>
                                <label className="block-element">This many Ys
                                    <input type="number" id="customYs" value={customYs} onChange={customYHandler} maxLength={2} min={0} max={20} className="input-2ch" />
                                </label>
                            </div>
                        </div>
                    </div>

                </fieldset>

                <hr />

                <fieldset>
                    <div className="checkbox-wrapper">
                        <input id="whether-date" type="checkbox" checked={dateChecked} onChange={toggleDate} />
                        <label>Enter a date to calculate: <ul><li>ruling number</li><li>day number</li></ul> (day / month / year)</label>
                    </div>
                    
                    <label htmlFor="dobDay" className="screen-reader-only">Day from date of birth:</label>
                        <input id="dobDay" type="number" value={dobDay} onChange={(e) => {setDobDay(e.target.value);}} placeholder="DD" max={31} className="input-2ch" required={dateChecked} />
                    <label htmlFor="dobMonth" className="screen-reader-only">Month from date of birth:</label>
                        <input id="dobMonth" type="number" value={dobMonth} onChange={(e) => {setDobMonth(e.target.value);}} placeholder="MM" max={12} className="input-2ch" required={dateChecked} />
                    <label htmlFor="dobYear" className="screen-reader-only">Year from date of birth:</label>
                        <input id="dobYear" type="number" value={dobYear} onChange={(e) => {setDobYear(e.target.value);}} placeholder="YY" max={3000} className="input-4ch" required={dateChecked} />
                    
                    <div>
                        <div className="collapse-btn" id="collapse-btn-date" onClick={toggleCollapsed}>More options</div>
                        <div className="hidden-options">
                            <label htmlFor="date-all-together" className="block-element">
                                <input type="radio" id="date-all-together" name="date-options" value="date-all-together" checked={dateOptions==="date-all-together"} onChange={dateOptionsHandler} />
                                Add all digits together at once
                            </label>
                            <label htmlFor="date-individually" className="block-element">
                                <input type="radio" id="date-individually" name="date-options" value="date-individually" checked={dateOptions==="date-individually"} onChange={dateOptionsHandler} />
                                Add the day, month and year separately first
                            </label>
                        </div>           
                    </div>
                     
                    <label className="block-element" id="nickname-label" >Enter a nickname to go with this date:
                        <input type="text" id="nickname" className="block-element" value={nickname} onChange={nicknameSetter} required={nicknameRequired} />
                    </label>

                    <label>Notes (optional)
                        <textarea className="block-element" value={notesField} onChange={notesFieldHandler}></textarea>
                    </label>

                </fieldset>
                <button className='form-btn' onClick={clearForm}>Clear</button>
                <button className='form-btn' type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;