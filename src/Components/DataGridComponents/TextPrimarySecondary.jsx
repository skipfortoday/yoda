import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

export default function TextPrimarySecondary(props) {
  const { primaryText, secondaryText } = props;
  return (
    <Box>
      <Typography fontSize={14} color="tint.black.bold">{primaryText}</Typography>
      <Typography fontSize={14} color="text.secondary">{secondaryText}</Typography>
    </Box>
  )
}
