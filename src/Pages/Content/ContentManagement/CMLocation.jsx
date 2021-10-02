import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Button, Collapse, Stack } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CMLKantor from './SubPage/CMLocation/CMLKantor';
import CMLWilayah from './SubPage/CMLocation/CMLWilayah';

export default function CMLocation() {
  const [ActiveSubPage, setActiveSubPage] = useState(0)

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);

  const TABS = [
    { index: 0, label: 'Kantor', 
      dataGrid: <CMLKantor indexPage={0} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 1, label: 'Wilayah',
      dataGrid: <CMLWilayah indexPage={1} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
  ]

  return (
    <>
      <Box sx={{ paddingBottom: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1 }}>
            { TABS?.map((tab, index) => (
              <Button
                key={index}
                variant="contained" size="large"
                color={ActiveSubPage===index?"mint20":"grey20"}
                onClick={() => { setActiveSubPage(index) }}
                sx={{ marginRight: 1.5, marginBottom: 1.5 }}
              >
                {tab.label}
              </Button>
            )) }
          </Box>
          <Box>
            <Button
              variant="contained" size="large"
              color="switch"
              startIcon={<AddCircleIcon />}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            >
              {'Tambah'}
            </Button>
          </Box>
        </Stack>
      </Box>
      { TABS?.map((tb, index) => (
        <Collapse key={index} in={ActiveSubPage===index} timeout="auto" >
          {tb.dataGrid}
        </Collapse>
      )) }
    </>
  )
}
