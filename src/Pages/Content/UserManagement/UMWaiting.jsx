import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import AvatarNameEmail from '../../../Components/DataGridComponents/AvatarNameEmail';
import DateRegister from '../../../Components/DataGridComponents/DateRegister';
import AcceptingAction from '../../../Components/DataGridComponents/AcceptingAction';
// import MaterialTable from 'material-table'
// import { TableRow } from '@mui/material';

export default function UMWaiting(props) {
  console.log('props wait', props)
  // const { data, reload } = props;
  const { reload } = props;
  const [data, setdata] = useState(props.data)
  useEffect(() => { setdata(props.data) }, [props.data])
  
  // reload to refresh

  const DATAGRID_COLUMNS = [
    { field: 'index', headerName: 'ID', sortable: false, filterable: false },
    // { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name & email', minWidth: 300, renderCell: StylingNameEmail, sortable: false, filterable: false },
    { field: 'phone_number', headerName: 'No. Handphone', minWidth: 180, sortable: false, filterable: false },
    { field: 'created_at', headerName: 'Tanggal registrasi', minWidth: 180, renderCell: StylingDateRegister, sortable: false, filterable: false },
    { field: 'action', headerName: '', flex: 1, minWidth: 300, renderCell: StylingAction, sortable: false, filterable: false },
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
  
  function StylingAction(params) {
    const TEXTS = { greenButton: 'Disetujui', redButton: 'Ditolak' }
    return (
      <AcceptingAction
        row={params.row} TEXTS={TEXTS}
        redBtnClick={handleRejectUser}
        greenBtnClick={handleAcceptUser}
        reload={reload} fromPage={"UMWaiting"}
      />
    )
  }

  const handleAcceptUser = () => {
    // Acc user request here
    // console.log('reloading Acc')
    reload()
  }

  const handleRejectUser = () => {
    // Reject user request here
    // console.log('reloading Reject')
    reload()
  }

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

  const cekD = () => {
    console.log('asd')
  }
  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <>
      {/* <button onClick={() => myFunctionAsc()} >name asc</button>
      <button onClick={() => myFunctionDesc()} >name desc</button> */}
      <Box fullWidth sx={{ maxHeight: '80vh', height: '80vh'}}>
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={data}
          selectRow={()=>console.log('hj')}
          disableColumnResize={false}
          disableSelectionOnClick
          disableColumnFilter
          // selectionChange={cekD}
          checkboxSelection
          // onSelectionModelChange={(rows) => console.log(rows)}
          // onSelectionChange={(rows) => console.log(rows)}
          // onCellClick={() => console.log('click')}
          // selectionModel={SelectedItems}
          // onSelectionModelChange={(newModel) => console.log(newModel)}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            console.log('newSelectionModel', newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </Box>
    </>
  )
}
