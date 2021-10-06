import React, { useState } from 'react'
import { Button, ButtonGroup, Card, CardContent, Collapse, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axiosBackend from '../../../Helper/axiosBackend';

const ROLES = [
  { value: 0, label: "Admin", },
  { value: 1, label: "Marketing Head", },
  { value: 2, label: "Marketing Officer", },
  { value: 3, label: "Management", },
  { value: 4, label: "Customer Relation", },
]
const OFFICES = [
  { value: 0, label: "Kantor Pusat", },
  { value: 1, label: "Jakarta Timur", },
  { value: 2, label: "Bekasi", },
  { value: 3, label: "Wilayah 1", },
]

export default function UMAcceptMenu(props) {
  const { data, reload, fromPage } = props;
  const { acceptBtnClick, setMenuAnchorEl } = props;
  const [Switch, setSwitch] = useState(false)

  const[InputRole, setInputRole] = useState({ value: '', error: false, disabled: false,})
  const[InputKantor, setInputKantor] = useState({ value: '', error: false, disabled: false,})
  // console.log(InputRole)

  const handleAcceptUser = () => {
    const config = { 
      target_email: data.email,
      user_status: 'Aktif',
      role: Switch?'External':InputRole.value,
      location: InputKantor.value,
    }
    console.warn(config)

    if (Switch) {
      SendData();
    }
    else {
      if (InputRole.value === '') {
        setInputRole({...InputRole, error: true})
      } else { 
        setInputRole({...InputRole, error: false})
      }
      if (InputKantor.value === '') {
        setInputKantor({...InputKantor, error: true})
      } else { 
        setInputKantor({...InputKantor, error: false})
      }
      if (InputRole.value !== '' && InputKantor.value !== '') {
        SendData();
      }
    }
  }

  const SendData = async () => {
    console.log("SEND DATA");
    await axiosBackend.post('/user-management', { 
      target_email: data.email,
      user_status: 'Aktif',
      role: Switch?'External':InputRole.value,
      location: Switch?'Not set':InputKantor.value,
    })
    .then((response) => {
      console.log('SendData', response.data)
      acceptBtnClick()
      setMenuAnchorEl(null)
    })
    .catch((err) => { console.log(err.response) })
  }

  return (
    <>
      <Card sx={{ width: 305, paddingBottom: 6, paddingTop: 1 }}>
        <CardContent sx={{ paddingBottom: 4 }}>
          <Stack direction="row" justifyContent="space-between" >
              <Typography variant="p" fontWeight={400} fontSize={15} color="tint.black.40" sx={{ marginY: 0.5 }}>{'Disetujui'}</Typography>
            <Button variant="contained" color="primary" sx={{ fontSize: 10 }} 
              onClick={handleAcceptUser}
            >
              {'Disetujui'}
            </Button>
          </Stack>
        </CardContent>
        <CardContent>
          <ButtonGroup disableElevation variant="contained" color="switch" fullWidth disableRipple sx={{ border: 1.5, borderColor: 'divider' }}>
            <Button sx={{ color: Switch?'tint.black.60':'primary.main', backgroundColor: Switch?'plainwhite.main':'tint.grey.20' }} onClick={() => setSwitch(false)} >Internal</Button>
            <Button sx={{ color: Switch?'primary.main':'tint.black.60', backgroundColor: Switch?'tint.grey.20':'plainwhite.main' }} onClick={() => setSwitch(true)} >External</Button>
          </ButtonGroup>
        </CardContent>
        {/* <button onClick={() => console.log(}>cek</button> */}
        <Collapse in={!Switch} timeout="auto" unmountOnExit >
          <CardContent>
            <Stack spacing={1}>
              <Autocomplete
                disablePortal
                id="asd1"
                options={ROLES}
                fullWidth
                // size="large"
                value={InputRole.value}
                onChange={(event, newValue) => {
                  setInputRole({...InputRole, value: newValue==null?'':newValue.label});
                }}
                // getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField error={InputRole.error} {...params} label="Role" />}
                popupIcon={<ChevronRightIcon />}
              />
              <Autocomplete
                disablePortal
                id="asd2"
                options={OFFICES}
                fullWidth
                // size="large"
                value={InputKantor.value}
                onChange={(event, newValue) => {
                  setInputKantor({...InputKantor, value: newValue==null?'':newValue.label});
                }}
                // getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} error={InputKantor.error} label="Kantor" />}
                popupIcon={<ChevronRightIcon />}
              />
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}
