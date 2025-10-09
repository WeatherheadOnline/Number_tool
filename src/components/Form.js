import { useState, useEffect } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
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
    const [dateOptions, setDateOptions] = useState("date-all-together");
    const [nameOptions, setNameOptions] = useState("vowels-only");
    const [customWs, setCustomWs] = useState("0");
    const [customYs, setCustomYs] = useState("0");
    const [notesField, setNotesField] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if(!nameChecked && !dateChecked) {  // If neither name or a date checkboxes are selected, close the form without clearing it (keeping any data they may have entered before de-selecting the checkboxes)
            document.getElementById("enter-record-form").style.display="none"; 
            return;
        }
        document.getElementById("enter-record-form").style.display="none";
        const returnName = uName !== "" ? uName : nickname;
        const nExpression = uName !== "" ? getExpressionNumber(uName).toString() : undefined;
        const nSoul = uName !== "" ? getSoulNumber(uName, nameOptions, customWs, customYs).toString() : undefined;
        const returnMonth = dobMonth !== "" ? addThese(dobMonth) : undefined;
        const returnYear = dobYear !== "" ? dobYear : undefined;
        const nDay = dobDay !== "" ? getDayNumber(dobDay).toString() : undefined;
        const nRuling = dobYear !=="" ? getRulingNumber(dobDay, dobMonth, dobYear, dateOptions).toString() : undefined;
        const notes = notesField !== "" ? notesField : undefined ;
        addRecord(returnName, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes);
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
    }

    const closeForm = (e) => {
        clearForm(e);
        document.getElementById("enter-record-form").style.display="none";
    }

    const toggleName = () => {setNameChecked(!nameChecked);}
    const toggleDate = () => {setDateChecked(!dateChecked);}
    const nameOptionsHandler = e => {setNameOptions(e.target.value);}
    const customWHandler = e => {setCustomWs(e.target.value);}
    const customYHandler = e => {setCustomYs(e.target.value);}
    const dateOptionsHandler = e => {setDateOptions(e.target.value);}
    const nicknameSetter = e => {setNickname(e.target.value);}
    const notesFieldHandler = e => {setNotesField(e.target.value);}

    useEffect(() => {  // Toggle visibility of the nickname field and the enabled-disabled state of the name field
        const nicknameField = document.getElementById("nickname-label");
        const nameField = document.getElementById("uName");
        nameField.disabled = !nameChecked;
        if (nameChecked) {
            nicknameField.style.opacity = 0;
        } else {
            nicknameField.style.opacity = 1;
        }
    }, [nameChecked])

    useEffect(() => {   // Toggle visibility of the additional input fields for the custom option
        let customWYinput = document.getElementById("customWYinput");
        if(nameOptions==="custom-Ws-Ys") {
            customWYinput.style.opacity = 1;
        } else {
            customWYinput.style.opacity = 0;
        }
    }, [nameOptions])

    useEffect(() => {
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

    return (    
        <div id="enter-record-form">
            <form onSubmit={submitHandler}>
                <span className="close-btn" onClick={closeForm}>&times;</span>

                <fieldset>
                    <div>
                        <input id="whether-name" type="checkbox" checked={nameChecked} onChange={toggleName} />
                        <label>Enter a name to calculate: <ul><li>expression number</li><li>soul number</li></ul></label>
                    </div>

                    <label htmlFor="uName" className="screen-reader-only">Enter a name here:</label>
                    <input id="uName" className="block-element" type="text" value={uName} onChange={(e) => {setUName(e.target.value);}} required={nameChecked} />

                    <div>
                        <div className="collapse-btn">More options:</div>
                        <div className="more-options">
                            <label htmlFor="vowels-only" className="block-element">
                                <input type="radio" id="vowels-only" name="name-options" value="vowels-only" checked={nameOptions==="vowels-only"} onChange={nameOptionsHandler} />
                                Only include A-E-I-O-U
                            </label>

                            <label htmlFor="some-Ws-Ys" className="block-element">
                                <input type="radio" id="some-Ws-Ys" name="name-options" value="some-Ws-Ys" checked={nameOptions==="some-Ws-Ys"} onChange={nameOptionsHandler} />
                                 Include some Ws and Ys
                                <Tooltip className="tooltip"
                                    title = 'According to the guidelines by Matthew Oliver Goodwin in "Numerology the Complete Guide, Volume I: The Personality Reading". W is a vowel when it is preceded by a natural vowel and pronounced together as one sound. Y is a vowel when there is no other vowel in a syllable, or when it is preceded by a natural vowel and pronounced together as one sound.' 
                                > <span className="tooltip-icon">?</span>
                                </Tooltip>
                            </label>
                            
                            <label htmlFor="custom-Ws-Ys" className="block-element">
                                <input type="radio" id="custom-Ws-Ys" name="name-options" value="custom-Ws-Ys" checked={nameOptions==="custom-Ws-Ys"} onChange={nameOptionsHandler} />
                                Custom
                            </label>
                            <div id="customWYinput">
                                <label htmlFor="customWs">Include this many Ws</label>
                                <input type="number" id="customWs" value={customWs} onChange={customWHandler} maxLength={2} min={0} max={20} className="input-2ch" />
                                <label htmlFor="customYs">Include this many Ys</label>
                                <input type="number" id="customYs" value={customYs} onChange={customYHandler} maxLength={2} min={0} max={20} className="input-2ch" />
                            </div>
                        </div>
                    </div>

                </fieldset>

                <hr />

                <fieldset>
                    <div>
                        <input id="whether-date" type="checkbox" checked={dateChecked} onChange={toggleDate} />
                        <label htmlFor="whether-date">Enter a date to calculate: <ul><li>ruling number</li><li>day number</li></ul> (day / month / year)</label>
                    </div>
                    
                    <label htmlFor="dobDay" className="screen-reader-only">Day from date of birth:</label>
                        <input id="dobDay" type="number" value={dobDay} onChange={(e) => {setDobDay(e.target.value);}} placeholder="DD" max={31} className="input-2ch" required={dateChecked} />
                    <label htmlFor="dobMonth" className="screen-reader-only">Month from date of birth:</label>
                        <input id="dobMonth" type="number" value={dobMonth} onChange={(e) => {setDobMonth(e.target.value);}} placeholder="MM" max={12} className="input-2ch" required={dateChecked} />
                    <label htmlFor="dobYear" className="screen-reader-only">Year from date of birth:</label>
                        <input id="dobYear" type="number" value={dobYear} onChange={(e) => {setDobYear(e.target.value);}} placeholder="YY" max={3000} className="input-4ch" required={dateChecked} />
                    
                    <div>
                        <div className="collapse-btn" id="collapse-btn-date">More options:</div>
                        <div className="more-options">
                            <label htmlFor="date-all-together" className="block-element">
                                <input type="radio" id="date-all-together" name="date-options" value="date-all-together" checked={dateOptions==="date-all-together"} onChange={dateOptionsHandler} />
                                Add all digits together at once (default)
                            </label>
                            <label htmlFor="date-individually" className="block-element">
                                <input type="radio" id="date-individually" name="date-options" value="date-individually" checked={dateOptions==="date-individually"} onChange={dateOptionsHandler} />
                                Add the day, month and year separately first
                            </label>
                        </div>           
                    </div>
                     
                    <label className="block-element" id="nickname-label" >Enter a nickname to go with this date:
                        <input type="text" id="nickname" className="block-element" value={nickname} onChange={nicknameSetter} required={dateChecked} />
                    </label>

                    <label>Notes (optional)
                        <textarea value={notesField} onChange={notesFieldHandler}></textarea>
                    </label>

                </fieldset>
                <button onClick={clearForm}>Clear</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;