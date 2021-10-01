import React from 'react'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import AvatarNameEmail from '../../../Components/DataGridComponents/AvatarNameEmail';
import DateRegister from '../../../Components/DataGridComponents/DateRegister';
import AcceptingAction from '../../../Components/DataGridComponents/AcceptingAction';


export default function UMRejected(props) {
  const { data, reload } = props;
  // reload to refresh

  const DATAGRID_COLUMNS = [
    { field: 'index', headerName: '#' },
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name & email', minWidth: 300, renderCell: StylingNameEmail },
    { field: 'phone_number', headerName: 'No. Handphone', minWidth: 180 },
    { field: 'created_at', headerName: 'Tanggal registrasi', minWidth: 180, renderCell: StylingDateRegister },
    { field: 'action', headerName: '', flex: 1, minWidth: 300, renderCell: StylingAction },
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
