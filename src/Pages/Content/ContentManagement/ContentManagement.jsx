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
  const getDataFilter = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
    setDataFilter(val)
  }

  const DATA = {
    header: 'Manajemen konten',
    tabsMenu: [
      { value: 0, label: 'Unit', content: <CMUnit dataFilter={dataFilter}  /> },
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
