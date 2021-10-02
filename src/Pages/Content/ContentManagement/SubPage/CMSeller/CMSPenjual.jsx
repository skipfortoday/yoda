import React, { useState, useEffect } from 'react'
import axiosBackend from '../../../../../Helper/axiosBackend'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import TextPrimarySecondary from '../../../../../Components/DataGridComponents/TextPrimarySecondary'
import { Button, FormControl, InputLabel, OutlinedInput, Popover } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'

const INPUTS = [
  { label: 'Nama penjual', value: '', error: false, disabled: false,},
  { label: 'No. Telepon', value: '', error: false, disabled: false,},
  { label: 'Alamat', value: '', error: false, disabled: false,},
  { label: 'Provinsi', value: '', error: false, disabled: false,},
  { label: 'Kota', value: '', error: false, disabled: false,},
  { label: 'Kecamatan', value: '', error: false, disabled: false,},
]


export default function CMSPenjual(props) {
  const [Data, setData] = useState([])

  useEffect(() => { LoadData() }, [])

  async function LoadData() {
    await axiosBackend.get('/cm/penjual')
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

  const [InputName, setInputName] = useState(INPUTS[0])
  const [InputTelephone, setInputTelephone] = useState(INPUTS[1])
  const [InputAddress, setInputAddress] = useState(INPUTS[2])
  const [InputProvince, setInputProvince] = useState(INPUTS[3])
  const [InputCity, setInputCity] = useState(INPUTS[4])
  const [InputKecamatan, setInputKecamatan] = useState(INPUTS[5])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputName(INPUTS[0])
    setInputTelephone(INPUTS[1])
    setInputAddress(INPUTS[2])
    setInputProvince(INPUTS[3])
    setInputCity(INPUTS[4])
    setInputKecamatan(INPUTS[5])
  }

  async function InsertData() {
    await axiosBackend.post('/cm/penjual', {
      nama: InputName.value,
      no_telepon: InputTelephone.value,
      alamat: InputAddress.value,
      provinsi: InputProvince.value,
      kota: InputCity.value,
      kecamatan: InputKecamatan.value,
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
    { field: 'nama', headerName: 'Nama penjual', minWidth: 180, flex: 1, renderCell: StylingNameIdCode },
    { field: 'no_telepon', headerName: 'No. Telepon', minWidth: 160 },
    { field: 'alamat', headerName: 'Alamat', minWidth: 160, flex: 1 },
    { field: 'provinsi', headerName: 'Provinsi', minWidth: 160 },
    { field: 'kota', headerName: 'Kota', minWidth: 160 },
    { field: 'kecamatan', headerName: 'Kecamatan', minWidth: 160 },
    // { field: 'roles', headerName: 'Role', minWidth: 150, renderCell: StylingRole },
    // { field: 'created_at', headerName: 'Tanggal registrasi', minWidth: 160, renderCell: StylingDateRegister },
    // { field: 'user_status', headerName: 'Status', minWidth: 130, renderCell: StylingStatus },
    // { field: 'user_code', headerName: 'Kode user', minWidth: 130 },
  ]
  
  function StylingNameIdCode(params) {
    // console.log(params)
    return (
      <TextPrimarySecondary
        primaryText={params.row.nama}
        secondaryText={params.row.kode}
      />
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
            actionButtons={
              <>
                <Button size="large" fullWidth variant="contained" onClick={handleSubmit} >Tambah</Button>
              </>
            }
          >
            <FormControl variant="outlined" color="primary" fullWidth error={InputName.error}>
              <InputLabel htmlFor="input-1">{InputName.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputName.value}
                onChange={(e) => setInputName({...InputName, value: e.target.value})}
                label={InputName.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputTelephone.error}>
              <InputLabel htmlFor="input-1">{InputTelephone.label}</InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputTelephone.value}
                onChange={(e) => setInputTelephone({...InputTelephone, value: e.target.value})}
                label={InputTelephone.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputAddress.error}>
              <InputLabel htmlFor="input-3">{InputAddress.label}</InputLabel>
              <OutlinedInput
                id="input-3"
                type="text"
                value={InputAddress.value}
                onChange={(e) => setInputAddress({...InputAddress, value: e.target.value})}
                label={InputAddress.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputProvince.error}>
              <InputLabel htmlFor="input-4">{InputProvince.label}</InputLabel>
              <OutlinedInput
                id="input-4"
                type="text"
                value={InputProvince.value}
                onChange={(e) => setInputProvince({...InputProvince, value: e.target.value})}
                label={InputProvince.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputCity.error}>
              <InputLabel htmlFor="input-5">{InputCity.label}</InputLabel>
              <OutlinedInput
                id="input-5"
                type="text"
                value={InputCity.value}
                onChange={(e) => setInputCity({...InputCity, value: e.target.value})}
                label={InputCity.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputKecamatan.error}>
              <InputLabel htmlFor="input-6">{InputKecamatan.label}</InputLabel>
              <OutlinedInput
                id="input-6"
                type="text"
                value={InputKecamatan.value}
                onChange={(e) => setInputKecamatan({...InputKecamatan, value: e.target.value})}
                label={InputKecamatan.label}
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
