import React, { useState } from 'react'
import { Container } from '@mui/material'
import TabPanel from '../../../Components/Helper/TabPanel'
import MyAppbar from '../../../Components/Navigation/MyAppbar'
import CMUnit from './CMUnit'
import CMLocation from './CMLocation'
import CMSeller from './CMSeller'
import CMCredit from './CMCredit'


export default function ContentManagementPage() {
  const ActivePage = 2; // Staticly Setup for Active Menu
  const [ActiveTab, setActiveTab] = useState(0)

  const [dataFilter, setDataFilter] = useState([])
<<<<<<< HEAD
  const [dataFilterMulti, setDataFilterMulti] = useState([])
  const getDataFilter = (val) => {
    // do not forget to bind getData in constructor
    // console.log('+ filter ContentManagementPage => ',val);
    setDataFilter(val)
    // setDataFilter("Audi")
  }

  const getDataFilterMulti = (val) => {
    // do not forget to bind getData in constructor
    // console.log('+ getDataFilterMulti ContentManagementPage => ',val);
    setDataFilterMulti(val)
    // setDataFilter("Audi")
=======
  const getDataFilter = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
    setDataFilter(val)
>>>>>>> 4a6d3492dcf3e615f41e308b116210de547eb53d
  }

  const DATA = {
    header: 'Manajemen konten',
    tabsMenu: [
<<<<<<< HEAD
      { value: 0, label: 'Unit', content: <CMUnit dataFilter={dataFilter} dataFilterMulti={dataFilterMulti}  /> },
=======
      { value: 0, label: 'Unit', content: <CMUnit dataFilter={dataFilter}  /> },
>>>>>>> 4a6d3492dcf3e615f41e308b116210de547eb53d
      { value: 1, label: 'Lokasi', content: <CMLocation /> },
      { value: 2, label: 'Kredit', content: <CMCredit /> },
      { value: 3, label: 'Penjual', content: <CMSeller /> },
    ]
  }

  
  return (
    <>
      <MyAppbar
        header={DATA.header}
        tabsMenu={DATA.tabsMenu}
        ActiveTab={ActiveTab} setActiveTab={setActiveTab}
        ActivePage={ActivePage}
        getDataFilter={getDataFilter}
<<<<<<< HEAD
        getDataFilterMulti={getDataFilterMulti}
=======
>>>>>>> 4a6d3492dcf3e615f41e308b116210de547eb53d
      />

      <Container maxWidth="xl">
        { DATA?.tabsMenu?.map((tM, index) => (
          <TabPanel key={index} value={ActiveTab} index={index}>
            { tM.content }
          </TabPanel>
        )) }
      </Container>
    </>
  )
}
