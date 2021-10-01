import React, { useState, useEffect } from 'react'
import axiosBackend from '../../../../../Helper/axiosBackend'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'

const INPUTS = [
  { label: 'Nilai pertanggungan', value: '', error: false, disabled: false,},
]

export default function CMCNilaiPertanggungan(props) {
  const [Data, setData] = useState([])

  const { dataSort } = props;

  const dataType = {
    "nilaiPertanggungan": "nilai_pertanggungan",
  }
  
  function sortAsc(type) {
    const mydata = [...Data].sort((a, b) => {
      ;
      ;
      let x = typeof a[dataType[type]] === "number" ? a[dataType[type]] : a[dataType[type]].toLowerCase();
      let y = typeof b[dataType[type]] === "number" ? b[dataType[type]] : b[dataType[type]].toLowerCase();
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
  
  function sortDesc(type) {
    const mydata = [...Data].sort((a, b) => {
      ;
      ;
      let x = typeof a[dataType[type]] === "number" ? a[dataType[type]] : a[dataType[type]].toLowerCase();
      let y = typeof b[dataType[type]] === "number" ? b[dataType[type]] : b[dataType[type]].toLowerCase();
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
    if (dataSort) {
      if (dataSort === "nilaiPertanggunganDesc") {
        sortDesc("nilaiPertanggungan");
      }
      if (dataSort === "nilaiPertanggunganAsc") {
        sortAsc("nilaiPertanggungan");
      }
    }else{
      sortDesc("nilaiPertanggungan");
    }
  }, [dataSort]);

  useEffect(() => { LoadData() }, [])

  async function LoadData() {
    await axiosBackend.get('/cm/nilai-pertanggungan')
    .then((response) => { 
      var tempData = response.data
      tempData.forEach((dat, idx) => {
        dat.index = idx + 1;
      });
      setData(tempData)
     })
  }

  const { indexPage, ActiveSubPage } = props
  const { isMenuOpen } = props
  const { MenuanchorEl, setMenuAnchorEl } = props

  const [InputKesertaanAsuransi, setInputKesertaanAsuransi] = useState(INPUTS[0])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputKesertaanAsuransi(INPUTS[0])
  }

  async function InsertData() {
    await axiosBackend.post('/cm/nilai-pertanggungan', {
      nilai_pertanggungan: InputKesertaanAsuransi.value,
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
    { field: 'nilai_pertanggungan', headerName: 'Nilai pertanggungan', minWidth: 180, flex: 1 },
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
            <FormControl variant="outlined" color="primary" fullWidth error={InputKesertaanAsuransi.error}>
              <InputLabel htmlFor="input-1">{InputKesertaanAsuransi.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputKesertaanAsuransi.value}
                onChange={(e) => setInputKesertaanAsuransi({...InputKesertaanAsuransi, value: e.target.value})}
                label={InputKesertaanAsuransi.label}
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
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  )
}
