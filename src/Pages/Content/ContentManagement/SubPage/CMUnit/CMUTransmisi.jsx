import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import PopupEdit from "../../../../../Components/DataGridComponents/PopupEdit";
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'
import axios from 'axios'

const INPUTS = [
  { label: 'Transmisi', value: '', error: false, disabled: false,},
]

export default function CMUTransmisi(props) {
  const [Data, setData] = useState([])
  const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV
  const thisToken = sessionStorage.getItem('token')
  const { dataSort,reload  } = props;
  
  function sortJenisTransmisiAsc() {
    const mydata = [...Data].sort((a, b) => {
      ;
      ;
      let x = a.transmisi.toLowerCase();
      let y = b.transmisi.toLowerCase();
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
  
  function sortJenisTransmisiDesc() {
    const mydata = [...Data].sort((a, b) => {
      ;
      ;
      let x = a.transmisi.toLowerCase();
      let y = b.transmisi.toLowerCase();
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
      if (dataSort === "jenisTransmisiDesc") {
        sortJenisTransmisiDesc();
      }
      if (dataSort === "jenisTransmisiAsc") {
        sortJenisTransmisiAsc();
      }
    }else{
      sortJenisTransmisiDesc();
    }
  }, [dataSort]);

  useEffect(() => { LoadData() }, [])

  useEffect(() => {
    setMenuAnchorEl(null);
    ResetInputs();
    LoadData();
  }, [props.val]);

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
    await axios.get(`${baseURL}/cm/transmisi`, {
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

  const { indexPage, ActiveSubPage } = props
  const { isMenuOpen } = props
  const { MenuanchorEl, setMenuAnchorEl } = props

  const [InputTransmisi, setInputTransmisi] = useState(INPUTS[0])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputTransmisi(INPUTS[0])
  }

  async function InsertData() {
    await axios.post(`${baseURL}/cm/transmisi/insert`, {
      headers: {
        Authorization: `Bearer ${thisToken}`,
      },
      transmisi: InputTransmisi.value,
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
    { field: 'transmisi', headerName: 'Jenis transmisi', minWidth: 180, flex: 1, renderCell: StylingTransmisi },
  ]

  function StylingTransmisi(params) {
    return (
      <PopupEdit
        row={params.row}
        reload={reload}
        fromTable={params.field}
        fromPage={"CM"}
        dataSent={LoadData}
      />
    );
  }

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
            <FormControl variant="outlined" color="primary" fullWidth error={InputTransmisi.error}>
              <InputLabel htmlFor="input-1">{InputTransmisi.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputTransmisi.value}
                onChange={(e) => setInputTransmisi({...InputTransmisi, value: e.target.value})}
                label={InputTransmisi.label}
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
            props.changeIcons(newId, "transmisi")
            console.log(newId);
          }}
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  )
}
