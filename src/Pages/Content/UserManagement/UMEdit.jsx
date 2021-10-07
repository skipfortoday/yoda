import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axiosBackend from "../../../Helper/axiosBackend";
import axios from "axios";

let obj = {
  data: {
    // cellMode: "view"
    // colDef: {width: 100, minWidth: 160, hide: false, sortable: true, resizable: true, …}
    // field: "created_at"
    // formattedValue: "2021-09-30T19:17:08.000000Z"
    // getValue: (...t) => n.current[e](...t)
    // hasFocus: false
    // id: 1
    // isEditable: false
    // row: {id: 1, name: 'Super Admin', email: 'vincentiusmandala@gmail.com', location: 'Surabaya', user_status: 'Active', …}
    // tabIndex: -1
    // value: "2021-09-30T19:17:08.000000Z"
    // [[Prototype]]: Object
    // setMenuAnchorEl: ƒ ()
    // [[Prototype]]: Object
  },
};

export default function UMEdit(props) {
  const { data, reload, field, dataSent } = props;
  const { setMenuAnchorEl } = props;
  const [Switch, setSwitch] = useState(false);
  const [ListKantor, setListKantor] = useState([]);
  const [ListRoles, setListRoles] = useState([]);

  const [InputName, setInputName] = useState(data.name);
  const [InputEmail, setInputEmail] = useState(data.email);
  const [InputPhoneNumber, setInputPhoneNumber] = useState("");
  const [InputRole, setInputRole] = useState(data.role);
  const [InputLocation, setInputLocation] = useState(data.location);
  const [InputStatus, setInputStatus] = useState(data.user_status);

  useEffect(() => {
    loadKantor();
    loadRoles();
  }, []);

  const EditField = {
    name: (
      <>
        <InputLabel htmlFor="input-1">Name</InputLabel>
        <Input
          type="text"
          label="Name"
          name="name"
          onChange={(e) => {
            console.log(e.target.value);
            setInputName(e.target.value);
          }}
          defaultValue={data.name}
        ></Input>

        <InputLabel htmlFor="input-1">Email</InputLabel>
        <Input
          type="text"
          label="Email"
          name="email"
          onChange={(e) => {
            console.log(e.target.value);
            setInputEmail(e.target.value);
          }}
          defaultValue={data.email}
        ></Input>
      </>
    ),
    phone_number: (
      <>
        <InputLabel htmlFor="input-1">Phone Number</InputLabel>
        <Input
          type="text"
          label="phone number"
          name="phone number"
          onChange={(e) => {
            console.log(e.target.value);
            setInputPhoneNumber(e.target.value);
          }}
          defaultValue={data.phone_number}
        ></Input>
      </>
    ),
    role: (
      <>
        <InputLabel htmlFor="input-1">Role</InputLabel>

        <Select labelId="roles" id="roles" defaultValue={InputRole}>
          {ListRoles?.map((data, idx) => {
            return (
              <MenuItem
                value={data.name}
                key={idx}
                onClick={() => {
                  setInputRole(data.name);
                }}
              >
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </>
    ),
    location: (
      <>
        <InputLabel htmlFor="input-1">Kantor</InputLabel>
        <Select labelId="location" id="location" value={InputLocation}>
          {ListKantor?.map((data, idx) => {
            console.log(data, "DATALISTKANTOR");
            console.log(InputLocation);
            return (
              <MenuItem
                value={data.nama_cabang}
                key={idx}
                onClick={() => {
                  setInputLocation(data.nama_cabang);
                }}
              >
                {data.nama_cabang}
              </MenuItem>
            );
          })}
        </Select>
      </>
    ),
    user_status: (
      <>
        <InputLabel htmlFor="input-1">Status</InputLabel>
        <Select labelId="roles" id="roles" defaultValue={InputStatus}>
          <MenuItem
            value="Aktif"
            key="0"
            onClick={() => {
              setInputStatus("Aktif");
            }}
          >
            Aktif
          </MenuItem>
          <MenuItem
            value="Tidak Aktif"
            key="1"
            onClick={() => {
              setInputStatus("Tidak Aktif");
            }}
          >
            Tidak Aktif
          </MenuItem>
        </Select>
      </>
    ),
  };

  const loadKantor = async () => {
    await axiosBackend
      .get("/dropdown-kantor")
      .then((res) => {
        console.log(res,"KANTORKANTOR");
        setListKantor(res.data.kantor);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const loadRoles = async () => {
    await axiosBackend
      .get("/dropdown-roles")
      .then((res) => {
        setListRoles(res.data.roles);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEditUser = async () => {
    if (field === "name") {
      await axiosBackend
        .post("/um/updateNamaEmail", {
          id: data.id,
          name: InputName,
          email: InputEmail,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
          // reload()
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (field === "phone_number") {
      await axiosBackend
        .post("/um/updateNoHP", {
          id: data.id,
          phone_number: InputPhoneNumber,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
          // reload()
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (field === "role") {
      await axiosBackend
        .post("/um/updateRole", {
          id: data.id,
          role_name: InputRole,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
          // reload()
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (field === "location") {
      await axiosBackend
        .post("/um/updateKantor", {
          id: data.id,
          location: InputLocation,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
          // reload()
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (field === "user_status") {
      await axiosBackend
        .post("/um/updateStatus", {
          id: data.id,
          user_status: InputStatus,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
          // reload()
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    }
    dataSent();
  };

  return (
    <>
      <Card sx={{ width: 305, paddingBottom: 6, paddingTop: 1 }}>
        <CardContent sx={{ paddingBottom: 4 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="p"
              fontWeight={400}
              fontSize={15}
              color="tint.black.40"
              sx={{ marginY: 0.5 }}
            >
              {"Edit User"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: 10 }}
              onClick={handleEditUser}
            >
              {"Ganti"}
            </Button>
          </Stack>
        </CardContent>
        <Collapse in={!Switch} timeout="auto" unmountOnExit>
          <CardContent>
            <Stack spacing={1}>
              {props && data ? EditField[field] : <></>}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
