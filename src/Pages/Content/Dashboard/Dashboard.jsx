import React, { useState } from 'react'
import { Container } from '@mui/material'
import TabPanel from '../../../Components/Helper/TabPanel'
import MyAppbar from '../../../Components/Navigation/MyAppbar'
import DashboardFinancing from './DashboardFinancing'
import DashboardRefinancing from './DashboardRefinancing'


export default function DashboardPage() {
  const ActivePage = 0; // Staticly Setup for Active Menu
  const [ActiveTab, setActiveTab] = useState(0)

  const DATA = {
    header: 'Dashbor',
    tabsMenu: [
      { value: 0, label: 'Financing', content: <DashboardFinancing /> },
      { value: 1, label: 'Refinancing', content: <DashboardRefinancing /> },
    ]
  }

  return (
    <>
      <MyAppbar
        header={DATA.header}
        tabsMenu={DATA.tabsMenu}
        ActiveTab={ActiveTab} setActiveTab={setActiveTab}
        ActivePage={ActivePage}
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
