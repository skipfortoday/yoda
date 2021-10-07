import React, { useState } from 'react'
import { Container } from '@mui/material'
import TabPanel from '../../../Components/Helper/TabPanel'
import MyAppbar from '../../../Components/Navigation/MyAppbar'


export default function AuditTrailPage() {
  const ActivePage = 4; // Staticly Setup for Active Menu
  const [ActiveTab, setActiveTab] = useState(0)

  const DATA = {
    header: 'Audit trail',
    tabsMenu: []
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
