import React, { useState, useEffect, useReducer } from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import AvatarNameEmail from "../../../Components/DataGridComponents/AvatarNameEmail";
import DateRegister from "../../../Components/DataGridComponents/DateRegister";
import {
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Popover,
} from "@mui/material";
import UMEdit from "./UMEdit";
import PopupEdit from "../../../Components/DataGridComponents/PopupEdit.jsx";
import axios from "axios";

export default function UMAccepted(props) {
  console.log("props UMAccepted", props);
  const [ActiveSubPage, setActiveSubPage] = useState(0);
  const { reload, currentSubTab, isFilter } = props;
  const [ActiveRole, setActiveRole] = useState(0);
  const [EditData, setEditData] = useState(null);
  const [data, setdata] = useState(props.data);

  const [CurentData, setCurentData] = useState([]);
  const [CurentDataFiltered, setCurentDataFiltered] = useState([]);
  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMainMenuOpen = Boolean(MenuanchorEl);

  const [popup, setPopup] = useState(false);
  useEffect(() => {
    handleChangeTab(0);
  }, []);

  useEffect(() => {
    let val;
    if (ActiveRole === 0) {
      val = props.data.filter((user) => {
        return (
          user?.role?.name !== "Super Admin" &&
          user.user_status.toString().toLowerCase() !== "unconfirmed" &&
          user.user_status.toString().toLowerCase() !== "rejected" &&
          user.role.toString().toLowerCase() !== "external"
        );
      });
    } else if (ActiveRole === 1) {
      val = props.data.filter((user) => {
        return (
          user?.role?.name !== "Super Admin" &&
          user.user_status.toString().toLowerCase() !== "unconfirmed" &&
          user.user_status.toString().toLowerCase() !== "rejected" &&
          user.role.toString().toLowerCase() === "external"
        );
      });
    }
    val = val.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

    val.forEach((user, index) => {
      user.index = index + 1;
    });
    setCurentData(val);
  }, [props.data]);

  useEffect(() => {
    if (props.filteredData.length === 0) {
      handleChangeTab(ActiveSubPage);
      console.log("IFIFIFIFIFIFIFIFIFI", props.filteredData);
    } else {
      console.log("ELSEELSEELSEELSE", props.filteredData);
      let val;
      if (ActiveRole === 0) {
        val = props.filteredData.filter((user) => {
          return (
            user?.role?.name !== "Super Admin" &&
            user.user_status.toString().toLowerCase() !== "unconfirmed" &&
            user.user_status.toString().toLowerCase() !== "rejected" &&
            user.role.toString().toLowerCase() !== "external"
          );
        });
      } else if (ActiveRole === 1) {
        val = props.filteredData.filter((user) => {
          return (
            user?.role?.name !== "Super Admin" &&
            user.user_status.toString().toLowerCase() !== "unconfirmed" &&
            user.user_status.toString().toLowerCase() !== "rejected" &&
            user.role.toString().toLowerCase() === "external"
          );
        });
      }

      val = val.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

      val.forEach((user, index) => {
        user.index = index + 1;
      });
      setCurentData(val);
    }
  }, [props.filteredData]);

  function myFunctionDesc() {
    const mydata = [...CurentDataFiltered].sort(function (a, b) {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    setCurentDataFiltered(mydata);
    console.log("mydata", mydata);
  }

  // (function reloadSelf() {
  //   setTimeout(() => {
  //     console.log("Executing");
  //     setCurentData([])
  //   },5000)
  // })()

  function myFunctionAsc() {
    const mydata = [...CurentDataFiltered].sort(function (a, b) {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    data.map((item) => {
      console.log("item", item.name);
    });
    setCurentDataFiltered(mydata);
    console.log("mydata", mydata);
  }

  function sortHpDesc() {
    const mydata = [...CurentDataFiltered].sort(function (a, b) {
      let x = a.phone_number;
      let y = b.phone_number;
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    setCurentDataFiltered(mydata);
    console.log("mydata", mydata);
  }

  function sortHpAsc() {
    const mydata = [...CurentDataFiltered].sort(function (a, b) {
      let x = a.phone_number;
      let y = b.phone_number;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    data.map((item) => {
      console.log("item", item.name);
    });
    setCurentDataFiltered(mydata);
    console.log("mydata", mydata);
  }

  function sortDateAsc() {
    const mydata = [...CurentDataFiltered].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    setCurentDataFiltered(mydata);
  }

  function sortDateDesc() {
    const mydata = [...CurentDataFiltered].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setCurentDataFiltered(mydata);
  }

  // const [SelectedItems, setSelectedItems] = useState([])

  // console.warn(SelectedItems)

  useEffect(() => {
    if (props.dataSort) {
      if (props.dataSort === "nameDesc") {
        myFunctionDesc();
      }
      if (props.dataSort === "nameAsc") {
        myFunctionAsc();
      }
      if (props.dataSort === "hpAsc") {
        sortHpAsc();
      }
      if (props.dataSort === "hpDesc") {
        sortHpDesc();
      }
      if (props.dataSort === "dateAsc") {
        sortDateAsc();
      }
      if (props.dataSort === "dateDesc") {
        sortDateDesc();
      }
    }
  }, [props.dataSort]);

  const handleChangeTab = (newTabIndex) => {
    setActiveRole(newTabIndex);
    var tempData = [];
    var filteredData = data?.filter((data) => {
      if (newTabIndex === 0)
        return data?.role?.toString().toLowerCase() !== "external";
      else if (newTabIndex === 1)
        return data?.role?.toString().toLowerCase() === "external";
      // else return data.id === 1;
    });

    filteredData.forEach((data, idx) => {
      tempData.push({ ...data, index: idx + 1 });
    });

    console.log(tempData, "TFTFTF");
    if (newTabIndex === 1) {
      setCurentData(tempData);
      // GetAllUsers()
    }
    if (newTabIndex === 0) {
      setCurentData(tempData);
      // filterData()
      // setCurentDataFiltered(tempData);
      // GetAllUsersInternal()
    }
    // GetAllUsers()
    // console.log("tempData handleChangeTab", tempData);
    // setCurentData(tempData);
    // setCurentDataFiltered(tempData);
    // setCurentData(data)
  };

  const DATAGRID_COLUMNS = ActiveSubPage === 0 ? [
    { field: "index", headerName: "#" },
    { field: "id", headerName: "ID", hide: true },
    {
      field: "name",
      headerName: "Nama & email",
      minWidth: 280,
      // flex: 1,
      renderCell: StylingNameEmail,
    },
    {
      field: "phone_number",
      headerName: "No. Handphone",
      minWidth: 160,
      renderCell: StylingPhoneNumber,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      renderCell: StylingRole,
    },
    {
      field: "location",
      headerName: "Kantor",
      minWidth: 160,
      renderCell: StylingLocation,
    },
    {
      field: "created_at",
      headerName: "Tanggal registrasi",
      minWidth: 160,
      renderCell: StylingDateRegister,
    },
    {
      field: "user_status",
      headerName: "Status",
      minWidth: 130,
      renderCell: StylingStatus,
    },
    { field: "user_code", headerName: "Kode user", minWidth: 130 },
  ]:[
    { field: "index", headerName: "#" },
    { field: "id", headerName: "ID", hide: true },
    {
      field: "name",
      headerName: "Nama & email",
      minWidth: 280,
      // flex: 1,
      renderCell: StylingNameEmail,
    },
    {
      field: "phone_number",
      headerName: "No. Handphone",
      minWidth: 160,
      renderCell: StylingPhoneNumber,
    },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   minWidth: 150,
    //   renderCell: StylingRole,
    // },
    // {
    //   field: "location",
    //   headerName: "Kantor",
    //   minWidth: 160,
    //   renderCell: StylingLocation,
    // },
    {
      field: "created_at",
      headerName: "Tanggal registrasi",
      minWidth: 160,
      renderCell: StylingDateRegister,
    },
    {
      field: "user_status",
      headerName: "Status",
      minWidth: 130,
      renderCell: StylingStatus,
    },
    { field: "user_code", headerName: "Kode user", minWidth: 130 },
  ];

  const dataSent = () => {
    // handleChangeTab(0)
    reload();
  };

  function StylingNameEmail(params) {
    return (
      <PopupEdit
        row={params.row}
        reload={reload}
        fromPage={"UM"}
        fromTable={"name"}
        dataSent={dataSent}
      />
    );
  }

  function StylingPhoneNumber(params) {
    return (
      <PopupEdit
        row={params.row}
        reload={reload}
        fromPage={"UM"}
        fromTable={"phone_number"}
        dataSent={dataSent}
      />
    );
  }

  function StylingLocation(params) {
    return (
      <PopupEdit
        row={params.row}
        reload={reload}
        fromPage={"UM"}
        fromTable={"location"}
        dataSent={dataSent}
      />
    );
  }

  function StylingDateRegister(params) {
    return <DateRegister created_at={params.row.created_at} />;
  }

  function StylingRole(params) {
    return (
      <PopupEdit
        row={params.row}
        reload={reload}
        fromTable={"role"}
        value={params.value}
        fromPage={"UM"}
        dataSent={dataSent}
      />
    );
  }

  function StylingStatus(params) {
    return (
      <PopupEdit
        row={params.row}
        reload={reload}
        fromTable={"user_status"}
        value={params.value}
        fromPage={"UM"}
        dataSent={dataSent}
      />
    );
  }

  const TABS = [
    { index: 0, label: "Internal" },
    { index: 1, label: "External" },
  ];

  const filterData = () => {
    console.log("filterData CurentData", CurentData);
    if (CurentData.length > 0) {
      if (props.dataFilter === "Reset") {
        setCurentDataFiltered(CurentData);
      } else {
        var aquaticCreatures = CurentData.filter(function (item) {
          return item.location === props.dataFilter;
        });

        // console.log(aquaticCreatures);
        setCurentDataFiltered(aquaticCreatures);
        console.log("aquaticCreatures", aquaticCreatures);
      }
    }
  };

  // async function GetAllUsers() {
  //   const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV

  //   // console.log('GetAllUsers')
  //   // var AllUsers = [];
  //   try {
  //     const data = await axios.post(`${baseURL}/filterExternal`, {
  //       role: "",
  //       Status: "",
  //       cabang: ""
  //     })
  //     console.log('data GetAllUsers External UMAccepted', data.data.results)
  //     setCurentDataFiltered(data.data.results);
  //     // if(data.status === 200){
  //     //   AllUsers = data.data.results
  //     //   console.log('AllUsers', AllUsers)
  //     //   return AllUsers
  //     // }
  //   } catch (err){
  //     console.log('err', err)
  //   }
  // }

  // async function GetAllUsersInternal() {
  //   const thisToken = sessionStorage.getItem('token')
  //   console.log('thisToken', thisToken)
  //   // const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV
  //   const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV

  //   // console.log('GetAllUsers')
  //   var AllUsers = [];
  //   try {
  //     const data = await axios.post(`${baseURL}/filterUser`, {
  //       role: "",
  //       Status: "",
  //       cabang: ""
  //     })
  //     console.log('data GetAllUsersInternal', data.data.results)
  //     setCurentDataFiltered(data.data.results);
  //   } catch (err){
  //     console.log('err', err)
  //   }
  // }

  useEffect(() => {
    if (props.dataFilter && props.filteredData.length === 0) {
      // filterData();
      // if(props.dataFilter !== ''){
      //   filterData()
      // }
    }
    if (props.filteredDataEx.length === 0 && !isFilter) {
      // GetAllUsers()
    }

    // if (props.filteredDataEx.length > 0 && isFilter) {
    //   console.log('props.filteredDataEx', props.filteredDataEx)
    //   setCurentDataFiltered(props.filteredDataEx);
    // }
    if (props.filteredData.length > 0 && isFilter) {
      console.log("props.filteredData", props.filteredData);
      setCurentDataFiltered(props.filteredData);
    }
    if (props.filteredDataEx.length > 0 && isFilter) {
      console.log("++props.filteredDataEx", props.filteredDataEx);
      setCurentDataFiltered(props.filteredDataEx);
    }
  }, [props.dataFilter, props.filteredDataEx, isFilter]);

  return (
    <>
      {/* <button onClick={() => filterData()}>cek</button> */}
      <Stack direction="row" spacing={1.5} sx={{ paddingBottom: 3 }}>
        {TABS?.map((tab, index) => (
          <Button
            key={index}
            variant="contained"
            size="large"
            color={ActiveRole === index ? "mint20" : "grey20"}
            onClick={() => {
              setActiveSubPage(index);
              currentSubTab(index);
              handleChangeTab(index);
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Stack>
      <Box fullWidth sx={{ maxHeight: "70vh", height: "70vh" }}>
        {/* <Popover
            open={isMainMenuOpen}
            onClose={() => setMenuAnchorEl(null)}
            anchorEl={MenuanchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
          >
            <UMEdit
              data={EditData}
              // acceptBtnClick={() => {}}
              setMenuAnchorEl={setMenuAnchorEl}
              reload={reload}
              // fromPage={fromPage}
            />
          </Popover> */}
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={CurentData}
          checkboxSelection
          disableColumnResize={false}
          disableSelectionOnClick
          // onSelectionModelChange={(ids) => {
          //   const selectedIDs = new Set(ids);
          //   const selectedRowData = CurentDataFiltered.filter((row) =>
          //     selectedIDs.has(row.id.toString())
          //   )
          //   console.log(selectedRowData);
          // }}
          onSelectionModelChange={(rows) => {
            console.log(
              "ACCEPTACCEPTACCEPTACCEPTACCEPTACCEPTACCEPTACCEPTACCEPTACCEPTACCEPT",
              rows
            );
          }}
          onCellClick={(e) => {
            setMenuAnchorEl(true);
            setEditData(e);
          }}
        />
      </Box>
    </>
  );
}
