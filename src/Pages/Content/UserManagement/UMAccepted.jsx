import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import AvatarNameEmail from '../../../Components/DataGridComponents/AvatarNameEmail';
import DateRegister from '../../../Components/DataGridComponents/DateRegister';
import { Button, Stack, Typography } from '@mui/material';



export default function UMAccepted(props) {
  console.log('props UMAccepted', props)
  const { data, reload } = props;
  const [ActiveRole, setActiveRole] = useState(0)

  const [CurentData, setCurentData] = useState([])
  const [CurentDataFiltered, setCurentDataFiltered] = useState([])

  useEffect(() => { handleChangeTab(0) }, [])


  const handleChangeTab = (newTabIndex) => { 
    setActiveRole(newTabIndex);
    var tempData = [];
    var filteredData = data?.filter((data) => {
      if (newTabIndex===0) return data?.role?.toString().toLowerCase() !== 'external';
      else if (newTabIndex===1) return data?.role?.toString().toLowerCase() === 'external';
      // else return data.id === 1;
    })

    filteredData.forEach((data, idx) => {
      tempData.push({...data, index: idx+1})
    })
    console.log('tempData', tempData)
    setCurentData(tempData)
    setCurentDataFiltered(tempData)
    // setCurentData(data)
  }

  const DATAGRID_COLUMNS = [
    { field: 'index', headerName: '#' },
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name & email', minWidth: 300, flex: 1, renderCell: StylingNameEmail },
    { field: 'phone_number', headerName: 'No. Handphone', minWidth: 160 },
    { field: 'role', headerName: 'Role', minWidth: 150, renderCell: StylingRole },
    { field: 'location', headerName: 'Kantor', minWidth: 160 },
    { field: 'created_at', headerName: 'Tanggal registrasi', minWidth: 160, renderCell: StylingDateRegister },
    { field: 'user_status', headerName: 'Status', minWidth: 130, renderCell: StylingStatus },
    { field: 'user_code', headerName: 'Kode user', minWidth: 130 },
  ]
  
  function StylingNameEmail(params) {
    return (
      <AvatarNameEmail
        name={params.row.name}
        email={params.row.email}
        profile_picture={params.row.profile_picture}
      />
    )
  }
  
  function StylingDateRegister(params) {
    return (
      <DateRegister created_at={params.row.created_at} />
    )
  }

  function StylingRole(params) {
    return (
      <Typography
        fontSize={14}>
        {params.value}
      </Typography>
    )
  }
  
  function StylingStatus(params) {
    return (
      <Typography
        fontSize={14} 
        color={
          params.value.toLowerCase() === "active"?"success.main" :
          params.value.toLowerCase() === "aktif"?"success.main" :
          params.value.toLowerCase() === "not active"?"tint.yellow" :
          params.value.toLowerCase() === "tidak aktif"?"tint.yellow" :
          "text.primary"
        }
      >
        {params.value}
      </Typography>
    )
  }
  
  const TABS = [
    { index: 0, label: 'Internal' },
    { index: 1, label: 'External' },
  ]

  const filterData = () => {
    console.log('CurentData', CurentData);
    if(CurentData.length > 0){
      if(props.dataFilter === 'Reset'){
        setCurentDataFiltered(CurentData)
      } else {
        var aquaticCreatures =  CurentData.filter(function(item) {
          return item.location === props.dataFilter;
        });
        
        // console.log(aquaticCreatures);
        setCurentDataFiltered(aquaticCreatures)
        console.log('aquaticCreatures', aquaticCreatures);
      }
    }
  }

  useEffect(() => {
    if(props.dataFilter){
      filterData()
      // if(props.dataFilter !== ''){
      //   filterData()
      // }
    }
  }, [props.dataFilter])


  return (
    <>
      {/* <button onClick={() => filterData()}>cek</button> */}
      <Stack direction="row" spacing={1.5} sx={{ paddingBottom: 3 }}>
        { TABS?.map((tab, index) => (
          <Button
            key={index}
            variant="contained" size="large"
            color={ActiveRole===index?"mint20":"grey20"}
            onClick={() => { handleChangeTab(index) }}
          >
            {tab.label}
          </Button>
        )) }
      </Stack>
      <Box fullWidth sx={{ maxHeight: '70vh', height: '70vh'}}>
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={CurentDataFiltered}
          checkboxSelection
          disableColumnResize={false}
          disableSelectionOnClick
          // onSelectionModelChange={(ids) => {
          //   const selectedIDs = new Set(ids);
          //   const selectedRowData = CurentDataFiltered.filter((row) =>
          //     selectedIDs.has(row.id.toString())
          //   )
          //   console.log(selectedRowData);
          // }}
          onSelectionModelChange={(rows) => console.log(rows)}
          onCellClick={() => console.log('click')}
        />
      </Box>
    </>
  )
}
