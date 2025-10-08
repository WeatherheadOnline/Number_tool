import React from 'react';
import { useState } from 'react';
import './css/App.css';
import AddARecordBtn from './components/AddARecordBtn';
import Cards from './components/Cards';
import Form from './components/Form';
import Footer from './components/Footer';


// set to records.length
let keyCounter = 3;


const App = () => {
  const [records, setRecords] = useState([
    {
        name: "Albert Einstein",
        date: "14-03-1879",
        nRuling: 33,
        nDay: 5,
        nExpression: 9,
        nSoul: 7,
        notes: "Physicist",
        key: 0,
    },
    {
        name: "Maya Angelou",
        date: "04-04-1928",
        nRuling: 1,
        nDay: 4,
        nExpression: 7,
        nSoul: 8,
        notes: "Poet & author",
        key: 1,
    },
    {
        name: "Rosalind Franklin",
        date: "25-07-1920",
        nRuling: 8,
        nDay: 7,
        nExpression: 6,
        nSoul: 8,
        notes: "X-ray crystallographer who co-discovered DNA",
        key: 7,
    },
  ]);  

  const addRecord = (returnName, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes) => {
    setRecords([...records, 
      {
        name: returnName,
        date: `${nDay}/${returnMonth}/${returnYear}`,
        nRuling: nRuling,
        nDay: nDay,
        nExpression: nExpression,
        nSoul: nSoul,
        notes: notes,
        key: keyCounter,
      },
    ]);
    keyCounter++;
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(record => record.key !== id));
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
