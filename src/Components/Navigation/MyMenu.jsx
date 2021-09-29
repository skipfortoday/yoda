import React from 'react'
import { Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExtensionIcon from '@mui/icons-material/Extension';
import PollIcon from '@mui/icons-material/Poll';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import { useHistory } from 'react-router';



export default function MyMenu(props) {
  const history = useHistory()
  const { ActivePage } = props;

  const MENU_ITEMS = [
    { value: 0, label: 'Dashboard', url: '/dashboard', icon: <DesktopMacIcon sx={{ color: ActivePage===0?'primary.main':'tint.black.60' }} /> },
    { value: 1, label: 'Manajemen pengguna', url: '/manage-user', icon: <PeopleAltIcon sx={{ color: ActivePage===1?'primary.main':'tint.black.60' }} /> },
    { value: 2, label: 'Manajemen konten', url: '/manage-content', icon: <ExtensionIcon sx={{ color: ActivePage===2?'primary.main':'tint.black.60' }} /> },
    { value: 3, label: 'Laporan kinerja', url: '/performance-report', icon: <PollIcon sx={{ color: ActivePage===3?'primary.main':'tint.black.60' }} /> },
    { value: 4, label: 'Audit trail', url: '/audit-trail', icon: <YoutubeSearchedForIcon sx={{ color: ActivePage===4?'primary.main':'tint.black.60' }} /> },
  ]

  return (
    <Card sx={{ width: 305 }}>
      <CardContent sx={{ paddingBottom: 4 }}>
        <Typography variant="p" fontWeight={400} fontSize={15} color="tint.black.40">{'Menu'}</Typography>
      </CardContent>
      <CardContent>
        <List>
          { MENU_ITEMS?.map((mI, index) => (
            <ListItemButton key={index}
              sx={{
                color: ActivePage===index?'primary.main':'tint.black.60',
                backgroundColor: ActivePage===index?'tint.grey.20':'',
                borderRadius: 1, marginY: 1, padding: 2
              }}
              onClick={() => {
                history.push(mI.url)
              }}
            >
              <ListItemIcon>
                { mI.icon }
                {/* <InboxIcon sx={{ color: ActivePage===index?'primary.main':'tint.black.60' }} /> */}
              </ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600}>{mI.label}</Typography>} />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
