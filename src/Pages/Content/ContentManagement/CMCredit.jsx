import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Button, Collapse, Stack } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CMCKategori from './SubPage/CMCredit/CMCKategori';
import CMCTipeAsuransi from './SubPage/CMCredit/CMCTipeAsuransi';
import CMCKesertaanAsuransi from './SubPage/CMCredit/CMCKesertaanAsuransi';
import CMCNilaiPertanggungan from './SubPage/CMCredit/CMCNilaiPertanggungan';
import CMCTujuanPenggunaan from './SubPage/CMCredit/CMCTujuanPenggunaan';
import CMCPembayaranAsuransi from './SubPage/CMCredit/CMCPembayaranAsuransi';
import CMCTenor from './SubPage/CMCredit/CMCTenor';
import CMCAngsuranPertama from './SubPage/CMCredit/CMCAngsuranPertama';

export default function CMCredit() {
  const [ActiveSubPage, setActiveSubPage] = useState(0)

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);

  const TABS = [
    { index: 0, label: 'Tujuan penggunaan',
      dataGrid: <CMCTujuanPenggunaan indexPage={0} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 1, label: 'Kategori',
      dataGrid: <CMCKategori indexPage={1} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 2, label: 'Tipe asuransi',
      dataGrid: <CMCTipeAsuransi indexPage={2} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 3, label: 'Kesertaan Asuransi',
      dataGrid: <CMCKesertaanAsuransi indexPage={3} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 4, label: 'Nilai pertanggungan',
      dataGrid: <CMCNilaiPertanggungan indexPage={4} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 5, label: 'Pembayaran asuransi',
      dataGrid: <CMCPembayaranAsuransi indexPage={5} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 6, label: 'Tenor',
      dataGrid: <CMCTenor indexPage={6} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
    { index: 7, label: 'Angsuran pertama',
      dataGrid: <CMCAngsuranPertama indexPage={7} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} /> },
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
