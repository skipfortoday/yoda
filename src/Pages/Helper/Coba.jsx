import React, { useState, useEffect } from 'react'
import { Avatar, Button, ButtonGroup, Card, CardActions, CardContent, Container, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { LoadAllUsersData } from '../Content/UserManagement/apis';
import axiosBackend from '../../Helper/axiosBackend';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import auth from '../../Helper/auth';
import { format } from 'date-fns';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'The Lord of the Rings: The Return of the King', year: 2003, },
]

export default function CobaPage() {
  const [active, setactive] = useState(0)
  // console.log(LoadAllUsersData())
  const userNow = auth.user
  console.log(auth.user)

  const [Switch, setSwitch] = useState(false)

  const [OpenHistory, setOpenHistory] = useState(false)

  const Riwayat_Data = [
    { index: 0, location: 'Bekasi', datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"), deviceName: 'Android 9', icon: 'mac' },
    { index: 1, location: 'Bekasi', datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"), deviceName: 'Android 9', icon: 'mac' },
    { index: 2, location: 'Bekasi', datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"), deviceName: 'Android 9', icon: 'mac' },
    { index: 3, location: 'Bekasi', datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"), deviceName: 'Android 9', icon: 'mac' },
    { index: 4, location: 'Bekasi', datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"), deviceName: 'Android 9', icon: 'mac' },
  ]

  useEffect(() => {
    async function LoadUsers() {
      await axiosBackend.get('/users')
      .then((response) => { console.log(response.data) })
      .catch((err) => { console.warn(err.response) })
    }
    LoadUsers();

    // async function LoadSelfData() {
    //   await axiosBackend.get('/user-profile')
    //   .then((response) => { console.log(response) })
    //   .catch((err) => { console.warn(err.response) })
    // }
    // LoadSelfData();

    // async function LoadUnit() {
    //   await axiosBackend.get('/unit')
    //   .then((response) => { console.log(response.data) })
    //   .catch((err) => { console.warn(err.response) })
    // }
    // LoadUnit();
  }, [])

  return (
    <>
      <Container maxWidth="sm" sx={{ paddingY: 10 }} >
        <Card sx={{ width: 280, paddingBottom: 4 }}>
          <CardContent sx={{ paddingY: 3 }}>
            <Typography variant="p" fontSize={15} color="tint.grey.40">{'Tambah Baru'}</Typography>
          </CardContent>
          <CardContent>
            <Stack spacing={1}>
              <Autocomplete
                disablePortal
                id="asd1"
                options={top100Films}
                fullWidth
                size="large"
                renderInput={(params) => <TextField {...params} label="Movie" />}
                popupIcon={<ChevronRightIcon />}
              />
              <Autocomplete
                disablePortal
                id="asd2"
                options={top100Films}
                fullWidth
                size="large"
                renderInput={(params) => <TextField {...params} label="Movie" />}
                popupIcon={<ChevronRightIcon />}
              />
              <Autocomplete
                disablePortal
                id="asd3"
                options={top100Films}
                fullWidth
                size="large"
                renderInput={(params) => <TextField {...params} label="Movie" />}
                popupIcon={<ChevronRightIcon />}
              />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  )

  return (
    <>
      <Container maxWidth="sm" sx={{ paddingY: 10 }} >
        <Card sx={{ width: 329 }}>
          <CardContent sx={{ paddingBottom: 1.5 }}>
            <Typography variant="p" fontSize={14} color="tint.grey.40">{'Profil'}</Typography>
            <Divider />
          </CardContent>
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Avatar src="./images/logo.png" sx={{ width: 110, height: 110 }} />
              <Typography fontWeight={700} fontSize={22} color="text.primary" sx={{ paddingTop: 1}}>{userNow.name?.split(" ")[0]}</Typography>
              <Typography fontWeight={400} fontSize={12} color="tint.black.60">{'#03090'}</Typography>
            </Stack>
          </CardContent>
          <CardContent>
            <Stack>
              <Box paddingBottom={3}>
                <Typography fontSize={12} color="tint.black.60" sx={{ marginBottom: 0.5 }}>Nama Lengkap Sesuai KTP</Typography>
                <Typography fontWeight={600} fontSize={14} color="tint.black.bold" sx={{ marginBottom: 1.5 }}>{userNow.name}</Typography>
                <Divider />
              </Box>
              <Box paddingBottom={3}>
                <Typography fontSize={12} color="tint.black.60" sx={{ marginBottom: 0.5 }}>Phone number</Typography>
                <Typography fontWeight={600} fontSize={14} color="tint.black.bold" sx={{ marginBottom: 1.5 }}>{userNow.phone_number}</Typography>
                <Divider />
              </Box>
              <Box paddingBottom={3}>
                <Typography fontSize={12} color="tint.black.60" sx={{ marginBottom: 0.5 }}>Role</Typography>
                <Typography fontWeight={600} fontSize={14} color="tint.black.bold" sx={{ marginBottom: 1.5 }}>Manajemen</Typography>
                <Divider />
              </Box>
              <Box paddingBottom={3}>
                <Typography fontSize={12} color="tint.black.60" sx={{ marginBottom: 0.5 }}>Kantor</Typography>
                <Typography fontWeight={600} fontSize={14} color="tint.black.bold" sx={{ marginBottom: 1.5 }}>{userNow.location}</Typography>
                <Divider />
              </Box>
            </Stack>
            <Stack alignItems="center" sx={{ paddingX: 5 }}>
              <Typography fontSize={12} color="tint.grey.50" textAlign="center">{"Hubungi Admin"}</Typography>
              <Typography fontSize={12} color="tint.grey.50" textAlign="center">{"jika informasi Akun tidak sesuai"}</Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button variant="text" size="small" color="grey50" onClick={() => setOpenHistory(!OpenHistory)}>Riwayat Masuk</Button>
          </CardActions>
          <Collapse in={OpenHistory} timeout="auto">
            <CardContent>
              <Stack spacing={1}>
                { Riwayat_Data?.map((rd, index) => (
                  <Box key={index} paddingBottom={1.5}>
                    <Stack direction="row" spacing={2} sx={{ paddingBottom: 1.5 }}>
                      <Avatar variant="rounded" sx={{ backgroundColor: '#FFFFFF', color: "#9A9EA7", border: 1, borderColor: 'divider' }}>
                        { rd.icon==='mac'? <LaptopMacIcon sx={{ width: 22, height: 22 }} /> : null }
                      </Avatar>
                      <Box>
                        <Typography>{rd.location} . {rd.datetime}</Typography>
                        <Typography fontWeight={600} fontSize={14} color="tint.black.bold">{rd.deviceName}</Typography>
                      </Box>
                    </Stack>
                    <Divider />
                  </Box>
                )) }
              </Stack>
            </CardContent>
          </Collapse>
        </Card>
      </Container>
    </>
  )

  return (
    <>
      <Container maxWidth="sm" sx={{ paddingY: 10 }} >
        <Card sx={{ width: 305, paddingBottom: 5, paddingTop: 1 }}>
          <CardContent sx={{ paddingBottom: 4 }}>
            <Stack direction="row" justifyContent="space-between" >
                <Typography variant="p" fontWeight={400} fontSize={15} color="tint.black.40" sx={{ marginY: 0.5 }}>{'Disetujui'}</Typography>
              <Button variant="contained" color="primary" sx={{ fontSize: 10 }}>
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
          <CardContent>
            <Stack spacing={1}>
              <Autocomplete
                disablePortal
                id="asd1"
                options={top100Films}
                fullWidth
                size="large"
                renderInput={(params) => <TextField {...params} label="Movie" />}
                popupIcon={<ChevronRightIcon />}
              />
              <Autocomplete
                disablePortal
                id="asd2"
                options={top100Films}
                fullWidth
                size="large"
                renderInput={(params) => <TextField {...params} label="Movie" />}
                popupIcon={<ChevronRightIcon />}
              />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  )
  
  return (
    <>
      <Container maxWidth="sm" sx={{ paddingY: 10 }} >
        <Card sx={{ width: 305 }}>
          <CardContent sx={{ paddingBottom: 4 }}>
            <Typography variant="p" fontWeight={400} fontSize={15} color="tint.black.40">{'Menu'}</Typography>
          </CardContent>
          {/* <Divider /> */}
          <CardContent>
            <List>
              {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text} selected={index===0}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))} */}
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItemButton key={index}
                  // selected={index === 0}
                  sx={{
                    color: active===index?'primary.main':'tint.black.60',
                    backgroundColor: active===index?'tint.grey.20':'',
                    borderRadius: 1, marginY: 1, padding: 2
                  }}
                  onClick={() => setactive(index)}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon sx={{ color: active===index?'primary.main':'tint.black.60' }} /> : <MailIcon sx={{ color: active===index?'primary.main':'tint.black.60' }} />}
                  </ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={600}>{text}</Typography>} />
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
