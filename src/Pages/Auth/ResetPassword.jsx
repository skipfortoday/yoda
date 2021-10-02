import React, { useState } from 'react'
import { Box } from '@mui/system';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import auth from '../../Helper/auth'
import AuthPageBannerCard from '../../Components/Auth/AuthPageBannerCard';

import EmailIcon from '@mui/icons-material/Email';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axiosBackend from '../../Helper/axiosBackend';
import { CheckEmail } from '../../Helper/RegexHelper';

const TEXTS = {
  main: {
    primary: 'Atur apa saja, dengan siapa saja, dimana saja',
    secondary: 'Belum punya akun?',
    button: 'Daftar'
  },
  form: {
    header1: 'Ubah kata sandi Anda',
    header2: 'Masukan kata sandi yang baru',
    email: 'Email',
    password: 'Kata sandi',
    confirmPassword: 'Konfirmasi Kata sandi',
    remember: 'Ingat saya',
    forgotPassword: 'Lupa kata sandi?',
    submitButton: 'Ubah kata sandi'
  }
}

export default function ResetPage() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const history = useHistory()
  const spaceBetween = upLg?16:upMd?8:0;

  const [InputEmail, setInputEmail] = useState({ value: '', error: false, disabled: false, })
  const [InputPassword, setInputPassword] = useState({ value: '', error: false, disabled: false, visible: false})
  const [InputConfirmPassword, setInputConfirmPassword] = useState({ value: '', error: false, disabled: false, visible: false})
  
  const handleResetBtnClick = () => {
    let isPassed = true
    if (InputEmail.value==='' || InputEmail.value.length <= 0 || !CheckEmail(InputEmail.value)) {
      setInputEmail({...InputEmail, error: true})
    } else setInputEmail({...InputEmail,error: false})
    if (InputPassword.value==='' || InputPassword.value.length <= 0) {
      setInputPassword({...InputPassword, error: true})
    } else setInputPassword({...InputPassword,error: false})

    if (InputEmail.value==='') { isPassed = false; }
    if (InputEmail.value.length <= 0) { isPassed = false; }
    if (!CheckEmail(InputEmail.value)) { isPassed = false; }
    if (InputPassword.value==='') { isPassed = false; }
    if (InputPassword.value.length <= 0) { isPassed = false; }

    if (isPassed) handleReset()
  }

  const handleReset = async () => {
    await axiosBackend.post('/reset-password',{
      email: InputEmail.value,
      password: InputPassword.value,
      password_confirmation: InputConfirmPassword.value
    })
    .then((response) =>{ 
      console.log('res reset', response)
      if(response.data.message === "Password Successfully Changed"){
        history.push('/login')
      } 
      // setInputEmail({...InputEmail, error: false})
      // setInputPassword({...InputPassword, error: false})
      // auth.login(response.data)
      // history.push('/dashboard')
    })
    .catch((err) => { 
      if (err.response.status === 401) {
        setInputEmail({...InputEmail, error: true})
        setInputPassword({...InputPassword, error: true})
      }
      console.warn(err.response)
    })
  }
  
  return (
    <Box component="section" 
      height={"100vh"}
      padding={4}
      position={"relative"}
    >
      <Grid container>
        { upMd ? (
          <>
            <Grid item xs={12} md={6}>
              <Box paddingRight={Math.ceil(spaceBetween/2)}>
                <AuthPageBannerCard
                  primaryText={TEXTS.main.primary}
                  secondaryText={TEXTS.main.secondary}
                  buttonText={TEXTS.main.button}
                  buttonLink='/register'
                />
              </Box>
            </Grid>
          </>
        ) : null }
        <Grid item xs={12} md={6}>
          <Box paddingLeft={upMd?Math.ceil(spaceBetween/2):0}>
            <Stack direction="column" sx={{ paddingY: 2, marginBottom: upMd?8:0 }} alignItems="center">
            <img src="./images/web/Logo_Yodacentral.png" alt="Yodacentral" width={upMd?"211px":"375px"} />
              { upMd? (
                <>
                  <Typography variant="div" fontWeight="bold" fontSize={36}>{TEXTS.form.header1}</Typography>
                  <Typography variant="div" fontSize={14} color="text.secondary">{TEXTS.form.header2}</Typography>
                </>
              ) : null }
            </Stack>
            <Stack direction="column" sx={{ paddingX: upLg?20:upMd?10:2 }} alignItems="center" spacing={1.5}>
              <FormControl variant="outlined" color="primary" fullWidth
                error={InputEmail.error}
              >
                <InputLabel htmlFor="login-form-email">{TEXTS.form.email}</InputLabel>
                <OutlinedInput
                  id="login-form-email"
                  type="email"
                  value={InputEmail.value}
                  onChange={(e) => setInputEmail({...InputEmail, value: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      { InputEmail.disabled? ( <BlockIcon /> )
                        : InputEmail.value===''? ( <EmailIcon /> )
                        : InputEmail.value!==''? (
                          <IconButton edge="end"
                            onClick={() => setInputEmail({...InputEmail, value: ''})}
                          >
                            <CancelIcon />
                          </IconButton>
                        )
                        : null
                      }
                    </InputAdornment>
                  }
                  label={TEXTS.form.email}
                />
                {/* <FormHelperText>Error Message</FormHelperText> */}
              </FormControl>
              <FormControl variant="outlined" color="primary" fullWidth 
                error={InputPassword.error}
              >
                <InputLabel htmlFor="login-form-password">{TEXTS.form.password}</InputLabel>
                <OutlinedInput
                  id="login-form-password"
                  type={InputPassword.visible?"text":"password"}
                  value={InputPassword.value}
                  onChange={(e) => setInputPassword({...InputPassword, value: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      { InputPassword.disabled? ( <BlockIcon /> )
                        : InputPassword.value===''? ( <LockRoundedIcon /> )
                        :  (
                          <IconButton edge="end"
                            onClick={() => setInputPassword({...InputPassword, visible: !InputPassword.visible}) }
                          >
                            { InputPassword.visible? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        )
                      }
                    </InputAdornment>
                  }
                  label={TEXTS.form.password}
                />
              </FormControl>
              <FormControl variant="outlined" color="primary" fullWidth 
                error={InputConfirmPassword.error}
              >
                <InputLabel htmlFor="login-form-password">{TEXTS.form.confirmPassword}</InputLabel>
                <OutlinedInput
                  id="login-form-password"
                  type={InputConfirmPassword.visible?"text":"password"}
                  value={InputConfirmPassword.value}
                  onChange={(e) => setInputConfirmPassword({...InputConfirmPassword, value: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      { InputConfirmPassword.disabled? ( <BlockIcon /> )
                        : InputConfirmPassword.value===''? ( <LockRoundedIcon /> )
                        :  (
                          <IconButton edge="end"
                            onClick={() => setInputConfirmPassword({...InputConfirmPassword, visible: !InputConfirmPassword.visible}) }
                          >
                            { InputConfirmPassword.visible? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        )
                      }
                    </InputAdornment>
                  }
                  label={TEXTS.form.confirmPassword}
                />
              </FormControl>
              <FormControl fullWidth sx={{ paddingY: 2 }}>
                <Button variant="contained" color="primary" size="large" onClick={handleResetBtnClick}>{TEXTS.form.submitButton}</Button>
              </FormControl>
              { !upMd? (
                <Typography variant="div" color="text.primary">
                  {TEXTS.main.secondary}{' '}
                  <Link to="/register">
                    <Typography variant="div" fontWeight={"bold"}>{TEXTS.main.button}</Typography>
                  </Link>
                </Typography>
              ) : null }
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
