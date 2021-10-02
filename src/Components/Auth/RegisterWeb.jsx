import React, { useState } from 'react'
import { Box } from '@mui/system';
import { Button, Collapse, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthPageBannerCard from './AuthPageBannerCard';

import EmailIcon from '@mui/icons-material/Email';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import { CheckEmail, CheckNumber } from '../../Helper/RegexHelper';
import axiosBackend from '../../Helper/axiosBackend';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';


export default function RegisterWeb(props) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const history = useHistory()
  
  const { TEXTS } = props;
  const { InputEmail, setInputEmail } = props;
  const { InputPassword, setInputPassword } = props;
  const { InputCPassword, setInputCPassword } = props;
  const { FullName, setFullName } = props;
  const { PhoneNumber, setPhoneNumber } = props;
  const { spaceBetween } = props;

  
  const [ActiveSection, setActiveSection] = useState(0)
  const [emailExist, setEmailExist] = useState(false)

  function handleNextClick() {
    setActiveSection(ActiveSection + 1)
  }
  function handleResetClick() {
    setActiveSection(0)
  }

  async function checkEmailExist() {
    const thisToken = sessionStorage.getItem('token')
    console.log('thisToken', thisToken)
    const baseURL= `https://yodacentral.herokuapp.com/api`
    try {
      const data = await axios.post(`${baseURL}/check-email`, {
        email: InputEmail,
      })
      console.log('data', data)
      handleNextClick()
    } catch (err){
      console.log('not passed')
      setEmailExist(true)
      setTimeout(()=>{
        setEmailExist(false)
      }, 3000)
      console.log('err', err)
    }
  }

  function handleValidateFirstPage () {
    let isPassed = true
    if (InputEmail.value==='' || InputEmail.value.length <= 0 || !CheckEmail(InputEmail.value)) {
      setInputEmail({...InputEmail, error: true})
    } else setInputEmail({...InputEmail,error: false})
    if (InputPassword.value==='' || InputPassword.value.length <= 0) {
      setInputPassword({...InputPassword, error: true})
    } else setInputPassword({...InputPassword,error: false})
    if (InputCPassword.value==='' || InputCPassword.value.length <= 0 || InputCPassword.value!==InputPassword.value) {
      setInputCPassword({...InputCPassword, error: true})
    } else setInputCPassword({...InputCPassword,error: false})

    if (InputEmail.value==='') { isPassed = false; }
    if (InputEmail.value.length <= 0) { isPassed = false; }
    if (!CheckEmail(InputEmail.value)) { isPassed = false; }
    if (InputPassword.value==='') { isPassed = false; }
    if (InputPassword.value.length <= 0) { isPassed = false; }
    if (InputCPassword.value==='') { isPassed = false; }
    if (InputCPassword.value.length <= 0) { isPassed = false; }
    if (InputCPassword.value!==InputPassword.value) { isPassed = false; }

    if (isPassed) {
      // handleNextClick()
      checkEmailExist()
    }
  }

  function handleValidateSecondPage () {
    let isPassed = true
    if (FullName.value==='' || FullName.value.length <= 0) {
      setFullName({...FullName, error: true})
    } else setFullName({...FullName,error: false})
    if (PhoneNumber.value==='' || PhoneNumber.value.length <= 0 || !CheckNumber(PhoneNumber.value)) {
      setPhoneNumber({...PhoneNumber, error: true})
    } else setPhoneNumber({...PhoneNumber,error: false})

    if (FullName.value==='') { isPassed = false; }
    if (FullName.value.length <= 0) { isPassed = false; }
    if (PhoneNumber.value==='') { isPassed = false; }
    if (PhoneNumber.value.length <= 0) { isPassed = false; }
    if (!CheckNumber(PhoneNumber.value)) { isPassed = false; }

    if (isPassed) {
      RegisterUser()
    }
  }

  async function RegisterUser() {
    await axiosBackend.post('/register', {
      name: FullName.value,
      email: InputEmail.value,
      password: InputPassword.value,
      password_confirmation: InputCPassword.value,
      phone_number: PhoneNumber.value,
      // profile_picture: null,
    })
    .then((response) => {
      console.log(response)
      handleNextClick()
    })
    .catch((err) => {
      if (err.response.data.errors.password) {
        setActiveSection(0)
        setInputPassword({...InputPassword, error: true})
      }
      console.warn(err.response)
    })
  }

  function handleToLoginClick() {
    history.push('/login')
  }

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }));


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
                  buttonLink='/login'
                />
              </Box>
            </Grid>
          </>
        ) : null }
        <Grid item xs={12} md={6}>
          <Box paddingRight={4}>
            
            { emailExist ? <Alert severity="error">Email Sudah Terdaftar</Alert> : <span></span> } 
            <Collapse in={ActiveSection===0} timeout="auto">
              <Stack direction="column" sx={{ paddingY: 2, marginBottom: upMd?8:0 }} alignItems="center">
                <img src="./images/web/Logo_Yodacentral.png" alt="Yodacentral" width={upMd?"211px":"375px"} />
                { upMd? (
                  <>
                    <Typography variant="div" fontWeight="bold" fontSize={36}>{TEXTS.form1.header1}</Typography>
                    <Typography variant="div" fontSize={14} color="text.secondary">{TEXTS.form1.header2}</Typography>
                  </>
                ) : null }
              </Stack>
              <Stack direction="column" sx={{ paddingX: upLg?16:upMd?6:2 }} alignItems="center" spacing={1.5}>
                <FormControl variant="outlined" color="primary" fullWidth
                  error={InputEmail.error}
                >
                  <InputLabel htmlFor="login-form-email">{TEXTS.form1.email}</InputLabel>
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
                    label={TEXTS.form1.email}
                  />
                  {/* <FormHelperText>Error Message</FormHelperText> */}
                </FormControl>
                <FormControl variant="outlined" color="primary" fullWidth 
                  error={InputPassword.error}
                >
                  <InputLabel htmlFor="login-form-password">{TEXTS.form1.password}</InputLabel>
                  <OutlinedInput
                    id="login-form-password"
                    type={InputPassword.visible?"text":"password"}
                    value={InputPassword.value}
                    onChange={(e) => setInputPassword({...InputPassword, value: e.target.value})}
                    endAdornment={
                      <InputAdornment position="end">
                        { InputPassword.disabled? ( <BlockIcon /> )
                          : InputPassword.value===''? ( <LockRoundedIcon /> )
                          : (
                            <IconButton edge="end"
                              onClick={() => setInputPassword({...InputPassword, visible: !InputPassword.visible}) }
                            >
                              { InputPassword.visible? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          )
                        }
                      </InputAdornment>
                    }
                    label={TEXTS.form1.password}
                  />
                </FormControl>
                <FormControl variant="outlined" color="primary" fullWidth 
                  error={InputCPassword.error} disabled={InputCPassword.disabled}
                >
                  <InputLabel htmlFor="login-form-cpassword">{TEXTS.form1.cpassword}</InputLabel>
                  {/* <LightTooltip title={<div>
                      <div className="iconTooltip">{InputPassword.length > 8 ? <CheckIcon fontSize="small" /> : <CloseIcon/>}8 - 20 karakter</div>
                      <div className="iconTooltip"><CheckIcon fontSize="small" />1 angka</div>
                      <div className="iconTooltip"><CheckIcon fontSize="small" />1 huruf kapital</div>
                      <div className="iconTooltip"><CheckIcon fontSize="small" />1 huruf kecil</div>
                    </div>} arrow placement="right-start"> */}
                    <OutlinedInput
                      disabled={InputCPassword.disabled}
                      id="login-form-cpassword"
                      type={InputCPassword.visible?"text":"password"}
                      value={InputCPassword.value}
                      onChange={(e) => setInputCPassword({...InputCPassword, value: e.target.value})}
                      endAdornment={
                        <InputAdornment position="end">
                          { InputCPassword.disabled? ( <BlockIcon /> )
                            : InputCPassword.value===''? ( <LockRoundedIcon /> )
                            :  (
                              <IconButton edge="end"
                                onClick={() => setInputCPassword({...InputCPassword, visible: !InputCPassword.visible}) }
                              >
                                { InputCPassword.visible? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            )
                          }
                        </InputAdornment>
                      }
                      label={TEXTS.form1.cpassword}
                    />
                  {/* </LightTooltip> */}
                </FormControl>
                <FormControl fullWidth sx={{ paddingY: 2 }}>
                  <Button variant="contained" color="primary" size="large" onClick={handleValidateFirstPage}>{TEXTS.form1.submitButton}</Button>
                </FormControl>
                { !upMd? (
                  <Typography variant="div" color="text.primary">
                    {TEXTS.main.secondary}{' '}
                    <Link to="/login">
                      <Typography variant="div" fontWeight={"bold"}>{TEXTS.main.button}</Typography>
                    </Link>
                  </Typography>
                ) : null }
              </Stack>
            </Collapse>
            <Collapse in={ActiveSection===1} timeout="auto">
              <Stack direction="column" sx={{ paddingY: 2, marginBottom: upMd?8:0 }} alignItems="center">
                <img src="./images/web/Logo_Yodacentral.png" alt="Yodacentral" width={upMd?"211px":"375px"} />
                { upMd? (
                  <>
                    <Typography variant="div" fontWeight="bold" fontSize={36}>{TEXTS.form2.header1}</Typography>
                    <Typography variant="div" fontSize={14} color="text.secondary">{TEXTS.form2.header2}</Typography>
                  </>
                ) : null }
              </Stack>
              <Stack direction="column" sx={{ paddingX: upLg?16:upMd?6:2 }} alignItems="center" spacing={1.5}>
                <FormControl variant="outlined" color="primary" fullWidth
                  error={FullName.error}
                >
                  <InputLabel htmlFor="login-form-email">{TEXTS.form2.fullName}</InputLabel>
                  <OutlinedInput
                    id="login-form-email"
                    type="text"
                    value={FullName.value}
                    onChange={(e) => setFullName({...FullName, value: e.target.value})}
                    endAdornment={
                      <InputAdornment position="end">
                        { FullName.disabled? ( <BlockIcon /> )
                          : FullName.value===''? ( <CheckCircleIcon /> )
                          : FullName.value!==''? ( <CheckCircleIcon color="primary" /> )
                          // : FullName.value!==''? (
                          //   <IconButton edge="end"
                          //     onClick={() => setFullName({...FullName, value: ''})}
                          //   >
                          //     <CancelIcon />
                          //   </IconButton>
                          // )
                          : null
                        }
                      </InputAdornment>
                    }
                    label={TEXTS.form2.fullName}
                  />
                </FormControl>
                <FormControl variant="outlined" color="primary" fullWidth
                  error={PhoneNumber.error}
                >
                  <InputLabel htmlFor="login-form-number">{TEXTS.form2.phoneNumber}</InputLabel>
                  <OutlinedInput
                    id="login-form-number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    type="text"
                    value={PhoneNumber.value}
                    onChange={(e) => setPhoneNumber({...PhoneNumber, value: e.target.value})}
                    endAdornment={
                      <InputAdornment position="end">
                        { PhoneNumber.disabled? ( <BlockIcon /> )
                          : PhoneNumber.value===''? ( <PhoneIcon /> )
                          : PhoneNumber.value!==''? ( <PhoneIcon color="primary" /> )
                          // : PhoneNumber.value!==''? (
                          //   <IconButton edge="end"
                          //     onClick={() => setPhoneNumber({...PhoneNumber, value: ''})}
                          //   >
                          //     <CancelIcon />
                          //   </IconButton>
                          // )
                          : null
                        }
                      </InputAdornment>
                    }
                    label={TEXTS.form2.phoneNumber}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ paddingY: 2 }}>
                  <Button variant="contained" color="primary" size="large" onClick={handleValidateSecondPage}>{TEXTS.form1.submitButton}</Button>
                </FormControl>
                { !upMd? (
                  <Typography variant="div" color="text.primary">
                    {TEXTS.main.secondary}{' '}
                    <Link to="/login">
                      <Typography variant="div" fontWeight={"bold"}>{TEXTS.main.button}</Typography>
                    </Link>
                  </Typography>
                ) : null }
              </Stack>
            </Collapse>
            <Collapse in={ActiveSection===2} timeout="auto">
              <Stack direction="column" sx={{ paddingTop: upMd?16:4, marginBottom: upMd?2:2 }} alignItems="center" spacing={2}>
                <img src="./images/web/success.png" alt="Success" width={upMd?"200px":"200px"} />
                <Typography variant="div" fontWeight="bold" fontSize={36} sx={{  }}>{TEXTS.form3.header1}</Typography>
                <Typography variant="div" fontSize={14} color="text.secondary" sx={{ width: 360, textAlign: 'center' }}>{TEXTS.form3.header2}</Typography>
              </Stack>
              <Stack direction="column" sx={{ paddingX: upLg?12:upMd?4:2 }} alignItems="center" spacing={1.5}>
                <FormControl fullWidth sx={{ paddingTop: 1.5 }}>
                  <Button variant="contained" color="primary" size="large" onClick={handleToLoginClick}>{TEXTS.form3.submitButton}</Button>
                </FormControl>
              </Stack>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
