import React, { useState } from 'react'
import { Button, Popover, Stack } from '@mui/material';
import { Box } from '@mui/system';
import UMAcceptMenu from '../../Pages/Content/UserManagement/UMAcceptMenu'
import axiosBackend from '../../Helper/axiosBackend';

export default function AcceptingAction(props) {
  const { reload } = props;
  const { row, fromPage } = props;
  const { TEXTS } = props;
  // console.warn(row.email)
  const { redBtnClick, greenBtnClick } = props;
  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMainMenuOpen = Boolean(MenuanchorEl);
  const [Hide, setHide] = useState(true);

  const handleRejectorDeleteUser = async () => {
    if (fromPage==='UMWaiting') {
      const config = { 
        target_email: row.email,
        user_status: 'Rejected',
        role: 'Rejected',
        location: 'Not set',
      }
      console.log(config)
      await axiosBackend.post('/user-management', { 
        target_email: row.email,
        user_status: 'Rejected',
        role: 'Non Aktif',
        location: 'Not set',
      })
      .then((response) => {
        console.log(response.data)
        redBtnClick()
      })
      .catch((err) => {console.log(err.response) })
    }
    else if (fromPage==="UMRejected") {
      const config = { 
        target_email: row.email,
        user_status: 'Deleted',
        role: 'Deleted',
        location: 'Not set',
      }
      console.log(config)
      // SALAH GANTI NANTI
      // await axiosBackend.post('/user-management', { 
      //   target_email: row.email,
      //   user_status: 'Deleted',
      //   role: 'Deleted',
      //   location: 'Not set',
      // })
      // .then((response) => {
      //   console.log(response.data)
      //   redBtnClick()
      // })
      // .catch((err) => {console.log(err.response) })
      redBtnClick()
    }
  }

  return (
    <Box sx={{ width: '100%', minHeight: Hide?40:0 }} onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)} >
      <Stack sx={{ width: '100%' }} direction="row" spacing={2} justifyContent="flex-end" >
        <Box sx={{ display: Hide?'none' : 'block' }}>
          <Button variant="text" color="red20" size="small" onClick={handleRejectorDeleteUser}>{TEXTS?.redButton||'Ditolak'}</Button>
          <Button variant="outlined" color="primary" size="small" onClick={(e) => setMenuAnchorEl(e.currentTarget)}>{TEXTS?.greenButton||'Disetujui'}</Button>
          <Popover
            open={isMainMenuOpen}
            onClose={() => setMenuAnchorEl(null) }
            anchorEl={MenuanchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <UMAcceptMenu
              data={row}
              acceptBtnClick={greenBtnClick}
              setMenuAnchorEl={setMenuAnchorEl}
              reload={reload}
              fromPage={fromPage}
            />
          </Popover>
        </Box>
      </Stack>
    </Box>
  )
}
