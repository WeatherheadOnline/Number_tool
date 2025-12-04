const Background = (props) => {
    const classes = "bkgd " + props.type;
    return (
        <div className={classes}></div>
    )
}

export default Background;