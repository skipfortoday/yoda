import React from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

export default function AvatarNameEmail(props) {
  const { name, email, profile_picture, clicked } = props;

  return (
    <ListItem alignItems="flex-start" onClick={clicked}>
      <ListItemAvatar sx={{ paddingY: 0.7, paddingX: 0, marginX: 0 }}>
        <Avatar alt={name} src={profile_picture} sx={{ width: 20, height: 20 }}/>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography fontWeight="bold" color="text.primary" fontSize={12} >{name}</Typography>}
        secondary={<Typography fontSize={12}>{email}</Typography>}
      />
    </ListItem>
  )
}
