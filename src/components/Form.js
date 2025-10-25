import { useState, useEffect } from 'react';
import '../css/Form.css';
import {getDayNumber, getRulingNumber, getExpressionNumber, getSoulNumber} from '../calculations/calculations';
import MoreOptionsName from './MoreOptionsName';
import MoreOptionsDate from './MoreOptionsDate';

const Form = ({addRecord}) => {    

        // Setting initial state

    const [stateObject, setStateObject] = useState({
        nameChecked: true,
        firstName: "",
        lastName: "",
        nameOptions: "vowels-only",
        customWs: "0",
        customYs: "0",
        dateChecked: true,
        dobDay: "",
        dobMonth: "",
        dobYear: "",
        dateOptions: "date-all-together",
        nickname: "",
        notesField: "",
        nicknameRequired: false
    })    

        // Setting state

    const toggleName = () => setStateObject({...stateObject, nameChecked: !stateObject.nameChecked});
    const toggleDate = () => setStateObject({...stateObject, dateChecked: !stateObject.dateChecked});
    const nameOptionsHandler = e => setStateObject({...stateObject, nameOptions: e.target.value});
    const customWHandler = e => setStateObject({...stateObject, customWs: e.target.value});
    const customYHandler = e => setStateObject({...stateObject, customYs: e.target.value});
    const dateOptionsHandler = e => setStateObject({...stateObject, dateOptions: e.target.value});
    const nicknameSetter = e => setStateObject({...stateObject, nickname: e.target.value});
    const notesFieldHandler = e => setStateObject({...stateObject, notesField: e.target.value});
    const nicknameReqSetter = () => setStateObject({...stateObject, nicknameRequired: !stateObject.nameChecked});

        // Side effects 

    useEffect(() => {     // Toggle visibility of the nickname field and the enabled-disabled state of the name field
        const nicknameField = document.getElementById("nickname-label");
        const firstNameField = document.getElementById("firstName");
        const lastNameField = document.getElementById("lastName");
        firstNameField.disabled = !stateObject.nameChecked;
        lastNameField.disabled = !stateObject.nameChecked;
        if (stateObject.nameChecked) {
            nicknameField.style.opacity = 0;
        } else {
            nicknameField.style.opacity = 1;
        };
        nicknameReqSetter();
    }, [stateObject.nameChecked])
    
    useEffect(() => {      // Toggle visibility of the additional input fields for the "custom" option under the "name" field
        let customWYinput = document.getElementById("customWYinput");
        if(stateObject.nameOptions==="custom-Ws-Ys") {
            customWYinput.style.opacity = 1;
        } else {
            customWYinput.style.opacity = 0;
        }
    }, [stateObject.nameOptions])

    useEffect(() => {      // If the date checkbox is de-selected, disable the date fields and clear their contents. 
        const date1 = document.getElementById("dobDay");     
        const date2 = document.getElementById("dobMonth");
        const date3 = document.getElementById("dobYear");
        date1.disabled = !stateObject.dateChecked;
        date2.disabled = !stateObject.dateChecked;
        date3.disabled = !stateObject.dateChecked;
        if(!stateObject.dateChecked) {  // Without this: if the user enters a date, and then unchecks the date checkbox, they will be prompted to enter text into the now-invisible "nickname" field, and the date will be processed as though the checkbox was selected.
            setStateObject({...stateObject, dobDay: "", dobMonth: "", dobYear: ""});
        }
    }, [stateObject.dateChecked]);

        // Event handlers

    const submitHandler = (e) => {
        e.preventDefault();
        if(!stateObject.nameChecked && !stateObject.dateChecked) {  // If neither name or a date checkboxes are selected, close the form without clearing it (keeping any data they may have entered before de-selecting the checkboxes)
            document.getElementById("enter-record-form").style.display="none"; 
            return;
        }
        document.getElementById("enter-record-form").style.display="none";
        const returnFirstName = stateObject.nameChecked ? stateObject.firstName : stateObject.nickname;
        const returnLastName = stateObject.nameChecked ? stateObject.lastName : undefined;
        const nExpression = stateObject.nameChecked ? getExpressionNumber(stateObject.firstName).toString() : undefined;
        const nSoul = stateObject.nameChecked ? getSoulNumber(stateObject.firstName, stateObject.nameOptions, stateObject.customWs, stateObject.customYs).toString() : undefined;
        const returnDay = stateObject.dobDay !== "" ? stateObject.dobDay : undefined;
        const returnMonth = stateObject.dobMonth !== "" ? stateObject.dobMonth : undefined;
        const returnYear = stateObject.dobYear !== "" ? stateObject.dobYear : undefined;
        const nDay = stateObject.dobDay !== "" ? getDayNumber(stateObject.dobDay).toString() : undefined;
        const nRuling = stateObject.dobYear !=="" ? getRulingNumber(stateObject.dobDay, stateObject.dobMonth, stateObject.dobYear, stateObject.dateOptions).toString() : undefined;
        const notes = stateObject.notesField !== "" ? stateObject.notesField : undefined ;
        addRecord(returnFirstName, returnLastName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes);
        clearForm(e);
    }


    // Form buttons
    
    const clearForm = (e) => {
        e.preventDefault();
        setStateObject({...stateObject,
            firstName: "",
            dobDay: "",
            dobMonth: "",
            dobYear: "",
            customWs: "0",
            customYs: "0",
            nickname: "",
            notesField: ""
        })
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

    useEffect(() => {
        const moreOptionsBtns = document.getElementsByClassName("hidden-options");
        if(!stateObject.nameChecked) {
            moreOptionsBtns[0].style.display = "none";
        };
        if(!stateObject.dateChecked) {
            moreOptionsBtns[1].style.display = "none";
        };
    }, [stateObject.nameChecked, stateObject.dateChecked]);


        // The return method

    return (    
        <div id="enter-record-form">
            <form onSubmit={submitHandler}>
                <div className="close-btn" onClick={closeForm}>
                    <span>&times;</span>

                </div>

                <fieldset>
                    <div className="checkbox-wrapper">
                        <input id="whether-name" type="checkbox" checked={stateObject.nameChecked} onChange={toggleName} />
                        <label>Enter a name to calculate: <ul><li>expression number</li><li>soul number</li></ul></label>
                    </div>

                    <label htmlFor="firstName">Given name(s)</label>
                    <input id="firstName" className="block-element" type="text" value={stateObject.firstName} onChange={(e) => {setStateObject({...setStateObject, firstName: e.target.value});}} required={stateObject.nameChecked} />
                    <label htmlFor="lastName">Family name</label>
                    <input id="lastName" className="block-element" type="text" value={stateObject.lastName} onChange={(e) => {setStateObject({...stateObject, lastName: e.target.value});}} required={stateObject.nameChecked} />

                    <MoreOptionsName state={stateObject} nameOptionsHandler={nameOptionsHandler} customWHandler={customWHandler} customYHandler={customYHandler} toggleCollapsed={toggleCollapsed}  />

                </fieldset>

                <hr />

                <fieldset>
                    <div className="checkbox-wrapper">
                        <input id="whether-date" type="checkbox" checked={stateObject.dateChecked} onChange={toggleDate} />
                        <label>Enter a date to calculate: <ul><li>ruling number</li><li>day number</li></ul> (day / month / year)</label>
                    </div>
                    
                    <label htmlFor="dobDay" className="screen-reader-only">Day from date of birth:</label>
                        <input id="dobDay" type="number" value={stateObject.dobDay} onChange={(e) => {setStateObject({...stateObject, dobDay: e.target.value})}} placeholder="DD" max={31} className="input-2ch" required={stateObject.dateChecked} />
                    <label htmlFor="dobMonth" className="screen-reader-only">Month from date of birth:</label>
                        <input id="dobMonth" type="number" value={stateObject.dobMonth} onChange={(e) => {setStateObject({...stateObject, dobMonth: e.target.value})}} placeholder="MM" max={12} className="input-2ch" required={stateObject.dateChecked} />
                    <label htmlFor="dobYear" className="screen-reader-only">Year from date of birth:</label>
                        <input id="dobYear" type="number" value={stateObject.dobYear} onChange={(e) => {setStateObject({...stateObject, dobYear: e.target.value})}} placeholder="YY" max={3000} className="input-4ch" required={stateObject.dateChecked} />
                    
                    <MoreOptionsDate state={stateObject} dateOptionsHandler={dateOptionsHandler} nameChecked={stateObject.nameChecked} toggleCollapsed={toggleCollapsed} />

                    <label className="block-element" id="nickname-label" >Enter a nickname to go with this date:
                        <input type="text" id="nickname" className="block-element" value={stateObject.nickname} onChange={nicknameSetter} required={stateObject.nicknameRequired} />
                    </label>

                    <label>Notes (optional)
                        <textarea className="block-element" value={stateObject.notesField} onChange={notesFieldHandler}></textarea>
                    </label>

                </fieldset>
                <button className='form-btn' onClick={clearForm}>Clear</button>
                <button className='form-btn' type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;