import '../css/AddARecordBtn.css';

const AddARecordBtn = (props) => {
    const clickHandler = () => {
        document.getElementById("enter-record-form").style.display="block";
    }
    const btnClassName = props.mobileOrDesktop + "-add-record add-record-btn"
    return (
        <button className={btnClassName} onClick={clickHandler}>
            <h3>+ Add a person</h3>
        </button>
    );
};

export default AddARecordBtn;