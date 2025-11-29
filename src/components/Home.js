import React from 'react'
import AddARecordBtn from './components/AddARecordBtn';
import Cards from './components/Cards';

const Home = () => {
  return (
    <>
        <Cards records={records} deleteRecord={deleteRecord} />
        <AddARecordBtn mobileOrDesktop="mobile" />
    </>
  )
}

export default Home
