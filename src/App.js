import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './css/App.css';
import './css/themes-dark.css';
import './css/themes-light.css';
import './css/themes-nightsky.css';
import './css/themes-neon.css';
import './css/themes-earthy.css';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import ModeButtons from './components/ModeButtons/ModeButtons';


const App = () => {

    // Set initial state

  const [records, setRecords] = useState([
    {
        "firstName": "Albert",
        "lastName": "Einstein",
        "date": "14-03-1879",
        "nRuling": "33",
        "nDay": "5",
        "nExpression": "3",
        "nSoul": "7",
        "notes": undefined,
        "key": "0"
    },
    {
        "firstName": "Maya",
        "lastName": "Angelou",
        "date": "04-04-1928",
        "nRuling": "1",
        "nDay": "4",
        "nExpression": "4",
        "nSoul": "11",
        "notes": "Poet, author & activist",
        "key": "1"
    },
    {
        "firstName": "Rosalind Elsie",
        "lastName": "Franklin",
        "date": undefined,
        "nRuling": undefined,
        "nDay": undefined,
        "nExpression": "9",
        "nSoul": "8",
        "notes": "Co-discoverer of DNA",
        "key": "2"
    },
    {
        "firstName": "Weird Al Yankovic",
        "lastName": undefined,
        "date": "23-10-1959",
        "nRuling": "3",
        "nDay": "5",
        "nExpression": undefined,
        "nSoul": undefined,
        "notes": undefined,
        "key": "3"
    }
  ]);  

  const [keyCounter, setKeyCounter] = useState(records.length);

    // Setting state

  const recordsSetter = (returnFirstName, returnLastName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes) => {
    setRecords([ 
          {
            "firstName": returnFirstName,
            "lastName": returnLastName,
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

  const addRecord = (returnFirstName, returnLastName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes) => {
    recordsSetter(returnFirstName, returnLastName, returnDay, returnMonth, returnYear, nDay, nRuling, nExpression, nSoul, notes);
    keySetter(keyCounter);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(record => record.key !== id));
  };


    // Themes/styles

  const themeOptions = [
    {themeName: "dark", key: 0},
    {themeName: "light", key: 1},
    {themeName: "nightsky", key: 2},
    {themeName: "neon", key: 3},
    {themeName: "earthy", key: 4}
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
      case "firstName":
        newRecords.sort((a, b) => {
          const x = a.firstName;
          const y = b.firstName;
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
      case "lastName":
        newRecords.sort((a, b) => {
          const x = a.lastName;
          const y = b.lastName;
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
    setRecords(newRecords);
  }

  
  // The return method

  return (
    <div className={appClassName}>
      <Router>
        <Routes>
          <Route path="/about" element={<><About /> <Footer footerLink="/" footerLinkText="Home" /></>} />
          <Route path="/" element={<><Home records={records} deleteRecord={deleteRecord} sorter={sorter} /> <Form addRecord={addRecord} /><Footer footerLink="/about" footerLinkText="About" /></>} />
        </Routes>
      </Router>
      <ModeButtons getTheme={getTheme} themeOptions={themeOptions} initialState={theme} />
    </div>
  );
}

export default App;