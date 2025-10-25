                    // <div className="checkbox-wrapper">
                    //     <input id="whether-name" type="checkbox" checked={stateObject.nameChecked} onChange={toggleName} />
                    //     <label>Enter a name to calculate: <ul><li>expression number</li><li>soul number</li></ul></label>
                    // </div>


                    // <div className="checkbox-wrapper">
                    //     <input id="whether-date" type="checkbox" checked={stateObject.dateChecked} onChange={toggleDate} />
                    //     <label>Enter a date to calculate: <ul><li>ruling number</li><li>day number</li></ul> (day / month / year)</label>
                    // </div>


const NameDateCheckbox = ({isChecked, toggleFunction, text1, text2, listItems}) => {
    const list = listItems.map(item => {
        return (
            <li>{item}</li>
        );
    });
    return (
        <div className="checkbox-wrapper" >
            <input type="checkbox" checked={isChecked} onChange={toggleFunction} />
            <label>
                {text1}
                <ul>{list}</ul>
                {text2}
            </label>
        </div>
    )
}

export default NameDateCheckbox;