// import {Routes, Route, Link} from 'react-router-dom';
// import Cards from './Cards';
import '../css/Form.css';

const Form = () => {
    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById("enter-record-form").style.display="none";
        console.log("Submitted");
    }
    return (    
        <div id="enter-record-form">
            <p>Hello World</p>
            <form onSubmit={submitHandler}>
                <label>Type some text here:
                    <input type="text" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Form;

