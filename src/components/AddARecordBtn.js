const AddARecordBtn = (props) => {
    const clickHandler = () => {
        console.log("You clicked");
        document.getElementById("enter-record-form").style.display="block";
    }
    return (
        <button className={props.mobileOrDesktop} onClick={clickHandler}>
            <h2>+ Add a record</h2>
        </button>
    );
};

export default AddARecordBtn;