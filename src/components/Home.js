import React from 'react'
import AddARecordBtn from './AddARecordBtn';
import Cards from './Cards';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

const Home = ({records, deleteRecord}) => {
  return (
    <>
      <Background type="color-bkgd" />
      <Background type="blurred-stars-1 blurred-stars" />
      <Background type="blurred-stars-2 blurred-stars" />
      <Background type="blurred-stars-3 blurred-stars" />

      {/* <Header sorter={sorter} />  */}
      <Header /> 
          {/* contains the desktop version of the "add a record" button*/}

      <main>
        <Cards records={records} deleteRecord={deleteRecord} />
        <AddARecordBtn mobileOrDesktop="mobile" />
      </main>

      {/* <Footer /> */}
    </>
  )
}

export default Home
