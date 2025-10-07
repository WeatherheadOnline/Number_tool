import '../css/AddARecordBtn.css';

const AddARecordBtn = (props) => {
    const clickHandler = () => {
        console.log("You clicked");
        document.getElementById("enter-record-form").style.display="block";
    }
    const btnClassName = props.mobileOrDesktop + "-add-record add-record-btn"
    return (
        <button className={btnClassName} onClick={clickHandler}>
            <h2>+ Add a record</h2>
        </button>
    );
};

export default AddARecordBtn;