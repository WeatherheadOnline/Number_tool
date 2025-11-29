import ExternalLink from "./ExternalLink";

const Tooltip = (props) => {
    return (
        <div className="tooltip">
            <p>{props.visibleText}</p>
            <div className="tooltip-hidden border-radius-1">
                {props.children}
            </div>
                  
        </div>
    );
};

export default Tooltip;