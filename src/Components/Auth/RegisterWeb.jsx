import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Popper,
  Fade,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthPageBannerCard from "./AuthPageBannerCard";

import EmailIcon from "@mui/icons-material/Email";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import { CheckEmail, CheckNumber } from "../../Helper/RegexHelper";
import axiosBackend from "../../Helper/axiosBackend";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

// import DownloadIcon from '@mui/icons-material/Download';

export default function RegisterWeb(props) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  const history = useHistory();

  const { TEXTS } = props;
  const { InputEmail, setInputEmail } = props;
  const { InputPassword, setInputPassword } = props;
  const { InputCPassword, setInputCPassword } = props;
  const { FullName, setFullName } = props;
  const { PhoneNumber, setPhoneNumber } = props;
  const { spaceBetween } = props;

  const [ActiveSection, setActiveSection] = useState(0);
  const [email, setEmail] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [emailFormat, setEmailFormat] = useState(false);
  const [emailSudahTerdaftar, setEmailSudahTerdaftar] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [PhoneNumberLength, setPhoneNumberLength] = useState(0);

  const [CharLength, setCharLength] = useState(0);
  const [UpperCaseExist, setUpperCaseExist] = useState(0);
  const [LowerCaseExist, setLowerCaseExist] = useState(0);
  const [NumericExist, setNumericExist] = useState(0);
  const [passwordValid, setPasswordValid] = useState(false);

  const [EPValid, setEPValid] = useState(false);
  const [EPCPValid, setEPCPValid] = useState(false);

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const [pass, setPass] = useState(null);
  const [checkPass, setCheckPass] = useState(false);
  const [numPass, setNumPass] = useState(0);
  const isMainMenuOpen = Boolean(MenuanchorEl);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [placement, setPlacement] = useState();

  useEffect(() => {
    if (EPValid && checkPass) {
      setEPCPValid(true);
    } else {
      setEPCPValid(false);
    }
  }, [EPValid, checkPass]);

  useEffect(() => {
    if (emailValid && passwordValid) {
      setEPValid(true);
    } else {
      setEPValid(false);
    }
  }, [emailValid, passwordValid]);

  useEffect(() => {
    if (emailFormat && !emailSudahTerdaftar) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [emailFormat, emailSudahTerdaftar]);

  useEffect(() => {
    if (CharLength && UpperCaseExist && LowerCaseExist && NumericExist) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [CharLength, UpperCaseExist, LowerCaseExist, NumericExist]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkEmailHasBeenRegistered(email);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [email]);

  const handleClick = (newPlacement, event, id) => {
    if (event !== false) {
      setAnchorEl(event);
    }
    if (id === 0) {
      setOpen0(event !== false ? true : false);
      setOpen1(false);
      setOpen2(false);
      setOpen3(false);
    } else if (id === 1) {
      setOpen1(event !== false ? true : false);
      setOpen0(false);
      setOpen2(false);
      setOpen3(false);
    } else if (id === 2) {
      setOpen2(event !== false ? true : false);
      setOpen1(false);
      setOpen0(false);
      setOpen3(false);
    } else if (id === 3) {
      setOpen3(event !== false ? true : false);
      setOpen1(false);
      setOpen2(false);
      setOpen0(false);
    }
    if (event !== false) setPlacement(newPlacement);
  };

  function handleNextClick() {
    setActiveSection(ActiveSection + 1);
  }
  function handleResetClick() {
    setActiveSection(0);
  }

  async function checkEmailHasBeenRegistered(val) {
    const thisToken = sessionStorage.getItem("token");
    const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT_PROD;
    console.log("before");
    await axios
      .post(`${baseURL}/check-email`, {
        email: val,
      })
      .then((res) => {
        console.log("res", res);
        setEmailSudahTerdaftar(
          res.data.meesage === "Email Not Registered" ? false : true
        );
      })
      .catch((err) => {
        console.log("not passed");
        setEmailSudahTerdaftar(true);
      });
  }

  function checkValidEmailFormat(val) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
      setEmailFormat(true);
    } else {
      setEmailFormat(false);
    }
  }

  function checkCharLength(val) {
    if (val.length < 8 || val.length > 20) {
      setCharLength(false);
    } else {
      setCharLength(true);
    }
  }

  function checkPhoneNumberLength(val) {
    if (val.length < 10 || val.length > 15) {
      setPhoneNumberLength(false);
    } else {
      setPhoneNumberLength(true);
    }
  }

  function checkUpperCase(val) {
    let count = 0;
    for (const letter of val) {
      if (/^[A-Z]*$/.test(letter)) {
        count += 1;
      }
    }
    if (count > 0) {
      setUpperCaseExist(true);
    } else {
      setUpperCaseExist(false);
    }
  }

  function checkLowerCase(val) {
    let count = 0;
    for (const letter of val) {
      if (/^[a-z]*$/.test(letter)) {
        count += 1;
      }
    }
    if (count > 0) {
      setLowerCaseExist(true);
    } else {
      setLowerCaseExist(false);
    }
  }

  function checkNumericValue(val) {
    let count = 0;
    for (const num of val) {
      if (/^[0-9]*$/.test(num)) {
        count += 1;
      }
    }
    if (count > 0) {
      setNumericExist(true);
    } else {
      setNumericExist(false);
    }
  }

  function checkSamePassword(val) {
    if (val !== pass) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }
  }

  function checkNumericOnly(val) {
    if (!/^\d+$/.test(val)) {
      setNumPass(false);
    } else {
      setNumPass(true);
    }
  }

  async function checkEmailExist(val) {
    const thisToken = sessionStorage.getItem("token");
    console.log("thisToken", thisToken);
    const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT_PROD;
    try {
      const data = await axios.post(`${baseURL}/check-email`, {
        email: InputEmail,
      });
      console.log("data", data);
      handleNextClick();
    } catch (err) {
      console.log("not passed");
      setEmailExist(true);
      setTimeout(() => {
        setEmailExist(false);
      }, 3000);
      console.log("err", err);
    }
  }

  function handleValidateFirstPage() {
    handleClick("top", false, 0);
    let isPassed = true;
    if (
      InputEmail.value === "" ||
      InputEmail.value.length <= 0 ||
      !CheckEmail(InputEmail.value)
    ) {
      setInputEmail({ ...InputEmail, error: true });
    } else setInputEmail({ ...InputEmail, error: false });
    if (InputPassword.value === "" || InputPassword.value.length <= 0) {
      setInputPassword({ ...InputPassword, error: true });
    } else setInputPassword({ ...InputPassword, error: false });
    if (
      InputCPassword.value === "" ||
      InputCPassword.value.length <= 0 ||
      InputCPassword.value !== InputPassword.value
    ) {
      setInputCPassword({ ...InputCPassword, error: true });
    } else setInputCPassword({ ...InputCPassword, error: false });

    if (InputEmail.value === "") {
      isPassed = false;
    }
    if (InputEmail.value.length <= 0) {
      isPassed = false;
    }
    if (!CheckEmail(InputEmail.value)) {
      isPassed = false;
    }
    if (InputPassword.value === "") {
      isPassed = false;
    }
    if (InputPassword.value.length <= 0) {
      isPassed = false;
    }
    if (InputCPassword.value === "") {
      isPassed = false;
    }
    if (InputCPassword.value.length <= 0) {
      isPassed = false;
    }
    if (InputCPassword.value !== InputPassword.value) {
      isPassed = false;
    }

    if (isPassed) {
      // handleNextClick()
      checkEmailExist();
    }
  }

  function handleValidateSecondPage() {
    let isPassed = true;
    if (FullName.value === "" || FullName.value.length <= 0) {
      setFullName({ ...FullName, error: true });
    } else setFullName({ ...FullName, error: false });
    if (
      PhoneNumber.value === "" ||
      PhoneNumber.value.length <= 0 ||
      !CheckNumber(PhoneNumber.value)
    ) {
      setPhoneNumber({ ...PhoneNumber, error: true });
    } else setPhoneNumber({ ...PhoneNumber, error: false });

    if (FullName.value === "") {
      isPassed = false;
    }
    if (FullName.value.length <= 0) {
      isPassed = false;
    }
    if (PhoneNumber.value === "") {
      isPassed = false;
    }
    if (PhoneNumber.value.length <= 0) {
      isPassed = false;
    }
    if (!CheckNumber(PhoneNumber.value)) {
      isPassed = false;
    }

    if (isPassed) {
      RegisterUser();
    }
  }

  async function RegisterUser() {
    // await axiosBackend
    //   .post("/register", {
    //     name: FullName.value,
    //     email: InputEmail.value,
    //     password: InputPassword.value,
    //     password_confirmation: InputCPassword.value,
    //     phone_number: PhoneNumber.value,
    //     // profile_picture: null,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     handleNextClick();
    //   })
    //   .catch((err) => {
    //     if (err.response.data.errors.password) {
    //       setActiveSection(0);
    //       setInputPassword({ ...InputPassword, error: true });
    //     }
    //     console.warn(err.response);
    //   });
    await axiosBackend
      .post("/register", {
        name: FullName.value,
        email: InputEmail.value,
        password: InputPassword.value,
        password_confirmation: InputCPassword.value,
        phone_number: `+62` + PhoneNumber.value,
        // profile_picture: null,
      })
      .then((response) => {
        console.log(response);
        handleNextClick();
      })
      .catch((err) => {
        if (err.response.data.errors.password) {
          setActiveSection(0);
          setInputPassword({ ...InputPassword, error: true });
        }
        console.warn(err.response);
      });
  }

  function handleToLoginClick() {
    history.push("/login");
  }

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",

      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }));

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
                  buttonLink="/login"
                />
              </Box>
            </Grid>
          </>
        ) : null}
        <Grid item xs={12} md={6}>
          <Box paddingRight={4}>
            {emailExist ? (
              <Alert severity="error">Email Sudah Terdaftar</Alert>
            ) : (
              <span></span>
            )}

            <Collapse in={ActiveSection === 0} timeout="auto">
              <Stack
                direction="column"
                sx={{ paddingY: 2, marginBottom: upMd ? 8 : 0 }}
                alignItems="center"
              >
                <img
                  src="./images/web/Logo_Yodacentral.png"
                  alt="Yodacentral"
                  width={upMd ? "211px" : "375px"}
                />
                {upMd ? (
                  <>
                    <Typography variant="div" fontWeight="bold" fontSize={36}>
                      {TEXTS.form1.header1}
                    </Typography>
                    <Typography
                      variant="div"
                      fontSize={14}
                      color="text.secondary"
                    >
                      {TEXTS.form1.header2}
                    </Typography>
                  </>
                ) : null}
              </Stack>
              <Stack
                direction="column"
                sx={{ paddingX: upLg ? 16 : upMd ? 6 : 2 }}
                alignItems="center"
                spacing={1.5}
              >
                <FormControl
                  variant="outlined"
                  color="primary"
                  fullWidth
                  error={InputEmail.error}
                  onClick={() => handleClick("top", false, 0)}
                  id="formEmail"
                  style={{ left: "0px" }}
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
                      setEmail(e.target.value);
                      checkValidEmailFormat(e.target.value);
                      let formBorder = document.getElementById("formEmail");
                      handleClick("right-end", formBorder, 0);
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
                            onClick={(e) => {
                              setInputEmail({ ...InputEmail, value: "" });
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
                        ) : null}
                      </InputAdornment>
                    }
                    label={TEXTS.form1.email}
                  />
                  {/* <FormHelperText>Error Message</FormHelperText> */}
                </FormControl>
                <Popper
                  open={open0}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade
                      {...TransitionProps}
                      timeout={350}
                      style={{ height: "9vh" }}
                    >
                      <Paper>
                        <Typography sx={{ p: 0.1, lineHeight: "1.75" }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                              {emailSudahTerdaftar ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>
                                Email belum terdaftar
                              </p>
                            </div>
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
                <FormControl
                  variant="outlined"
                  color="primary"
                  fullWidth
                  id="formPassword"
                  error={InputPassword.error}
                  onClick={() => handleClick("top", false, 1)}
                >
                  <InputLabel htmlFor="login-form-password">
                    {TEXTS.form1.password}
                  </InputLabel>
                  <OutlinedInput
                    id="login-form-password"
                    type={InputPassword.visible ? "text" : "password"}
                    value={InputPassword.value}
                    onChange={(e) => {
                      setInputPassword({
                        ...InputPassword,
                        value: e.target.value,
                      });
                      handleClick("right", e, 1);
                      checkCharLength(e.target.value);
                      checkLowerCase(e.target.value);
                      checkUpperCase(e.target.value);
                      checkNumericValue(e.target.value);
                      setPass(e.target.value);
                      let formBorder = document.getElementById("formPassword");
                      handleClick("right-end", formBorder, 1);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        {InputPassword.disabled ? (
                          <BlockIcon />
                        ) : InputPassword.value === "" ? (
                          <LockRoundedIcon />
                        ) : (
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setInputPassword({
                                ...InputPassword,
                                visible: !InputPassword.visible,
                              })
                            }
                          >
                            {InputPassword.visible ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        )}
                      </InputAdornment>
                    }
                    label={TEXTS.form1.password}
                  />
                </FormControl>
                <Popper
                  open={open1}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Typography sx={{ p: 1 }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                              {!CharLength ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>
                                8 - 20 karakter
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                // margin: "0 auto",
                              }}
                            >
                              {!UpperCaseExist ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>
                                1 Huruf kapital
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                // margin: "0 auto",
                              }}
                            >
                              {!LowerCaseExist ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>1 Huruf kecil</p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                // margin: "0 auto",
                              }}
                            >
                              {!NumericExist ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>1 angka</p>
                            </div>
                          </div>
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <FormControl
                  variant="outlined"
                  fullWidth
                  id="formCPassword"
                  error={InputCPassword.error}
                  disabled={InputCPassword.disabled}
                  sx={
                    !EPValid
                      ? {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                          borderRadius: "7px",
                        }
                      : { backgroundColor: "inherit", borderRadius: "7px" }
                  }
                  onClick={() => handleClick("top", false, 2)}
                >
                  <InputLabel htmlFor="login-form-cpassword">
                    {TEXTS.form1.cpassword}
                  </InputLabel>
                  {/* <LightTooltip title={<div>
                      <div className="iconTooltip">{InputPassword.length > 8 ? <CheckIcon fontSize="small" /> : <CloseIcon/>}8 - 20 karakter</div>
                      <div className="iconTooltip"><CheckIcon fontSize="small" />1 angka</div>
                      <div className="iconTooltip"><CheckIcon fontSize="small" />1 huruf kapital</div>
                      <div className="iconTooltip"><CheckIcon fontSize="small" />1 huruf kecil</div>
                    </div>} arrow placement="right-start"> */}
                  <OutlinedInput
                    // disabled={InputCPassword.disabled}
                    id="login-form-cpassword"
                    disabled={!EPValid}
                    type={InputCPassword.visible ? "text" : "password"}
                    value={InputCPassword.value}
                    onChange={(e) => {
                      setInputCPassword({
                        ...InputCPassword,
                        value: e.target.value,
                      });
                      // checkCharLength(e.target.value);
                      // checkLowerCase(e.target.value);
                      // checkUpperCase(e.target.value);
                      // checkNumericValue(e.target.value);
                      checkSamePassword(e.target.value);
                      let formBorder = document.getElementById("formCPassword");
                      handleClick("right-end", formBorder, 2);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        {InputCPassword.disabled ? (
                          <BlockIcon />
                        ) : InputCPassword.value === "" ? (
                          <LockRoundedIcon />
                        ) : (
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setInputCPassword({
                                ...InputCPassword,
                                visible: !InputCPassword.visible,
                              })
                            }
                          >
                            {InputCPassword.visible ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        )}
                      </InputAdornment>
                    }
                    label={TEXTS.form1.cpassword}
                  />
                  {/* </LightTooltip> */}
                </FormControl>
                <Popper
                  open={open2}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade
                      {...TransitionProps}
                      timeout={350}
                      style={{ height: "9vh" }}
                    >
                      <Paper>
                        <Typography sx={{ p: 1, lineHeight: "1.75" }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                              {!checkPass ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>Password sama</p>
                            </div>
                          </div>
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <FormControl fullWidth sx={{ paddingY: 2 }}>
                  {!EPCPValid ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled
                      onClick={handleValidateFirstPage}
                    >
                      {TEXTS.form1.submitButton}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleValidateFirstPage}
                    >
                      {TEXTS.form1.submitButton}
                    </Button>
                  )}
                </FormControl>
                {!upMd ? (
                  <Typography variant="div" color="text.primary">
                    {TEXTS.main.secondary}{" "}
                    <Link to="/login">
                      <Typography variant="div" fontWeight={"bold"}>
                        {TEXTS.main.button}
                      </Typography>
                    </Link>
                  </Typography>
                ) : null}
              </Stack>
            </Collapse>
            <Collapse in={ActiveSection === 1} timeout="auto">
              <Stack
                direction="column"
                sx={{ paddingY: 2, marginBottom: upMd ? 8 : 0 }}
                alignItems="center"
              >
                <img
                  src="./images/web/Logo_Yodacentral.png"
                  alt="Yodacentral"
                  width={upMd ? "211px" : "375px"}
                />
                {upMd ? (
                  <>
                    <Typography variant="div" fontWeight="bold" fontSize={36}>
                      {TEXTS.form2.header1}
                    </Typography>
                    <Typography
                      variant="div"
                      fontSize={14}
                      color="text.secondary"
                    >
                      {TEXTS.form2.header2}
                    </Typography>
                  </>
                ) : null}
              </Stack>
              <Stack
                direction="column"
                sx={{ paddingX: upLg ? 16 : upMd ? 6 : 2 }}
                alignItems="center"
                spacing={1.5}
              >
                <FormControl
                  variant="outlined"
                  color="primary"
                  fullWidth
                  error={FullName.error}
                  onClick={() => handleClick("top", false, 1)}
                >
                  <InputLabel htmlFor="login-form-email">
                    {TEXTS.form2.fullName}
                  </InputLabel>
                  <OutlinedInput
                    id="login-form-email"
                    type="text"
                    value={FullName.value}
                    onChange={(e) =>
                      setFullName({ ...FullName, value: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        {FullName.disabled ? (
                          <BlockIcon />
                        ) : FullName.value === "" ? (
                          <PersonIcon />
                        ) : FullName.value !== "" ? (
                          <CheckIcon color="primary" />
                        ) : // : FullName.value!==''? (
                        //   <IconButton edge="end"
                        //     onClick={() => setFullName({...FullName, value: ''})}
                        //   >
                        //     <CancelIcon />
                        //   </IconButton>
                        // )
                        null}
                      </InputAdornment>
                    }
                    label={TEXTS.form2.fullName}
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  color="primary"
                  fullWidth
                  id="formPhone"
                  error={PhoneNumber.error}
                  onClick={() => handleClick("top", false, 1)}
                >
                  <InputLabel htmlFor="login-form-number">
                    {TEXTS.form2.phoneNumber}
                  </InputLabel>
                  <OutlinedInput
                    id="login-form-number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 15,
                    }}
                    type="text"
                    value={PhoneNumber.value}
                    onChange={(e) => {
                      setPhoneNumber({ ...PhoneNumber, value: e.target.value });
                      checkPhoneNumberLength(e.target.value);
                      checkNumericOnly(e.target.value);
                      // handleClick("right-end", e, 3);
                      let formBorder = document.getElementById("formPhone");
                      handleClick("right-end", formBorder, 3);
                    }}
                    startAdornment={
                      <InputAdornment position="start">+62</InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        {PhoneNumber.disabled ? (
                          <BlockIcon />
                        ) : PhoneNumber.value === "" ? (
                          <PhoneIcon />
                        ) : PhoneNumber.value !== "" ? (
                          <PhoneIcon color="primary" />
                        ) : // : PhoneNumber.value!==''? (
                        //   <IconButton edge="end"
                        //     onClick={() => setPhoneNumber({...PhoneNumber, value: ''})}
                        //   >
                        //     <CancelIcon />
                        //   </IconButton>
                        // )
                        null}
                      </InputAdornment>
                    }
                    label={TEXTS.form2.phoneNumber}
                  />
                </FormControl>
                <Popper
                  open={open3}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade
                      {...TransitionProps}
                      timeout={350}
                      style={{ height: "9vh" }}
                    >
                      <Paper>
                        <Typography sx={{ p: 0.1 }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                              {!PhoneNumberLength ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>
                                10 - 15 karakter
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "2.5em",
                                // margin: "0 auto",
                              }}
                            >
                              {!numPass ? (
                                <CloseIcon style={{ color: "red" }} />
                              ) : (
                                <CheckIcon style={{ color: "green" }} />
                              )}
                              <p style={{ margin: "0 auto" }}>Harus angka</p>
                            </div>
                          </div>
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <FormControl fullWidth sx={{ paddingY: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleValidateSecondPage}
                  >
                    {TEXTS.form1.submitButton}
                  </Button>
                </FormControl>
                {!upMd ? (
                  <Typography variant="div" color="text.primary">
                    {TEXTS.main.secondary}{" "}
                    <Link to="/login">
                      <Typography variant="div" fontWeight={"bold"}>
                        {TEXTS.main.button}
                      </Typography>
                    </Link>
                  </Typography>
                ) : null}
              </Stack>
            </Collapse>
            <Collapse in={ActiveSection === 2} timeout="auto">
              <Stack
                direction="column"
                sx={{ paddingTop: upMd ? 16 : 4, marginBottom: upMd ? 2 : 2 }}
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
                  {TEXTS.form3.header1}
                </Typography>
                <Typography
                  variant="div"
                  fontSize={14}
                  color="text.secondary"
                  sx={{ width: 360, textAlign: "center" }}
                >
                  {TEXTS.form3.header2}
                </Typography>
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
                    onClick={() => {
                      handleToLoginClick();
                      handleClick("right", false, 0);
                    }}
                  >
                    {TEXTS.form3.submitButton}
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
