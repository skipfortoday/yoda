import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Collapse,
  Popper,
  Fade,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthPageBannerCard from "../../Components/Auth/AuthPageBannerCard";
import { useHistory } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import { CheckEmail } from "../../Helper/RegexHelper";
import axiosBackend from "../../Helper/axiosBackend";
// import Alert from '@mui/material/Alert';

const TEXTS = {
  main: {
    primary: "Atur apa saja, dengan siapa saja, dimana saja",
    secondary: "Belum punya akun?",
    button: "Daftar",
  },
  form1: {
    header1: "Lupa kata sandi?",
    header2:
      "Harap masukkan email Anda. Kami akan mengirimkan link untuk mengubah kata sandi melalui email Anda.",
    email: "Email",
    submitButton: "Lanjutkan",
  },
  form2: {
    header1: "Cek email Anda!",
    header2:
      "Kami sudah mengirimkan link agar Anda dapat mengubah kata sandi Anda.",
    submitButton: "Kembali ke halaman login",
  },
};

export default function ForgotPasswordPage() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  const spaceBetween = upLg ? 16 : upMd ? 8 : 0;
  const history = useHistory();

  const [InputEmail, setInputEmail] = useState({
    value: "",
    error: false,
    disabled: false,
  });
  const [ActiveSection, setActiveSection] = useState(0);
  const [emailFormat, setEmailFormat] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement, event) => {

    if (event !== false) setPlacement(newPlacement); setAnchorEl(event.currentTarget); setOpen(true);
    if (event === false) setOpen(false);
  };

  function checkValidEmailFormat(val) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
      setEmailFormat(true);
    } else {
      setEmailFormat(false);
  // const [InputEmail, setInputEmail] = useState({ value: '', error: false, disabled: false, });
  // const [ActiveSection, setActiveSection] = useState(0)
  // const [emailExist, setEmailExist] = useState(false)

  // async function checkEmailExist() {
  //   const thisToken = sessionStorage.getItem('token')
  //   console.log('thisToken', thisToken)
  //   const baseURL=  process.env.REACT_APP_BACKEND_ENDPOINT_PROD
  //   try {
  //     await axiosBackend.post(`${baseURL}/check-email`, {
  //       email: InputEmail,
  //     })
  //     console.log('email tidak terdaftar')
  //     setEmailExist(true)
  //     setTimeout(()=>{
  //       setEmailExist(false)
  //     }, 3000)
  //   } catch (err){
  //     handleNextClick()
  //     console.log('email terdaftar')
  //     // console.log('err', err)

    }
  }

  function handleNextClick() {
    let isPassed = true;
    if (
      InputEmail.value === "" ||
      InputEmail.value.length <= 0 ||
      !CheckEmail(InputEmail.value)
    ) {
      setInputEmail({ ...InputEmail, error: true });
    } else setInputEmail({ ...InputEmail, error: false });

    if (isPassed) handleForgot();
  }

  async function handleForgot() {
    await axiosBackend
      .post("/forgot-password", {
        email: InputEmail.value,
      })
      .then((response) => {
        setInputEmail({ ...InputEmail, error: false });
        console.log(response.data);
        // handleToLoginClick()
        setActiveSection(1);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setInputEmail({ ...InputEmail, error: true });
        }
        console.warn(err.response);
      });
  }

  function handleToLoginClick() {
    history.push("/login");
  }

  return (
    <Box component="section" height={"100vh"} padding={4} position={"relative"}>
      <Grid container>
        {upMd ? (
          <>
            <Grid item xs={12} md={6}>
              <Box paddingRight={Math.ceil(spaceBetween / 2)}>
                <AuthPageBannerCard
                  primaryText={TEXTS.main.primary}
                  secondaryText={TEXTS.main.secondary}
                  buttonText={TEXTS.main.button}
                  buttonLink="/register"
                />
              </Box>
            </Grid>
          </>
        ) : null}
        <Grid item xs={12} md={6}>
          <Box
            paddingLeft={upMd ? Math.ceil(spaceBetween / 2) : 0}
            paddingTop={upMd ? 10 : 2}
          >
            <Collapse in={ActiveSection === 0} timeout="auto">
              <Stack
                direction="column"
                sx={{ paddingY: 2, marginBottom: upMd ? 2 : 2 }}
                alignItems="center"
                spacing={2}
              >
                <img
                  src="./images/web/success.png"
                  alt="Success"
                  width={upMd ? "200px" : "200px"}
                />
                <Typography
                  variant="div"
                  fontWeight="bold"
                  fontSize={36}
                  sx={{}}
                >
                  {TEXTS.form1.header1}
                </Typography>
                <Typography
                  variant="div"
                  fontSize={14}
                  color="text.secondary"
                  sx={{ width: 300, textAlign: "center" }}
                >
                  {TEXTS.form1.header2}
                </Typography>
          {/* <Box paddingLeft={upMd?Math.ceil(spaceBetween/2):0} paddingTop={upMd?10:2}>
            {emailExist ? (
              <Alert severity="error">Email Tidak Terdaftar</Alert>
            ) : (
              <span></span>
            )}
            <Collapse in={ActiveSection===0} timeout="auto">
              <Stack direction="column" sx={{ paddingY: 2, marginBottom: upMd?2:2 }} alignItems="center" spacing={2}>
                <img src="./images/web/success.png" alt="Success" width={upMd?"200px":"200px"} />
                <Typography variant="div" fontWeight="bold" fontSize={36} sx={{  }}>{TEXTS.form1.header1}</Typography>
                <Typography variant="div" fontSize={14} color="text.secondary" sx={{ width: 300, textAlign: 'center' }}>{TEXTS.form1.header2}</Typography> */}
              </Stack>
              <Stack
                direction="column"
                sx={{ paddingX: upLg ? 12 : upMd ? 4 : 2 }}
                alignItems="center"
                spacing={1.5}
              >
                <FormControl
                  variant="outlined"
                  color="primary"
                  fullWidth
                  error={InputEmail.error}
                >
                  <InputLabel htmlFor="login-form-email">
                    {TEXTS.form1.email}
                  </InputLabel>
                  <OutlinedInput
                    id="login-form-email"
                    type="email"
                    value={InputEmail.value}
                    onChange={(e) => {
                      setInputEmail({ ...InputEmail, value: e.target.value });
                      checkValidEmailFormat(e.target.value);
                      handleClick("right-end", e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        {InputEmail.disabled ? (
                          <BlockIcon />
                        ) : InputEmail.value === "" ? (
                          <EmailIcon />
                        ) : InputEmail.value !== "" ? (
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setInputEmail({ ...InputEmail, value: "" })
                            }
                          >
                            <CancelIcon />
                          </IconButton>
                        ) : null}
                      </InputAdornment>
                    }
                    label={TEXTS.form1.email}
                  />
                </FormControl>
                <Popper
                  open={open}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Typography sx={{ p: 1 }}>
                          <div
                            style={{ display: "flex", flexDirection: "column", height:"2.5rem", justifyContent:"center"}}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                // margin: "0 auto",
                              }}
                            >
                              {!emailFormat ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>Format email</p>
                            </div>
                          </div>
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <FormControl fullWidth sx={{ paddingTop: 1.5 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleNextClick}
                  >
                    {TEXTS.form1.submitButton}
                  </Button>
                  {/* <Button variant="contained" color="primary" size="large" onClick={checkEmailExist}>{TEXTS.form1.submitButton}</Button> */}
            <Typography
                  variant="div"
                  fontWeight="bold"
                  fontSize={36}
                  sx={{}}
                >
                  {TEXTS.form2.header1}
                </Typography>
                <Typography
                  variant="div"
                  fontSize={14}
                  color="text.secondary"
                  sx={{ width: 420, textAlign: "center" }}
                >
                  {TEXTS.form2.header2}
                </Typography>
                </FormControl>
              </Stack>
              <Stack
                direction="column"
                sx={{ paddingX: upLg ? 12 : upMd ? 4 : 2 }}
                alignItems="center"
                spacing={1.5}
              >
                <FormControl fullWidth sx={{ paddingTop: 1.5 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleToLoginClick}
                  >
                    {TEXTS.form2.submitButton}
                  </Button>
                </FormControl>
              </Stack>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
