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
  console.log(props.data, "EDIT USER");
  const { data, reload } = props;
  const { setMenuAnchorEl } = props;
  const [Switch, setSwitch] = useState(false);
  const [ListKantor, setListKantor] = useState([]);
  const [ListRoles, setListRoles] = useState([]);

  const [InputName, setInputName] = useState(data.row.name);
  const [InputEmail, setInputEmail] = useState(data.row.email);
  const [InputPhoneNumber, setInputPhoneNumber] = useState("");
  const [InputRole, setInputRole] = useState(data.row.role);
  const [InputLocation, setInputLocation] = useState(data.row.location);
  const [InputStatus, setInputStatus] = useState(data.row.user_status);
  // console.log(InputRole)

  useEffect(() => {
    loadKantor();
    loadRoles();
  }, []);

  const loadKantor = async () => {
    await axiosBackend
      .get("/dropdown-kantor")
      .then((res) => {
        console.log(res, "RES LIST KANTOR");
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
        console.log(res.data.roles, "RES LIST ROLES");
        setListRoles(res.data.roles);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEditUser = async () => {
    if (data.field === "name") {
      console.log(InputName, "IN");
      console.log(InputEmail, "IE");
      await axiosBackend
        .post("/um/updateNamaEmail", {
          id: data.row.id,
          name: InputName,
          email: InputEmail,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (data.field === "phone_number") {
      await axiosBackend
        .post("/um/updateNoHP", {
          id: data.row.id,
          phone_number: InputPhoneNumber,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (data.field === "role") {
      await axiosBackend
        .post("/um/updateRole", {
          id: data.row.id,
          role_name: InputRole,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (data.field === "location") {
      await axiosBackend
        .post("/um/updateKantor", {
          id: data.row.id,
          location: InputLocation,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    } else if (data.field === "user_status") {
      await axiosBackend
        .post("/um/updateStatus", {
          id: data.row.id,
          user_status: InputStatus,
        })
        .then((res) => {
          console.log(res);
          setMenuAnchorEl(null);
        })
        .catch((err) => {
          console.log(err.response);
          setMenuAnchorEl(null);
        });
    }
    // const config = {
    //   target_email: data.email,
    //   user_status: "Active",
    //   role: Switch ? "External" : InputRole.value,
    //   location: InputKantor.value,
    // };
    // console.warn(config);

    // if (Switch) {
    //   SendData();
    // } else {
    //   if (InputRole.value === "") {
    //     setInputRole({ ...InputRole, error: true });
    //   } else {
    //     setInputRole({ ...InputRole, error: false });
    //   }
    //   if (InputKantor.value === "") {
    //     setInputKantor({ ...InputKantor, error: true });
    //   } else {
    //     setInputKantor({ ...InputKantor, error: false });
    //   }
    //   if (InputRole.value !== "" && InputKantor.value !== "") {
    //     SendData();
    //   }
    // }
    reload()
  };

  const SendData = async () => {
    // console.log("SEND DATA");
    await axiosBackend
      .post("/user-management", {
        target_email: data.email,
        user_status: "Active",
        role: Switch ? "External" : InputRole.value,
        location: Switch ? "Not set" : InputKantor.value,
      })
      .then((response) => {
        console.log(response.data);
        acceptBtnClick();
        setMenuAnchorEl(null);
      })
      .catch((err) => {
        console.warn(err.response);
      });
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
              {props.data.field === "name" ? (
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
                    defaultValue={data.row.name}
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
                    defaultValue={data.row.email}
                  ></Input>
                </>
              ) : (
                <></>
              )}
              {props.data.field === "phone_number" ? (
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
                    defaultValue={data.row.phone_number}
                  ></Input>
                </>
              ) : (
                <></>
              )}
              {props.data.field === "role" ? (
                <>
                  <InputLabel htmlFor="input-1">Role</InputLabel>

                  <Select labelId="roles" id="roles" value={InputRole}>
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
              ) : (
                <></>
              )}
              {props.data.field === "location" ? (
                <>
                  <InputLabel htmlFor="input-1">Kantor</InputLabel>
                  <Select
                    labelId="location"
                    id="location"
                    value={InputLocation}
                  >
                    {ListKantor?.map((data, idx) => {
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
              ) : (
                <></>
              )}
              {props.data.field === "user_status" ? (
                <>
                  <InputLabel htmlFor="input-1">Status</InputLabel>
                  <Select labelId="roles" id="roles" value={InputStatus.toString()}>
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
                      value="Non Aktif"
                      key="1"
                      onClick={() => {
                        setInputStatus("Non Aktif");
                      }}
                    >
                      Non Aktif
                    </MenuItem>
                  </Select>
                </>
              ) : (
                <></>
              )}
              {/* <Autocomplete
                disablePortal
                id="asd1"
                options={ROLES}
                fullWidth
                // size="large"
                value={InputRole.value}
                onChange={(event, newValue) => {
                  setInputRole({...InputRole, value: newValue==null?'':newValue.label});
                }}
                // getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField error={InputRole.error} {...params} label="Role" />}
                popupIcon={<ChevronRightIcon />}
              />
              <Autocomplete
                disablePortal
                id="asd2"
                options={OFFICES}
                fullWidth
                // size="large"
                value={InputKantor.value}
                onChange={(event, newValue) => {
                  setInputKantor({...InputKantor, value: newValue==null?'':newValue.label});
                }}
                // getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} error={InputKantor.error} label="Kantor" />}
                popupIcon={<ChevronRightIcon />}
              /> */}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
