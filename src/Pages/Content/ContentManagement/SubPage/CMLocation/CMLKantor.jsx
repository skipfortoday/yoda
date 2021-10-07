import React, { useState, useEffect } from 'react'
import axiosBackend from '../../../../../Helper/axiosBackend'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import TextPrimarySecondary from '../../../../../Components/DataGridComponents/TextPrimarySecondary'
import { Button, FormControl, InputLabel, OutlinedInput, Popover, Select, MenuItem } from '@mui/material'
import DynamicContentMenu from '../../../../../Components/Menus/DynamicContentMenu'
import PopupEdit from "../../../../../Components/DataGridComponents/PopupEdit";
import DateRegister from '../../../../../Components/DataGridComponents/DateRegister'
import SingleLine from '../../../../../Components/DataGridComponents/SingleLine'

const INPUTS = [
  { label: 'Nama', value: '', error: false, disabled: false,},
  { label: 'Kode cabang', value: '', error: false, disabled: false,},
  { label: 'No. Telepon', value: '', error: false, disabled: false,},
  { label: 'Alamat', value: '', error: false, disabled: false,},
  { label: 'PIC', value: '', error: false, disabled: false,},
]

export default function CMLKantor(props) {
  const [Data, setData] = useState([])
  const [PICArr, setPICArr] = useState([])

  const { dataSort, reload } = props;

  const dataType = {
    "namaKantor": "nama_cabang",
    "kodeCabang": "kode_cabang",
    "nomerTelponKantor": "no_telepon",
    "alamatKantor": "alamat",
    "tanggalKantor": "tanggal_registrasi",
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
      if (dataSort === "namaKantorDesc") {
        sortDesc("namaKantor");
      }
      if (dataSort === "namaKantorAsc") {
        sortAsc("namaKantor");
      }
      if (dataSort === "kodeCabangDesc") {
        sortDesc("kodeCabang");
      }
      if (dataSort === "kodeCabangAsc") {
        sortAsc("kodeCabang");
      }
      if (dataSort === "nomerTelponKantorDesc") {
        sortDesc("nomerTelponKantor");
      }
      if (dataSort === "nomerTelponKantorAsc") {
        sortAsc("nomerTelponKantor");
      }
      if (dataSort === "alamatKantorDesc") {
        sortDesc("alamatKantor");
      }
      if (dataSort === "alamatKantorAsc") {
        sortAsc("alamatKantor");
      }
      if (dataSort === "tanggalKantorDesc") {
        sortDesc("tanggalKantor");
      }
      if (dataSort === "tanggalKantorAsc") {
        sortAsc("tanggalKantor");
      }
    }else{
      sortDesc("kodeCabang");
    }
  }, [dataSort]);

  useEffect(() => {LoadData(); LoadPIC() }, [])

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
    await axiosBackend.get('/cm/kantor')
    .then((response) => { 
      var tempData = response.data
      tempData.forEach((dat, idx) => {
        dat.index = idx + 1;
      });
      setData(tempData)
     }).catch((err) => {
      console.log(err, "err");
    })
  }

  async function LoadPIC() {
    await axiosBackend.get('/dropdown-pic')
    .then((response) => { 
      var tempData = response.data.pic
      // tempData.forEach((dat, idx) => {
      //   dat.index = idx + 1;
      // });
      console.log(tempData, "tempData");
      setPICArr(tempData)
     }).catch((err) => {
       console.log(err, "err");
     })
  }

  const { indexPage, ActiveSubPage } = props
  const { isMenuOpen } = props
  const { MenuanchorEl, setMenuAnchorEl } = props

  const [InputName, setInputName] = useState(INPUTS[0])
  const [InputCode, setInputCode] = useState(INPUTS[1])
  const [InputTelephone, setInputTelephone] = useState(INPUTS[2])
  const [InputAddress, setInputAddress] = useState(INPUTS[3])
  const [InputPIC, setInputPIC] = useState(INPUTS[4])
  
  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
      ResetInputs();
    }
  }

  function ResetInputs() {
    setInputName(INPUTS[0])
    setInputCode(INPUTS[1])
    setInputTelephone(INPUTS[2])
    setInputAddress(INPUTS[3])
    setInputPIC(INPUTS[4])
  }

  async function InsertData() {
    await axiosBackend.post('/cm/kantor/insert', {
      nama_cabang: InputName.value,
      no_telepon: InputTelephone.value,
      alamat: InputAddress.value,
      pic: InputPIC.value,
      kode_cabang: InputCode.value,
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
    { field: 'nama_cabang', headerName: 'Nama & Kode cabang', minWidth: 180, flex: 1, renderCell: StylingKantor },
    { field: 'no_telepon', headerName: 'No. Telepon', minWidth: 160, renderCell: StylingKantor },
    { field: 'alamat', headerName: 'Alamat', minWidth: 160, flex: 1, renderCell: StylingKantor },
    { field: 'pic', headerName: 'PIC', minWidth: 160, renderCell: StylingKantor },
    { field: 'tanggal_registrasi', headerName: 'Tanggal registrasi', minWidth: 160, renderCell: StylingKantor },
  ]

  function StylingKantor(params) {
    console.log(params.coldef, "PARAMSVALUE");
    return (
      <PopupEdit
        params={params}
        row={params.row}
        reload={reload}
        fromTable={params.field}
        fromPage={"CM"}
        dataSent={LoadData}
      />
    );
  }

  // function StylingNameIdCode(params) {
  //   return (
  //     <TextPrimarySecondary
  //       primaryText={params.row.nama_cabang}
  //       secondaryText={params.row.kode_cabang}
  //     />
  //   )
  // }

  // function StylingLongAddress(params) {
  //   return (
  //     <SingleLine Text={params.value} Width={params.colDef.computedWidth} />
  //   )
  // }

  // function StylingDateRegister(params) {
  //   return (
  //     <DateRegister created_at={params.row.tanggal_registrasi} />
  //   )
  // }

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
            <FormControl variant="outlined" color="primary" fullWidth error={InputCode.error}>
              <InputLabel htmlFor="input-2">{InputCode.label}</InputLabel>
              <OutlinedInput
                id="input-2"
                type="text"
                value={InputCode.value}
                onChange={(e) => setInputCode({...InputCode, value: e.target.value})}
                label={InputCode.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputTelephone.error}>
              <InputLabel htmlFor="input-3">{InputTelephone.label}</InputLabel>
              <OutlinedInput
                id="input-3"
                type="text"
                value={InputTelephone.value}
                onChange={(e) => setInputTelephone({...InputTelephone, value: e.target.value})}
                label={InputTelephone.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputAddress.error}>
              <InputLabel htmlFor="input-4">{InputAddress.label}</InputLabel>
              <OutlinedInput
                id="input-4"
                type="text"
                value={InputAddress.value}
                onChange={(e) => setInputAddress({...InputAddress, value: e.target.value})}
                label={InputAddress.label}
              />
            </FormControl>
            <FormControl variant="outlined" color="primary" fullWidth error={InputPIC.error}>
              <InputLabel htmlFor="input-5">{InputPIC.label}</InputLabel>
              {/* <OutlinedInput
                id="input-5"
                type="text"
                value={InputPIC.value}
                onChange={(e) => setInputPIC({...InputPIC, value: e.target.value})}
                label={InputPIC.label}
              /> */}
              <Select
                labelId="pic"
                id="pic"
                name="pic"
                placeholder="PIC"
              >
                {PICArr?.map((data, idx) => {
                  return (
                  <MenuItem value={data.id} key={idx} onClick={() => {
                    setInputPIC({...InputPIC, value: data.id})
                  }}>
                    {data.name}
                  </MenuItem>
                  )
                })}
              </Select>
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
