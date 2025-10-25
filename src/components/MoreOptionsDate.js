const MoreOptionsDate = ({state, dateOptionsHandler, toggleCollapsed}) => {
    return (
        <div>
            <div className="collapse-btn" id="collapse-btn-date" onClick={toggleCollapsed}>More options</div>
            <div className="hidden-options">
                <label htmlFor="date-all-together" className="block-element">
                    <input type="radio" id="date-all-together" name="date-options" value="date-all-together" checked={state.dateOptions==="date-all-together"} onChange={dateOptionsHandler} />
                    Add all digits together at once
                </label>
                <label htmlFor="date-individually" className="block-element">
                    <input type="radio" id="date-individually" name="date-options" value="date-individually" checked={state.dateOptions==="date-individually"} onChange={dateOptionsHandler} />
                    Add the day, month and year separately first
                </label>
            </div>           
        </div>
    );
};

export default MoreOptionsDate;