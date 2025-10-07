import '../css/Cards.css'

const Cards = (props) => {
    const cardsToDisplay = props.records.map(card => {

        return (
        <article key={card.key} className="card">
            <TopRowOfCard />
            <div className="card-name-date-wrapper">
                {card.nExpression 
                    ? <NameSideOfCard name={card.name} expr={card.nExpression} soul={card.nSoul} />
                    : <NamelessSideOfCard nickname={card.name} />            
                }
                {card.date 
                    ? <DateSideOfCard date={card.date} ruling={card.nRuling} day={card.nDay} />
                    : <span className="add-a-date-btn add-btn">Add a date</span>
                }
            </div>
        </article>
       )
    });

    return (
        <section className="cards-container">
            {cardsToDisplay}
        </section>
    );
};

const TopRowOfCard = () => {
    return (
        <div className="top-row-of-card">
            <span>Tags go here</span>
            <span>Delete</span>
        </div>
    );
};

const NameSideOfCard = (props) => {
    return (
        <div className="card-name-or-date card-name">
            <h2>{props.name}</h2>
            <p>Expression number: <span className="outcome-number">{props.expr}</span></p>
            <p>Soul number: <span className="outcome-number">{props.soul}</span></p>
        </div>
    );
};

const NamelessSideOfCard = (props) => {
    return (
        <div className="card-name-or-date card-name">
            <p>Nickname:</p>
            <h2 className="nickname">"{props.nickname}"</h2>
            <p className="add-btn">Add a name</p>
        </div>
    )
}

const DateSideOfCard = (props) => {
    return (
        <div className="card-contents card-date">
            <h2>{props.date}</h2>
            <p>Ruling number: <span className="outcome-number">{props.ruling}</span></p>
            <p>Day number: <span className="outcome-number">{props.day}</span></p>
        </div>
    );
};

export default Cards;