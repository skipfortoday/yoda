import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import RegisterMobile from '../../Components/Auth/RegisterMobile';
import RegisterWeb from "../../Components/Auth/RegisterWeb";

const TEXTS = {
  main: {
    primary: "Atur apa saja, dengan siapa saja, dimana saja",
    secondary: "Sudah punya akun?",
    button: "Masuk",
  },
  form1: {
    header1: "Daftar Akun Baru",
    header2: "Masukan data untuk melanjutkan",
    email: "Email",
    password: "Kata sandi",
    cpassword: "Konfirmasi kata sandi",
    submitButton: "Lanjutkan",
  },
  form2: {
    header1: "Daftar Akun Baru",
    header2: "Masukan data untuk melanjutkan",
    fullName: "Nama lengkap sesuai KTP",
    phoneNumber: "Nomor telepon",
    submitButton: "Lanjutkan",
  },
  form3: {
    header1: "Terima kasih!",
    header2:
      "Email Anda telah didaftarkan. Silahkan tunggu 1x24 Jam untuk bisa menggunakan akun Anda.",
    submitButton: "Tutup",
  },
};

export default function RegisterPage() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  const spaceBetween = upLg ? 16 : upMd ? 8 : 0;

  // Maaf jika sistem variabel-nya terlalu berantakan
  // akan lebih rapih jika menggunakan context
  const [InputEmail, setInputEmail] = useState({
    value: "",
    error: false,
    disabled: false,
  });
  const [InputPassword, setInputPassword] = useState({
    value: "",
    error: false,
    disabled: false,
  });
  const [InputCPassword, setInputCPassword] = useState({
    value: "",
    error: false,
    disabled: false,
  });
  const [FullName, setFullName] = useState({
    value: "",
    error: false,
    disabled: false,
  });
  const [PhoneNumber, setPhoneNumber] = useState({
    value: "",
    error: false,
    disabled: false,
  });

  if (upMd) {
    return (
      <RegisterWeb
        TEXTS={TEXTS}
        InputEmail={InputEmail}
        setInputEmail={setInputEmail}
        InputPassword={InputPassword}
        setInputPassword={setInputPassword}
        InputCPassword={InputCPassword}
        setInputCPassword={setInputCPassword}
        FullName={FullName}
        setFullName={setFullName}
        PhoneNumber={PhoneNumber}
        setPhoneNumber={setPhoneNumber}
        spaceBetween={spaceBetween}
      />
    );
  } else {
    return (
      <RegisterWeb
        TEXTS={TEXTS}
        InputEmail={InputEmail}
        setInputEmail={setInputEmail}
        InputPassword={InputPassword}
        setInputPassword={setInputPassword}
        InputCPassword={InputCPassword}
        setInputCPassword={setInputCPassword}
        FullName={FullName}
        setFullName={setFullName}
        PhoneNumber={PhoneNumber}
        setPhoneNumber={setPhoneNumber}
        spaceBetween={spaceBetween}
      />
      // <RegisterMobile /> // Uncoment this and remove RegisterWeb above to continue developing this page
    );
  }
}
