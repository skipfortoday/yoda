import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Button, Collapse, Stack } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Remove from '@mui/icons-material/Remove';
import axiosBackend from '../../../Helper/axiosBackend'
import CMUMerkModelVariant from './SubPage/CMUnit/CMUMerkModelVariant';
import CMUTahun from './SubPage/CMUnit/CMUTahun';
import CMUJarakTempuh from './SubPage/CMUnit/CMUJarakTempuh';
import CMUWarna from './SubPage/CMUnit/CMUWarna';
import CMUBahanBakar from './SubPage/CMUnit/CMUBahanBakar';
import CMUTransmisi from './SubPage/CMUnit/CMUTransmisi';
import CMUKondisiUnit from './SubPage/CMUnit/CMUKondisiUnit';
import CMUJenisUnit from './SubPage/CMUnit/CMUJenisUnit';
import axios from 'axios'

export default function CMUnit(props) {
  console.log('props CMUnit', props)
  const [ActiveSubPage, setActiveSubPage] = useState(0)
  const [DeleteButton, setDeleteButton] = useState(false)
  const [DeleteChosenId, setDeleteChosenId] = useState([])
  const [DeleteType, setDeleteType] = useState(false)
  const [Deleted, setDeleted] = useState(false)

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);
  
  const changeIcons = (val, type) => {
    setDeleteButton(val.length > 0 ? true : false)
    setDeleteChosenId(val);
    setDeleteType(type);
  }
  
  const multiDelete = async () => {
    await axiosBackend.post(`/delete/${DeleteType}`, {
      id: DeleteChosenId,
    })
    .then((response) => {
      setDeleted(!Deleted)
      console.log(response.data)
    })
    .catch((err) => { console.warn(err.response) })
  }
  
  const [dataFiltered, setDataFiltered] = useState([]);
  const doFilterData = async () => {
    console.log('doFilterData')
    // console.log('selectedArea', selectedArea)
    // console.log('selectedMerek', selectedMerek)
    // props.getDataFilter(selectedMerek)
    // const multi = () => {
    //   const data = selectedArea.map((x) => {
    //     const obj = {"Merek" : x.name}
    //     return obj
    //   })
    //   return data
    // }
    // const filters = multi()
    const filters            = {
      Merek   : props.dataFilter,
    }
    console.log('filters => ', filters)
    await axios.post('https://yodamobi.sagaramedia.id/api/filter',{
      table: 'Merek, model, varian', filters
    })
    .then((response) =>{ 
      console.log('res', response)
      setDataFiltered(response.data.results)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  const TABS = [
    { index: 0, label: 'Merk, model, varian',
      dataGrid: <CMUMerkModelVariant dataFiltered={dataFiltered} indexPage={0} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 1, label: 'Tahun',
      dataGrid: <CMUTahun indexPage={1} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 2, label: 'Jarak tempuh',
      dataGrid: <CMUJarakTempuh indexPage={2} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 3, label: 'Warna',
      dataGrid: <CMUWarna indexPage={3} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 4, label: 'Bahan bakar',
      dataGrid: <CMUBahanBakar indexPage={4} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 5, label: 'Transmisi',
      dataGrid: <CMUTransmisi indexPage={5} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 6, label: 'Kondisi unit',
      dataGrid: <CMUKondisiUnit indexPage={6} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
    { index: 7, label: 'Jenis unit',
      dataGrid: <CMUJenisUnit indexPage={7} MenuanchorEl={MenuanchorEl} setMenuAnchorEl={setMenuAnchorEl} isMenuOpen={isMenuOpen} ActiveSubPage={ActiveSubPage} changeIcons={changeIcons} val={Deleted}/> },
  ]

  useEffect(() => {
    if(props.dataFilter){
      console.log('props dataFilter cmunit', props.dataFilter)
      doFilterData()
    }
  }, [props.dataFilter])

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
                onClick={() => { 
                  setActiveSubPage(index) 
                  setDeleteChosenId(false)
                }}
                sx={{ marginRight: 1.5, marginBottom: 1.5 }}
              >
                {tab.label}
              </Button>
            )) }
          </Box>
          <Box>{!DeleteButton?
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
              onClick={multiDelete}
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
