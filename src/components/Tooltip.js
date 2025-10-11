const Tooltip = (props) => {
    return (
        <p className="tooltip">{props.visible}
            <span className="tooltip-hidden">{props.hidden}</span>
        </p>
    );
};

export default Tooltip;