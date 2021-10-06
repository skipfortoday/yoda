import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'
import axios from 'axios'

const INPUTS = [
  { label: 'Tahun', value: '', error: false, disabled: false,},
]

export default function CMUTahun(props) {
  console.log('props CMTahun => ', props)
  const [Data, setData] = useState([])
  const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV
  const thisToken = sessionStorage.getItem('token')
  const { isFilter, filteredDataTahun } = props;

  useEffect(() => { LoadData() }, [])

  useEffect(() => {
    setMenuAnchorEl(null);
    ResetInputs();
    LoadData();
  }, [props.val]);

  async function LoadData() {
    await axios.get(`${baseURL}/cm/tahun-pembuatan`, {
      headers: {
        Authorization: `Bearer ${thisToken}`,
      },
    })
    .then((response) => { 
      var tempData = response.data
      tempData.forEach((dat, idx) => {
        dat.index = idx + 1;
      });
      setData(tempData)
     })
  }

  function doSort(items) {
    var tempData = items
    tempData.forEach((dat, idx) => {
      dat.index = idx + 1;
    });
    setData(tempData)
  }

  const { indexPage, ActiveSubPage } = props
  const { isMenuOpen } = props
  const { MenuanchorEl, setMenuAnchorEl } = props

  const [InputTahun, setInputTahun] = useState(INPUTS[0])

  useEffect(() => {
    if (props.dataSort) {
      if (props.dataSort === "tahunDesc") {
        sortTahunDesc();
      }
      if (props.dataSort === "tahunAsc") {
        sortTahunAsc();
      }
    }else{
      sortTahunDesc();
    }
    if(isFilter){
      console.log('props filteredDataTahun', filteredDataTahun)
      // setData(filteredDataTahun)
      doSort(filteredDataTahun)
    }
  }, [props.dataSort, isFilter]);

  useEffect(() => {
    if(props.filteredData.length === 0){
      LoadData()
    }else{
      
      props.filteredData.forEach((dat, idx) => {
        dat.index = idx + 1;
      });
      setData(props.filteredData)
    }
  }, [props.filteredData])

  function sortTahunAsc() {
    const mydata = [...Data].sort((a, b) => {
      let x = a.tahun.toLowerCase();
      let y = b.tahun.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    
    // setData(mydata);
    doSort(mydata)
    console.log("mydata", mydata);
  }
  
  function sortTahunDesc() {
    const mydata = [...Data].sort((a, b) => {
      let x = a.tahun.toLowerCase();
      let y = b.tahun.toLowerCase();
      if(y.includes("<")){
        return -1;
      }
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    
    // setData(mydata);
    doSort(mydata)
    console.log("mydata", mydata);
  }
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputTahun(INPUTS[0])
  }

  async function InsertData() {
    await axios.post(`${baseURL}/cm/tahun-pembuatan`, {
      headers: {
        Authorization: `Bearer ${thisToken}`,
      },
      tahun: InputTahun.value,
    })
    .then((response) => {
      console.log(response.data)
      setMenuAnchorEl(null)
      ResetInputs()
      LoadData()
    })
    .catch((err) => { console.warn(err.response) })
  }

  const DATAGRID_COLUMNS = [
    { field: 'index', headerName: '#' },
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'tahun', headerName: 'Tahun pembuatan unit', minWidth: 180, flex: 1 },
  ]

  return (
    <>
      { indexPage!==ActiveSubPage?null:(
        <Popover
          open={isMenuOpen}
          anchorEl={MenuanchorEl}
          onClose={() => setMenuAnchorEl(null) }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <DynamicContentMenu
            header={"Tambah baru"}
            actionButtons={
              <>
                <Button size="large" fullWidth variant="contained" onClick={handleSubmit} >Tambah</Button>
              </>
            }
          >
            <FormControl variant="outlined" color="primary" fullWidth error={InputTahun.error}>
              <InputLabel htmlFor="input-1">{InputTahun.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputTahun.value}
                onChange={(e) => setInputTahun({...InputTahun, value: e.target.value})}
                label={InputTahun.label}
              />
            </FormControl>
            {/* <Autocomplete
              disablePortal
              id="asd1"
              options={top100Films}
              fullWidth
              size="large"
              renderInput={(params) => <TextField {...params} label="Movie" />}
              popupIcon={<ChevronRightIcon />}
            /> */}
          </DynamicContentMenu>
        </Popover>
      ) }
      <Box fullWidth sx={{ maxHeight: '70vh', height: '70vh'}}>
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={Data}
          checkboxSelection
          onSelectionModelChange={(newId) => {
            props.changeIcons(newId, "tahun-pembuatan")
            console.log(newId);
          }}
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  )
}
