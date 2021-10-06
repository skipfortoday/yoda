import React from 'react'
import { ListItem, ListItemText, Typography } from '@mui/material'
import { CountDatesDistance } from '../../Helper/TimeCounter';
import { format } from 'date-fns';


export default function DateRegister(props) {
  const { created_at, cli } = props;
  const Distances = CountDatesDistance(new Date(created_at));

  return (
    <ListItem>
      <ListItemText
      primary={<Typography fontSize={12} onClick={(e) => cli(e)}>{format(new Date(created_at), 'd MMMM yyyy')}</Typography>}
        secondary={<Typography fontSize={10}>
          {
            Distances.Days!==0?`${Distances.Days} hari lalu` :
            Distances.Hours!==0?`${Distances.Hours} jam lalu` :
            Distances.Minutes!==0?`${Distances.Minutes} menit lalu` :
            Distances.Seconds!==0?`${Distances.Seconds} detik lalu` :
            null
          }
        </Typography>}
      />
    </ListItem>
  )
}
