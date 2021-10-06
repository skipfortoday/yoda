import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import axiosBackend from "../../Helper/axiosBackend";
import auth from "../../Helper/auth";

const Riwayat_Data = [
  {
    index: 0,
    location: "Bekasi",
    datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"),
    deviceName: "Android 9",
    icon: "mac",
  },
  {
    index: 1,
    location: "Bekasi",
    datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"),
    deviceName: "Android 9",
    icon: "mac",
  },
  {
    index: 2,
    location: "Bekasi",
    datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"),
    deviceName: "Android 9",
    icon: "mac",
  },
  {
    index: 3,
    location: "Bekasi",
    datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"),
    deviceName: "Android 9",
    icon: "mac",
  },
  {
    index: 4,
    location: "Bekasi",
    datetime: format(new Date("2021-10-30T13:00:00"), "d MMM yyyy HH:mm"),
    deviceName: "Android 9",
    icon: "mac",
  },
];

export default function ProfileCard() {
  const [OpenHistory, setOpenHistory] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [userNow, setuserNow] = useState(auth.user);
  const history = useHistory();

  // useEffect(() => {
  //   setuserNow(auth.user)
  // }, [])

  async function LoadUserProfile() {
    await axiosBackend
      .get("/user-profile")
      .then((response) => {
        setuserNow(response.data);
      })
      .catch((err) => {
        console.warn(err.response);
      });
  }

  const Logout = () => {
    auth.logout();
    history.push("/login");
  };

  return (
    <>
      <Card sx={{ width: 329 }}>
        <CardContent sx={{ paddingBottom: 1.5 }}>
          <Button
            variant="text"
            style={{ paddingLeft: 0, justifyContent: "left" }}
          >
            <Typography
              variant="p"
              style={{ paddingLeft: 0 }}
              fontSize={14}
              color="tint.grey.40"
              onClick={() => setOpenProfile(!OpenProfile)}
            >
              {"Profil"}
            </Typography>
          </Button>
          <Divider />
        </CardContent>
        <Collapse in={OpenProfile} timeout="auto">
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Avatar
                src="./images/web/avatar-example.png"
                sx={{ width: 110, height: 110 }}
              />
              <Typography
                fontWeight={700}
                fontSize={22}
                color="text.primary"
                sx={{ paddingTop: 1 }}
              >
                {userNow.name?.split(" ")[0]}
              </Typography>
              <Typography fontWeight={400} fontSize={12} color="tint.black.60">
                {"#03090"}
              </Typography>
            </Stack>
          </CardContent>
          <CardContent>
            <Stack>
              <Box paddingBottom={3}>
                <Typography
                  fontSize={12}
                  color="tint.black.60"
                  sx={{ marginBottom: 0.5 }}
                >
                  Nama Lengkap Sesuai KTP
                </Typography>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  color="tint.black.bold"
                  sx={{ marginBottom: 1.5 }}
                >
                  {userNow.name}
                </Typography>
                <Divider />
              </Box>
              <Box paddingBottom={3}>
                <Typography
                  fontSize={12}
                  color="tint.black.60"
                  sx={{ marginBottom: 0.5 }}
                >
                  Phone number
                </Typography>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  color="tint.black.bold"
                  sx={{ marginBottom: 1.5 }}
                >
                  {userNow.phone_number}
                </Typography>
                <Divider />
              </Box>
              <Box paddingBottom={3}>
                <Typography
                  fontSize={12}
                  color="tint.black.60"
                  sx={{ marginBottom: 0.5 }}
                >
                  Role
                </Typography>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  color="tint.black.bold"
                  sx={{ marginBottom: 1.5 }}
                >
                  Manajemen
                </Typography>
                <Divider />
              </Box>
              <Box paddingBottom={3}>
                <Typography
                  fontSize={12}
                  color="tint.black.60"
                  sx={{ marginBottom: 0.5 }}
                >
                  Kantor
                </Typography>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  color="tint.black.bold"
                  sx={{ marginBottom: 1.5 }}
                >
                  {userNow.location}
                </Typography>
                <Divider />
              </Box>
              <Button variant="contained" onClick={() => Logout()}>
                Logout
              </Button>
            </Stack>
            <Stack alignItems="center" sx={{ paddingX: 5 }}>
              <Typography fontSize={12} color="tint.grey.50" textAlign="center">
                {"Hubungi Admin"}
              </Typography>
              <Typography fontSize={12} color="tint.grey.50" textAlign="center">
                {"jika informasi Akun tidak sesuai"}
              </Typography>
            </Stack>
          </CardContent>
        </Collapse>
        <CardActions>
          <Button
            variant="text"
            size="small"
            color="grey50"
            onClick={() => setOpenHistory(!OpenHistory)}
          >
            Riwayat masuk
          </Button>
        </CardActions>
        <Collapse in={OpenHistory} timeout="auto">
          <CardContent>
            <Stack spacing={1}>
              {Riwayat_Data?.map((rd, index) => (
                <Box key={index} paddingBottom={1.5}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ paddingBottom: 1.5 }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        backgroundColor: "#FFFFFF",
                        color: "#9A9EA7",
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      {rd.icon === "mac" ? (
                        <LaptopMacIcon sx={{ width: 22, height: 22 }} />
                      ) : null}
                    </Avatar>
                    <Box>
                      <Typography fontSize={13} color="tint.grey.50">
                        {rd.location} . {rd.datetime}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        fontSize={14}
                        color="tint.black.bold"
                      >
                        {rd.deviceName}
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
