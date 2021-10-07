import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

export default function TextPrimarySecondary(props) {
  const { primaryText, secondaryText,clicked } = props;
  return (
    <Box>
      <Typography onClick={clicked} fontSize={14} color="tint.black.bold">{primaryText}</Typography>
      <Typography onClick={clicked} fontSize={14} color="text.secondary">{secondaryText}</Typography>
    </Box>
  )
}
