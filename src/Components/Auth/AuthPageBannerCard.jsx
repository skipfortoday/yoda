import React from 'react'
import { Button, Card, CardActions, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router-dom';

export default function AuthPageBannerCard(props) {
  const { primaryText, secondaryText, buttonText, buttonLink } = props;
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const history = useHistory()

  const ButtonClick = () => {
    history.push(buttonLink)
  }

  return (
    <Card sx={{ height: "92vh", borderRadius: 3, backgroundColor: "primary.main" }} >
      <Box sx={{ backgroundColor: "#203756", position: 'relative' }} width="100%" height="89%" overflow="hidden">
        <img src='./images/web/possessed-photography-unsplash.png' alt="..." width="100%" height="100%" 
          style={{ filter: 'grayscale(92%)' }}
        />
        <Typography variant="h2" color='common.white'
          fontWeight={700} fontSize="64px"
          lineHeight="78px"
          sx={{
            position: 'absolute', top: 0,
            //  top: '148px', left: '90px', right: '90px',
            paddingTop: theme.spacing(upLg?12:upMd?6:4),
            paddingX: theme.spacing(upLg?8:upMd?6:4)
          }}
        >
          {primaryText}
        </Typography>
      </Box>
      <CardActions disableSpacing sx={{ paddingX: upLg?8:upMd?6:4, paddingY: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography lineHeight={'48px'} color="common.white">
            {secondaryText}
          </Typography>
          <Button variant="contained" color="secondary" 
            sx={{ minWidth: '116px', textTransform: 'capitalize' }}
            onClick={ButtonClick}
          >
            {buttonText}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}
