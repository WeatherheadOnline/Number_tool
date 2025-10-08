import React from 'react';
import { useState } from 'react';
import './css/App.css';
import AddARecordBtn from './components/AddARecordBtn';
import Cards from './components/Cards';
import Form from './components/Form';
import Footer from './components/Footer';

const App = () => {

  const [records, setRecords] = useState([
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
        key: 0,
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
        key: 1,
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
        key: 2,
    },
  ]);

  let keyCounter = records.length;

  const addRecord = (uName, dobDay, dobMonth, dobYear, nDay, nRuling, nExpression, nSoul) => {
    setRecords([...records, 
      {
        name: uName,
        date: `${dobDay}/${dobMonth}/${dobYear}`,
        year: dobYear,
        month: dobMonth,
        day: dobDay,
        nRuling: nRuling,
        nDay: nDay,
        nExpression: nExpression,
        nSoul: nSoul,
        key: keyCounter,
      },
    ]);
    keyCounter++;
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(record => record.key != id));
  };

  return (
    <div className="App">

      <header className="App-header">
        <h1>Header</h1>
          <AddARecordBtn mobileOrDesktop="desktop" />
      </header>
      
        <main>
          <Cards records={records} deleteRecord={deleteRecord} />
          <Form addRecord={addRecord} />
        </main>
      
      <Footer />
      
      <AddARecordBtn mobileOrDesktop="mobile" />
    </div>
  );
}

export default App;
