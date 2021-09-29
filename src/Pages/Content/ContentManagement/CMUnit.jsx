import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Button, Collapse, Stack } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Remove from '@mui/icons-material/Remove';
import CMUMerkModelVariant from './SubPage/CMUnit/CMUMerkModelVariant';
import CMUTahun from './SubPage/CMUnit/CMUTahun';
import CMUJarakTempuh from './SubPage/CMUnit/CMUJarakTempuh';
import CMUWarna from './SubPage/CMUnit/CMUWarna';
import CMUBahanBakar from './SubPage/CMUnit/CMUBahanBakar';
import CMUTransmisi from './SubPage/CMUnit/CMUTransmisi';
import CMUKondisiUnit from './SubPage/CMUnit/CMUKondisiUnit';
import CMUJenisUnit from './SubPage/CMUnit/CMUJenisUnit';

export default function CMUnit() {
  const [ActiveSubPage, setActiveSubPage] = useState(0)
  const [DeleteChosenId, setDeleteChosenId] = useState(false)

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);

  const changeIcons = () => {
    setDeleteChosenId(true)
  }

  const TABS = [
    { index: 0, label: 'Merk, model, varian',
      dataGrid: <CMUMerkModelVariant indexPage={0} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 1, label: 'Tahun',
      dataGrid: <CMUTahun indexPage={1} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 2, label: 'Jarak tempuh',
      dataGrid: <CMUJarakTempuh indexPage={2} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 3, label: 'Warna',
      dataGrid: <CMUWarna indexPage={3} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 4, label: 'Bahan bakar',
      dataGrid: <CMUBahanBakar indexPage={4} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 5, label: 'Transmisi',
      dataGrid: <CMUTransmisi indexPage={5} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 6, label: 'Kondisi unit',
      dataGrid: <CMUKondisiUnit indexPage={6} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
    { index: 7, label: 'Jenis unit',
      dataGrid: <CMUJenisUnit indexPage={7} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage}/> },
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
          <Box>{!DeleteChosenId?
            <Button
              variant="contained" size="large"
              color="switch"
              startIcon={<AddCircleIcon />}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            >
              {'Tambah'}
            </Button>:
            <Button
              variant="contained" size="large"
              color="error"
              startIcon={<Remove />}
              // onClick={}
            >
              {'Hapus'}
            </Button>
            }
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
