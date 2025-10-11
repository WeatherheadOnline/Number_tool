import React, { useEffect } from 'react';
import { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import AddARecordBtn from './components/AddARecordBtn';
import Cards from './components/Cards';
import Form from './components/Form';
import Footer from './components/Footer';
import Background from './components/Background';


const App = () => {

    // Set initial state

  const [records, setRecords] = useState([
    {
        "name": "Albert Einstein",
        "date": "14-03-1879",
        "nRuling": "33",
        "nDay": "5",
        "nExpression": "3",
        "nSoul": "7",
        "notes": undefined,
        "key": "0"
    },
    {
        "name": "Maya Angelou",
        "date": "04-04-1928",
        "nRuling": "1",
        "nDay": "4",
        "nExpression": undefined,
        "nSoul": undefined,
        "notes": "Poet, author & activist",
        "key": "1"
    },
    {
        "name": "Rosalind Elsie Franklin",
        "date": undefined,
        "nRuling": undefined,
        "nDay": undefined,
        "nExpression": "9",
        "nSoul": "8",
        "notes": "X-ray crystallographer who co-discovered DNA",
        "key": "2"
    }
  ]);  

  const [keyCounter, setKeyCounter] = useState(records.length);

    // Setting state

  const recordsSetter = (returnName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes) => {
    setRecords([...records, 
          {
            "name": returnName,
            "date": `${returnDay}/${returnMonth}/${returnYear}`, // Note: This is wrong! should be using returnDay (not currently being gathered)
            "nRuling": nRuling,
            "nDay": nDay,
            "nExpression": nExpression,
            "nSoul": nSoul,
            "notes": notes,
            "key": keyCounter.toString(),
          },
        ]);
  }
  const keySetter = (prevKey) => {
      setKeyCounter(prevKey + 1);
  }

    // Side effects

  useEffect(() => {  // When the page loads, 
    if(!localStorage.getItem("records")) {  // If no local storage, keep the built-in records array 
    } else {
      const localRecords = localStorage.getItem("records");  // Otherwise, populate from client's local storage
      const parseLocalRecords = JSON.parse(localRecords);
      setRecords(parseLocalRecords);
      const localKeyCounter = localStorage.getItem("keyCounter");
      const parseLocalCounter = JSON.parse(localKeyCounter);
      setKeyCounter(parseLocalCounter);
    }
  }, []); // and only do this after the inital render

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));  // When the records array is updated, save a copy to local storage.
  }, [records]);

  useEffect(() => {
    localStorage.setItem("keyCounter", JSON.stringify(keyCounter));  // When the keyCounter is updated, save the new value to local storage.
  }, [keyCounter]);

  useEffect(() => {
    localStorage.setItem("keyCounter", JSON.stringify(keyCounter));  // After the initial render, save keyCounter to local storage. The value will be either: (a) the length of the preset records array, if local storage hasn't been set, or (b) the value that was just retrieved from local storage. 
  }, []);

    // Adding and deleting records

  const addRecord = (returnName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes) => {
    recordsSetter(returnName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes);
    keySetter(keyCounter);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(record => record.key !== id));
  };

    // The return method

  return (
    <div className="App">
      <Background type="blurred-stars-1 blurred-stars" />
      <Background type="blurred-stars-2 blurred-stars" />
      <Background type="blurred-stars-3 blurred-stars" />
      <Header />

      <main>
        <Cards records={records} deleteRecord={deleteRecord} />
        <AddARecordBtn mobileOrDesktop="mobile" />
        <Form addRecord={addRecord} />
      </main>
      
      <Footer />
      
    </div>
  );
}

export default App;