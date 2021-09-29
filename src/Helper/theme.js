import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#78C2B4',
      contrastText: '#fff'
    },
    secondary: {
      dark: "rgb(22, 38, 60)",
      light: "rgb(76, 95, 119)",
      main: '#203756',
      contrastText: '#fff'
    },
    oldPrimary: {
      dark: '#1565c0',
      light: '#42a5f5',
      main: '#1976d2',
      contrastText: '#fff'
    },
    oldSecondary: {
      dark: '#7b1fa2',
      light: '#ba68c8',
      main: '#9c27b0',
      contrastText: '#fff'
    },
    switch: {
      main: '#F5F6F7',
      contrastText: '#78C2B4'
    },
    plainwhite: {
      main: '#fff',
      contrastText: '#535353'
    },
    grey20: {
      main: '#F5F6F7',
      contrastText: '#A0A4A8'
    },
    grey50: {
      main: '#9A9EA7',
      // contrastText: '#9A9EA7'
    },
    black60: {
      main: '#A0A4A8',
      contrastText: '#fff'
    },
    mint20: {
      light: '#ecfdf3',
      main: '#E8FDF1',
      contrastText: '#78C2B4'
    },
    red20: {
      main: '#FF7171',
      contrastText: '#fff'
    },
    text: {
      primary: '#25282B',
      secondary: '#52575C'
    },
    tint: {
      black:{
        5: '#EEEEEE',
        10: '#E8E8E8',
        40: '#CACCCF',
        60: '#A0A4A8',
        80: '#52575C',
        100: '#25282B',
        bold: '#0D0A19',
      },
      white: '#ffffff',
      grey: {
        20: '#F5F6F7',
        40: '#9A9A9A',
        50: '#9A9EA7',
      },
      mint: {
        10: '#F2F9F8',
        20: '#E8FDF1',
        50: '#A2F3D9',
        90: '#78C2B4',
      },
      navy: {
        90: '#203756'
      },
      red: {
        10: '#FDE8EA',
        20: '#FF7171',
        50: '#CF212A',
      },
      yellow: '#F3BB1C'
    }
  },
  shape: {
    borderRadius: 8
  },
  typography:{
    fontFamily: "'Inter', 'Roboto','Helvetica','Arial',sans-serif"
  }
});