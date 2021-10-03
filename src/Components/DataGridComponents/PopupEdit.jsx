import React, { useState } from 'react'
import { Button, Popover, Stack,Typography } from '@mui/material';
import { Box } from '@mui/system';
import UMAcceptMenu from '../../Pages/Content/UserManagement/UMAcceptMenu'
import axiosBackend from '../../Helper/axiosBackend';
import UMEdit from "../../Pages/Content/UserManagement/UMEdit";
import AvatarNameEmail from "./AvatarNameEmail"

export default function PopupEdit(props) {
  const { reload } = props;
  const { row, fromTable } = props;
//   const { TEXTS } = props;
  // console.warn(row.email)
//   const { redBtnClick, greenBtnClick } = props;
  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMainMenuOpen = Boolean(MenuanchorEl);
//   const [Hide, setHide] = useState(true);

//   const handleRejectorDeleteUser = async () => {
//     if (fromPage==='UMWaiting') {
//       const config = { 
//         target_email: row.email,
//         user_status: 'Rejected',
//         role: 'Rejected',
//         location: 'Not set',
//       }
//       console.log(config)
//       await axiosBackend.post('/user-management', { 
//         target_email: row.email,
//         user_status: 'Rejected',
//         role: 'Non Aktif',
//         location: 'Not set',
//       })
//       .then((response) => {
//         console.log(response.data)
//         redBtnClick()
//       })
//       .catch((err) => {console.log(err.response) })
//     }
//     else if (fromPage==="UMRejected") {
//       // const config = { 
//       //   target_email: row.email,
//       //   user_status: 'Deleted',
//       //   role: 'Deleted',
//       //   location: 'Not set',
//       // }
//       // SALAH GANTI NANTI
//       // redBtnClick()

//       await axiosBackend.get(`/um/delete/${row.id}`,)
//       .then((response) => {
//         console.log(response.data)
//         redBtnClick()
//       })
//       .catch((err) => {console.log(err.response) })
//     }
//   }

  return (
    <Box sx={{ width: '100%', minHeight: 40 }} >
      <Stack sx={{ width: '100%' }} direction="row" spacing={2} justifyContent="flex-start">
        <Box sx={{ display: 'block' }}>
          {/* <Button variant="text" color="red20" size="small" onClick={handleRejectorDeleteUser}>{TEXTS?.redButton||'Ditolak'}</Button>
          <Button variant="outlined" color="primary" size="small" onClick={(e) => setMenuAnchorEl(e.currentTarget)}>{TEXTS?.greenButton||'Disetujui'}</Button> */}
          {
          fromTable === "name" ? 
            <AvatarNameEmail
                name={row.name}
                email={row.email}
                profile_picture={row.profile_picture}
                clicked={(e) => setMenuAnchorEl(e.currentTarget)}
                style={{ alignItems:"flex-end" }}
                /> : 
            <></>
          }
          {
              fromTable === "role" ?
              <Typography fontSize={14} onClick={(e) => setMenuAnchorEl(e.currentTarget)}>{props.value}</Typography> :
              <></>
          }
          {
              fromTable === "location" ?
              <Typography fontSize={14} onClick={(e) => setMenuAnchorEl(e.currentTarget)}>{row.location}</Typography> :
              <></>
          }
          {
              fromTable === "phone_number" ?
              <Typography fontSize={14} onClick={(e) => setMenuAnchorEl(e.currentTarget)}>{row.phone_number}</Typography> :
              <></>
          }
          {
              fromTable === "user_status" ?
              <Typography
                fontSize={14}
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                color={
                props.value.toLowerCase() === "active"
                    ? "success.main"
                    : props.value.toLowerCase() === "aktif"
                    ? "success.main"
                    : props.value.toLowerCase() === "not active"
                    ? "tint.yellow"
                    : props.value.toLowerCase() === "tidak aktif"
                    ? "tint.yellow"
                    : props.value.toLowerCase() === "non aktif"
                    ? "tint.yellow"
                    : "text.primary"
                }
              >
                {props.value}
              </Typography>:
              <></>
          }
          <Popover
            open={isMainMenuOpen}
            onClose={() => setMenuAnchorEl(null)}
            anchorEl={MenuanchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <UMEdit
              data={row}
              field={fromTable}
              // acceptBtnClick={() => {}}
              setMenuAnchorEl={setMenuAnchorEl}
              reload={reload}
              // fromPage={fromPage}
            />
           </Popover>
        </Box>
      </Stack>
    </Box>
  )
}
