const Tooltip = (props) => {
    return (
        <div className="tooltip">
            <p>{props.visible}</p>
            <p className="tooltip-hidden">{props.hidden}</p>
        </div>
    );
};

export default Tooltip;