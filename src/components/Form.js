import { useState } from 'react';
import '../css/Form.css';

const Form = ({addRecord}) => {    
    const [uName, setUName] = useState("");
    const [uDate, setUDate] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById("enter-record-form").style.display="none";
        addRecord(uName, uDate);
        clearForm();
        console.log(uName, uDate);
    }

    const clearForm = () => {
        setUName("");
        setUDate("");
    }

    return (    
        <div id="enter-record-form">
            <p>Hello World</p>
            <form onSubmit={submitHandler}>

                <label>Your name goes here:
                    <input type="text" value={uName} onChange={(e) => {setUName(e.target.value);}} />
                </label>

                <label>Add a date:
                    <input type="text" value={uDate} onChange={(e) => {setUDate(e.target.value);}} />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;

