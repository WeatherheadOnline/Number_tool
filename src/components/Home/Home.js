import React from 'react'
import AddARecordBtn from '../AddARecordBtn/AddARecordBtn';
import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Background from '../Background/Background';

const Home = ({records, deleteRecord, sorter}) => {
  return (
    <>
      <Background type="color-bkgd" />
      <Background type="blurred-stars-1 blurred-stars" />
      <Background type="blurred-stars-2 blurred-stars" />
      <Background type="blurred-stars-3 blurred-stars" />

      <Header sorter={sorter} />  {/* contains the desktop version of the "add a record" button*/}

      <main>
        <Cards records={records} deleteRecord={deleteRecord} />
        <AddARecordBtn mobileOrDesktop="mobile" />
      </main>

    </>
  )
}

export default Home
