import '../css/Cards.css'

const Cards = (props) => {

    const deleteThisRecord = e => {
        const cardID = e.target.parentElement.parentElement.parentElement.id;
        const keyToDelete = cardID.replaceAll("card-", "");
        props.deleteRecord(keyToDelete);
    }
    
    const cardsToDisplay = props.records.map(card => {
        const cardID = "card-" + card.key;
        return (
        <article key={card.key} id={cardID} className="card border-radius-3">
            {
                !card.nRuling && <div className="dateless-bkgd number-bkgd"><span>{card.nExpression}</span><span>{card.nSoul}</span></div>
            }
            {
                !card.nExpression && <div className="nameless-bkgd number-bkgd"><span>{card.nRuling}</span><span>{card.nDay}</span></div>
            }
            <div className="card-name-date-wrapper">
                {card.nExpression 
                    ? <NameSideOfCard firstName={card.firstName} lastName={card.lastName} expr={card.nExpression} soul={card.nSoul} />
                    : <NamelessSideOfCard nickname={card.firstName} />            
                }
                {card.nRuling
                    ? <DateSideOfCard date={card.date} ruling={card.nRuling} day={card.nDay} />
                    : null
                }
            </div>
            <BottomRowOfCard notes={card.notes} deleteThisRecord={deleteThisRecord} />
        </article>
       )
    });

    return (
        <section className="cards-container">
            {cardsToDisplay}
        </section>
    );
};

const BottomRowOfCard = (props) => {
    return (
        <div className="bottom-row-of-card">
            {props.notes ? <p className="card-notes">Notes: {props.notes}</p> : <p></p>}
            <span onClick={props.deleteThisRecord}>
                <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path d="M4 6h16l-1.58 14.22A2 2 0 0 1 16.43 22H7.57a2 2 0 0 1-1.99-1.78L4 6ZM7.34 3.15A2 2 0 0 1 9.15 2h5.7a2 2 0 0 1 1.8 1.15L18 6H6l1.34-2.85ZM2 6h20M10 11v5M14 11v5"/></svg>
            </span>
        </div>
    );
};

const NameSideOfCard = (props) => {
    return (
        <div className="card-name-or-date card-name">
            <h2>{props.firstName} {props.lastName}</h2>
            <p>
                <span>Expression<span className="hide-on-phones"> number</span>: </span>
                <span className="outcome-number">{props.expr}</span>
            </p>
            <p>
                <span>Soul<span className="hide-on-phones"> number</span>: </span>
                <span className="outcome-number">{props.soul}</span></p>
        </div>
    );
};

const NamelessSideOfCard = (props) => {
    return (
        <div className="card-name-or-date card-name">
            <p>Date for:</p>
            <h2 className="nickname">"{props.nickname}"</h2>
        </div>
    )
}

const DateSideOfCard = (props) => {
    return (
        <div className="card-name-or-date card-date">
            <h2>{props.date}</h2>
            <p>
                <span>Ruling<span className="hide-on-phones"> number</span>: </span>
                <span className="outcome-number">{props.ruling}</span>
                </p>
            <p>
                <span>Day<span className="hide-on-phones"> number</span>: </span>
                <span className="outcome-number">{props.day}</span></p>
        </div>
    );
};

export default Cards;