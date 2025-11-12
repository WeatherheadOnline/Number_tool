const NameInput = ({stateObject, setName}) => {

    return (
        <>
            <label htmlFor="firstName">Given name(s)</label>
            <input id="firstName" className="block-element" type="text" value={stateObject.firstName} onChange={(e) => {setName(e.target.id, e.target.value)}} required={stateObject.nameChecked} />
            <label htmlFor="lastName">Family name</label>
            <input id="lastName" className="block-element" type="text" value={stateObject.lastName} onChange={(e) => {setName(e.target.id, e.target.value)}} required={stateObject.nameChecked} />
        </>
    );
};

export default NameInput;