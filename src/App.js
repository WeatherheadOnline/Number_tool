import React, { useEffect } from 'react';
import { useState } from 'react';
import './css/App.css';
import './css/themes-dark.css';
import './css/themes-light.css';
import './css/themes-nightsky.css';
import Header from './components/Header';
import AddARecordBtn from './components/AddARecordBtn';
import Cards from './components/Cards';
import Form from './components/Form';
import Footer from './components/Footer';
import ModeButtons from './components/ModeButtons';
import Background from './components/Background';


const App = () => {

    // Set initial state

  const [records, setRecords] = useState([
    {
        "name": "EddieC",
        "date": "14-03-1879",
        "nRuling": "4",
        "nDay": "5",
        "nExpression": "1",
        "nSoul": "2",
        "notes": undefined,
        "key": "5"
    },
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
    },
    {
        "name": "EddieA",
        "date": "14-03-1879",
        "nRuling": "2",
        "nDay": "3",
        "nExpression": "4",
        "nSoul": "5",
        "notes": undefined,
        "key": "3"
    },
    {
        "name": "EddieB",
        "date": "14-03-1879",
        "nRuling": "3",
        "nDay": "4",
        "nExpression": "5",
        "nSoul": "1",
        "notes": undefined,
        "key": "4"
    },
    {
        "name": "EddieD",
        "date": "14-03-1879",
        "nRuling": "5",
        "nDay": "1",
        "nExpression": "2",
        "nSoul": "3",
        "notes": undefined,
        "key": "6"
    },
    {
        "name": "EddieE",
        "date": "14-03-1879",
        "nRuling": "1",
        "nDay": "2",
        "nExpression": "3",
        "nSoul": "4",
        "notes": undefined,
        "key": "7"
    }
  ]);  

  const [keyCounter, setKeyCounter] = useState(records.length);

    // Setting state

  const recordsSetter = (returnName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes) => {
    setRecords([ 
          {
            "name": returnName,
            "date": `${returnDay}/${returnMonth}/${returnYear}`,
            "nRuling": nRuling,
            "nDay": nDay,
            "nExpression": nExpression,
            "nSoul": nSoul,
            "notes": notes,
            "key": keyCounter.toString(),
          }, ...records]);
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


    // Themes/styles

  const themeOptions = [
    {themeName: "dark", key: 0},
    {themeName: "light", key: 1},
    // {themeName: "nightsky", key: 2},
  ];

  const [theme, setTheme] = useState("dark");

  function getTheme(newTheme) {
    setTheme(newTheme);
  };

  const appClassName = "App " + theme;


  // Sort function

  const sorter = (parameter, direction) => {
    const newRecords = [...records];
    switch(parameter) {
      case "name":
        newRecords.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          if (direction === "ascending") {
            if (x < y) {return -1;}
            if (x > y) {return 1;}
          } else if (direction === "descending") {
            if (x < y) {return 1;}
            if (x > y) {return -1;}
          }
          return 0;
        });
        break;
      case "ruling":
        direction === "ascending" 
          ? newRecords.sort((a, b) => a.nRuling - b.nRuling) 
          : newRecords.sort((a, b) => b.nRuling - a.nRuling);
        break;
      case "day": 
        direction === "ascending" 
          ? newRecords.sort((a, b) => a.nDay - b.nDay) 
          : newRecords.sort((a, b) => b.nDay - a.nDay);
        break;
      case "soul": 
        direction === "ascending" 
          ? newRecords.sort((a, b) => a.nSoul - b.nSoul) 
          : newRecords.sort((a, b) => b.nSoul - a.nSoul);
        break;
      case "expression": 
        direction === "ascending" 
          ? newRecords.sort((a, b) => a.nExpression - b.nExpression) 
          : newRecords.sort((a, b) => b.nExpression - a.nExpression);
        break;
      default: 
        return;
    }
    console.log(newRecords);
    setRecords(newRecords);
  }

  // The return method


  return (
    <div className={appClassName}>
      <Background type="color-bkgd" />
      <Background type="blurred-stars-1 blurred-stars" />
      <Background type="blurred-stars-2 blurred-stars" />
      <Background type="blurred-stars-3 blurred-stars" />
      <Header sorter={sorter} /> {/* contains the desktop version of the "add a record" button*/}

      <main>
        <Cards records={records} deleteRecord={deleteRecord} />
        <AddARecordBtn mobileOrDesktop="mobile" />
        <Form addRecord={addRecord} />
      </main>
      
      <Footer />

      <ModeButtons getTheme={getTheme} themeOptions={themeOptions} initialState={theme} />

    </div>
  );
}

export default App;