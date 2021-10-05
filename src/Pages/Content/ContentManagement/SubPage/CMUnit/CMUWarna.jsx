import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'
import axios from 'axios'

const INPUTS = [
  { label: 'Warna', value: '', error: false, disabled: false,},
]

export default function CMUWarna(props) {
  const [Data, setData] = useState([])
  const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_PROD
  const thisToken = sessionStorage.getItem('token')
  const { dataSort } = props;
  
  function sortWarnaUnitAsc() {
    const mydata = [...Data].sort((a, b) => {
      ;
      ;
      let x = a.warna.toLowerCase();
      let y = b.warna.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    
    setData(mydata);
    console.log("mydata", mydata);
  }
  
  function sortWarnaUnitDesc() {
    const mydata = [...Data].sort((a, b) => {
      let x = a.warna.toLowerCase();
      let y = b.warna.toLowerCase();
      ;
      ;
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    
    setData(mydata);
    console.log("mydata", mydata);
  }

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
  
  async function LoadData() {
    await axios.get(`${baseURL}/cm/warna`, {
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

  useEffect(() => {
    if (dataSort) {
      if (dataSort === "warnaUnitDesc") {
        sortWarnaUnitDesc();
      }
      if (dataSort === "warnaUnitAsc") {
        sortWarnaUnitAsc();
      }
    }else{
      sortWarnaUnitDesc();
    }
  }, [dataSort]);

  useEffect(() => { LoadData() }, [])

  useEffect(() => {
    setMenuAnchorEl(null);
    ResetInputs();
    LoadData();
  }, [props.val]);

  const { indexPage, ActiveSubPage } = props
  const { isMenuOpen } = props
  const { MenuanchorEl, setMenuAnchorEl } = props

  const [InputWarna, setInputWarna] = useState(INPUTS[0])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputWarna(INPUTS[0])
  }

  async function InsertData() {
    await axios.post(`${baseURL}/cm/warna`, {
      headers: {
        Authorization: `Bearer ${thisToken}`,
      },
      warna: InputWarna.value,
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
    { field: 'warna', headerName: 'Warna unit', minWidth: 180, flex: 1 },
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
            <FormControl variant="outlined" color="primary" fullWidth error={InputWarna.error}>
              <InputLabel htmlFor="input-1">{InputWarna.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputWarna.value}
                onChange={(e) => setInputWarna({...InputWarna, value: e.target.value})}
                label={InputWarna.label}
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
            props.changeIcons(newId, "warna")
            console.log(newId);
          }}
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  )
}
