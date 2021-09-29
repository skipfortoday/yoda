import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

export default function SingleLine(props) {
  const { Text } = props;
  return (
    <Box>
      <Typography fontSize={14} color="tint.black.bold">{Text}</Typography>
    </Box>
  )
}
