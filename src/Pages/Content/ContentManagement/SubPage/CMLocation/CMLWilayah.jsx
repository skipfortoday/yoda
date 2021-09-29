import React, { useState, useEffect } from 'react'
import axiosBackend from '../../../../../Helper/axiosBackend'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import TextPrimarySecondary from '../../../../../Components/DataGridComponents/TextPrimarySecondary'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'
import DateRegister from '../../../../../Components/DataGridComponents/DateRegister'

const INPUTS = [
  { label: 'Provinsi', value: '', error: false, disabled: false,},
  { label: 'Kota', value: '', error: false, disabled: false,},
  { label: 'Kecamatan', value: '', error: false, disabled: false,},
  { label: 'Cabang pengelola', value: '', error: false, disabled: false,},
]

export default function CMLWilayah(props) {
  const [Data, setData] = useState([])

  useEffect(() => { LoadData() }, [])

  async function LoadData() {
    await axiosBackend.get('/cm/wilayah')
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

  const [InputProvince, setInputProvince] = useState(INPUTS[0])
  const [InputCity, setInputCity] = useState(INPUTS[1])
  const [InputKecamatan, setInputKecamatan] = useState(INPUTS[2])
  const [InputCabangPengelola, setInputCabangPengelola] = useState(INPUTS[3])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
      ResetInputs();
    }
  }

  function ResetInputs() {
    setInputProvince(INPUTS[0])
    setInputCity(INPUTS[1])
    setInputKecamatan(INPUTS[2])
    setInputCabangPengelola(INPUTS[3])
  }

  async function InsertData() {
    await axiosBackend.post('/cm/wilayah', {
      provinsi: InputProvince.value,
      kota: InputCity.value,
      kecamatan: InputKecamatan.value,
      cabang_pengelola: InputCabangPengelola.value,
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
    { field: 'provinsi', headerName: 'Provinsi', minWidth: 120, flex: 1 },
    { field: 'kota', headerName: 'Kota', minWidth: 160, flex: 1 },
    { field: 'kecamatan', headerName: 'Kecamatan', minWidth: 160, flex: 1 },
    { field: 'cabang_pengelola', headerName: 'Cabang pengelola', minWidth: 160, flex: 1 },
    { field: 'tanggal_registrasi', headerName: 'Tanggal registrasi', minWidth: 160, renderCell: StylingDateRegister },
  ]

  function StylingDateRegister(params) {
    return (
      <DateRegister created_at={params.row.tanggal_registrasi} />
    )
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
            // actionButtons={
            //   <>
            //     <Button size="large" fullWidth variant="contained" onClick={handleSubmit} >Tambah</Button>
            //   </>
            // }
          >
            <FormControl variant="outlined" color="primary" fullWidth error={InputProvince.error}>
              <InputLabel htmlFor="input-1">{InputProvince.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputProvince.value}
                onChange={(e) => setInputProvince({...InputProvince, value: e.target.value})}
                label={InputProvince.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputCity.error}>
              <InputLabel htmlFor="input-2">{InputCity.label}</InputLabel>
              <OutlinedInput
                id="input-2"
                type="text"
                value={InputCity.value}
                onChange={(e) => setInputCity({...InputCity, value: e.target.value})}
                label={InputCity.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputKecamatan.error}>
              <InputLabel htmlFor="input-3">{InputKecamatan.label}</InputLabel>
              <OutlinedInput
                id="input-3"
                type="text"
                value={InputKecamatan.value}
                onChange={(e) => setInputKecamatan({...InputKecamatan, value: e.target.value})}
                label={InputKecamatan.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputCabangPengelola.error}>
              <InputLabel htmlFor="input-4">{InputCabangPengelola.label}</InputLabel>
              <OutlinedInput
                id="input-4"
                type="text"
                value={InputCabangPengelola.value}
                onChange={(e) => setInputCabangPengelola({...InputCabangPengelola, value: e.target.value})}
                label={InputCabangPengelola.label}
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
