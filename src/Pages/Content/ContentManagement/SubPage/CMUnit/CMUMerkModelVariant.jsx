import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'
import axios from 'axios'

const INPUTS = [
  { label: 'Merek', value: '', error: false, disabled: false,},
  { label: 'Model', value: '', error: false, disabled: false,},
  { label: 'Varian', value: '', error: false, disabled: false,},
]

export default function CMUMerkModelVariant(props) {
  console.log('props CMUMerkModelVariant', props)
  const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT
  const thisToken = sessionStorage.getItem('token')
  console.log('thisToken CMUJarakTempuh', thisToken)
  const [Data, setData] = useState([])
  const [DataMerek, setDataMerek] = useState(props.dataFiltered)

  useEffect(() => { LoadData() }, [])

  useEffect(() => {
    setMenuAnchorEl(null);
    ResetInputs();
    if(props.dataFiltered){
      console.log('ada props dataFiltered', props.dataFiltered)
      setData(props.dataFiltered)
      if(props.dataFiltered.length === 0){
        console.log('props dataFiltered === 0')
        LoadData();
      }
    }
    if(props.dataFiltered === "resetFilter"){
      console.log('props.dataFiltered reset')
      LoadData();
    }
  }, [props.val, props.dataFiltered]);

  async function LoadData() {
    console.log('loadData')
    await axios.get(`${baseURL}/cm/merek-model-varian`, {
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

  const [InputMerek, setInputMerek] = useState(INPUTS[0])
  const [InputModel, setInputModel] = useState(INPUTS[1])
  const [InputVarian, setInputVarian] = useState(INPUTS[2])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputMerek(INPUTS[0])
    setInputModel(INPUTS[1])
    setInputVarian(INPUTS[2])
  }

  async function InsertData() {
    await axios.post(`${baseURL}/cm/merek-model-varian`, {
      headers: {
        Authorization: `Bearer ${thisToken}`,
      },
      merek: InputMerek.value,
      model: InputModel.value,
      varian: InputVarian.value,
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
    { field: 'merek', headerName: 'Merek', minWidth: 180, flex: 1 },
    { field: 'model', headerName: 'Model', minWidth: 160 },
    { field: 'varian', headerName: 'Varian', minWidth: 160, flex: 1 },
  ]

  // const [InputVarian, setInputVarian] = useState(INPUTS[2])
  const doFilter = () => {
    // const datafil = ['Audi', 'Renegade']
    // const newLop = datafil.map((x) => {
    //     return (currentElement.merek === x)
    //   })
    let filteredPeople = Data.filter(function (currentElement) {
      // the current value is an object, so you can check on its properties
      // const newLop = datafil.map((x) => {
      //   return currentElement.merek === x
      // })
      return currentElement.merek === "Audi" || currentElement.model === "Renegade";
    });
    
    console.log(filteredPeople);
    setData(filteredPeople)
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
            <FormControl variant="outlined" color="primary" fullWidth error={InputMerek.error}>
              <InputLabel htmlFor="input-1">{InputMerek.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputMerek.value}
                onChange={(e) => setInputMerek({...InputMerek, value: e.target.value})}
                label={InputMerek.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputModel.error}>
              <InputLabel htmlFor="input-1">{InputModel.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputModel.value}
                onChange={(e) => setInputModel({...InputModel, value: e.target.value})}
                label={InputModel.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputVarian.error}>
              <InputLabel htmlFor="input-3">{InputVarian.label}</InputLabel>
              <OutlinedInput
                id="input-3"
                type="text"
                value={InputVarian.value}
                onChange={(e) => setInputVarian({...InputVarian, value: e.target.value})}
                label={InputVarian.label}
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
      <button onClick={() => doFilter()}>doFilter</button>
      <Box fullWidth sx={{ maxHeight: '70vh', height: '70vh'}}>
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={Data}
          checkboxSelection
          onSelectionModelChange={(newId) => {
            props.changeIcons(newId, "merek-model-varian")
            console.log(newId);
          }}
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  )
}
