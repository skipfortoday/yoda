import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import AvatarNameEmail from '../../../Components/DataGridComponents/AvatarNameEmail';
import DateRegister from '../../../Components/DataGridComponents/DateRegister';
import AcceptingAction from '../../../Components/DataGridComponents/AcceptingAction';


export default function UMRejected(props) {
  const { reload } = props;
  const [data, setdata] = useState(props.data)
  // reload to refresh

  const DATAGRID_COLUMNS = [
    { field: 'index', headerName: '#' },
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Nama & email', minWidth: 300, renderCell: StylingNameEmail },
    { field: 'phone_number', headerName: 'No. Handphone', minWidth: 180 },
    { field: 'created_at', headerName: 'Tanggal registrasi', minWidth: 180, renderCell: StylingDateRegister },
    { field: 'action', headerName: '', flex: 1, minWidth: 300, renderCell: StylingAction },
  ]

  function myFunctionDesc() {
    const mydata = [...data].sort(function(a, b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
    setdata(mydata)
    console.log('mydata', mydata)
  }

  function myFunctionAsc() {
    const mydata = [...data].sort(function(a, b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    data.map((item) => {
      console.log('item', item.name)
    })
    setdata(mydata)
    console.log('mydata', mydata)
  }

  function sortHpDesc() {
    const mydata = [...data].sort(function(a, b){
      let x = a.phone_number;
      let y = b.phone_number;
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
    setdata(mydata)
    console.log('mydata', mydata)
  }

  function sortHpAsc() {
    const mydata = [...data].sort(function(a, b){
      let x = a.phone_number;
      let y = b.phone_number;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    data.map((item) => {
      console.log('item', item.name)
    })
    setdata(mydata)
    console.log('mydata', mydata)
  }

  function sortDateAsc() {
    const mydata = [...data].sort((a, b) => (new Date(a.created_at)) - (new Date(b.created_at)))

    setdata(mydata)
  }

  function sortDateDesc() {
    const mydata = [...data].sort((a, b) => (new Date(b.created_at)) - new Date(a.created_at))

    setdata(mydata)
  }

  // const [SelectedItems, setSelectedItems] = useState([])

  // console.warn(SelectedItems)

  useEffect(() => {
    if(props.dataSort){
      if(props.dataSort === "nameDesc"){
        myFunctionDesc()
      }
      if(props.dataSort === "nameAsc"){
        myFunctionAsc()
      }
      if(props.dataSort === "hpAsc"){
        sortHpAsc()
      }
      if(props.dataSort === "hpDesc"){
        sortHpDesc()
      }
      if(props.dataSort === "dateAsc"){
        sortDateAsc()
      }
      if(props.dataSort === "dateDesc"){
        sortDateDesc()
      }
    }
  }, [props.dataSort])
  
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
  
  function StylingAction(params) {
    const TEXTS = { greenButton: 'Disetujui', redButton: 'Hapus' }
    return (
      <AcceptingAction
        row={params.row} TEXTS={TEXTS}
        redBtnClick={handleDeleteUser}
        greenBtnClick={handleAcceptUser}
        reload={reload} fromPage={"UMRejected"}
      />
    )
  }

  const handleAcceptUser = () => {
    // Acc user request here
    // console.log('reloading Acc')
    reload()
  }

  const handleDeleteUser = () => {
    // Del user request here
    // console.log('reloading Del')
    reload()
  }

  return (
    <Box fullWidth sx={{ maxHeight: '80vh', height: '80vh'}}>
      <DataGrid
        columns={DATAGRID_COLUMNS}
        rows={data}
        checkboxSelection
        disableColumnResize={false}
        disableSelectionOnClick
      />
    </Box>
  )
}
