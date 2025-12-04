const records = [
    {
        name: "Albert Einstein",
        date: "14-03-1879",
        year: 1879,
        month: 3,
        day: 14,
        nRuling: 33,
        nDay: 5,
        nExpression: 9,
        nSoul: 7,
    },
    {
        name: "Maya Angelou",
        date: "04-04-1928",
        year: 1928,
        month: 4,
        day: 4,
        nRuling: 1,
        nDay: 4,
        nExpression: 7,
        nSoul: 8,
    },
    {
        name: "Lin-Manuel Miranda",
        date: "16-01-1980",
        year: 1980,
        month: 1,
        day: 16,
        nRuling: 8,
        nDay: 7,
        nExpression: 8,
        nSoul: 11,
    },
    {
        name: 'Alfred Matthew "Weird Al" Yankovic',
        date: "23-10-1959",
        year: 1959,
        month: 10,
        day: 23,
        nRuling: 3,
        nDay: 5,
        nExpression: 11,
        nSoul: 1,
    },
    {
        name: "Rosalind Franklin",
        date: "25-07-1920",
        year: 1920,
        month: 7,
        day: 25,
        nRuling: 8,
        nDay: 7,
        nExpression: 6,
        nSoul: 8,
    },
]

const displayRecords = records.map((person, index) => {
    return (
        <div class="person">
            <h2>Name: {person.name}</h2>
            <p>Date: {person.day}-{person.month}-{person.year}</p>
            <p>Ruling number: {person.nRuling}</p>
            <p>Day number: {person.nDay}</p>
            <p>Expression number: {person.nExpression}</p>
            <p>Soul number: {person.nSoul}</p>
        </div>
    );
})

const People = () => {
    return (
        <div>
            {displayRecords}
        </div>
    );
}

export default People;