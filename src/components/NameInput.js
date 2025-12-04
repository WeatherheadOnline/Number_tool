const NameInput = ({stateObject, setName}) => {

    return (
        <>
            <label htmlFor="firstName">Given name(s)</label>
            <input id="firstName" name="firstName" className="block-element" type="text" value={stateObject.firstName} onChange={(e) => {setName(e.target.id, e.target.value)}} required={stateObject.nameChecked && stateObject.lastName === ""} />
            <label htmlFor="lastName">Family name</label>
            <input id="lastName" name="lastName" className="block-element" type="text" value={stateObject.lastName} onChange={(e) => {setName(e.target.id, e.target.value)}} required={stateObject.nameChecked && stateObject.firstName === ""} />
        </>
    );
};

export default NameInput;