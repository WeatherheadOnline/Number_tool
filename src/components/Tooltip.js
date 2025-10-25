import ExternalLink from "./ExternalLink";

const Tooltip = (props) => {
    return (
        <div className="tooltip border-radius-1">
            <p border-radius-1>{props.visible}</p>

            {props.a &&
                <p className="tooltip-hidden border-radius-1">
                    {props.hidden}
                    <ExternalLink url={props.a}>
                        {props.aText}
                    </ExternalLink>
                </p>
            }

            {!props.a &&
                    <p className="tooltip-hidden border-radius-1">{props.hidden}</p>
            }
        </div>
    );
};

export default Tooltip;