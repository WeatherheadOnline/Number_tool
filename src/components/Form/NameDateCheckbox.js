const NameDateCheckbox = ({isChecked, toggleFunction, text1, text2, listItems}) => {
    const list = listItems.map(item => {
        return (
            <li key={item}>{item}</li>
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