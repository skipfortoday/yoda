import React from 'react'
import { Card, CardActions, CardContent, Stack, Typography } from '@mui/material'

export default function DynamicContentMenu(props) {
  const { header } = props
  const { children } = props
  const { actionButtons } = props

  return (
    <>
      <Card sx={{ width: 280, paddingBottom: 1 }}>
        <CardContent sx={{ paddingY: 3 }}>
          <Typography variant="p" fontSize={15} color="tint.grey.40">{header}</Typography>
        </CardContent>
        <CardContent sx={{ paddingBottom: 4 }}>
          <Stack spacing={1}>
            { children }
          </Stack>
        </CardContent>
        <CardActions>
          { actionButtons }
        </CardActions>
      </Card>
    </>
  )
}
