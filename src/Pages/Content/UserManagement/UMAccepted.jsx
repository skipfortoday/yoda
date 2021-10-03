import React, { useState, useEffect } from "react";
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

export default function UMAccepted(props) {
  console.log("props UMAccepted", props);
  const [ActiveSubPage, setActiveSubPage] = useState(0);
  const { reload, currentSubTab } = props;
  const [ActiveRole, setActiveRole] = useState(0);
  const [EditData, setEditData] = useState(null);
  const [data, setdata] = useState(props.data)

  const [CurentData, setCurentData] = useState([]);
  const [CurentDataFiltered, setCurentDataFiltered] = useState([]);
  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMainMenuOpen = Boolean(MenuanchorEl);

  const [popup, setPopup] = useState(false);
  useEffect(() => {
    handleChangeTab(0);
  }, []);

  function myFunctionDesc() {
    const mydata = [...CurentDataFiltered].sort(function(a, b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
    setCurentDataFiltered(mydata)
    console.log('mydata', mydata)
  }

  function myFunctionAsc() {
    const mydata = [...CurentDataFiltered].sort(function(a, b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    data.map((item) => {
      console.log('item', item.name)
    })
    setCurentDataFiltered(mydata)
    console.log('mydata', mydata)
  }

  function sortHpDesc() {
    const mydata = [...CurentDataFiltered].sort(function(a, b){
      let x = a.phone_number;
      let y = b.phone_number;
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
    setCurentDataFiltered(mydata)
    console.log('mydata', mydata)
  }

  function sortHpAsc() {
    const mydata = [...CurentDataFiltered].sort(function(a, b){
      let x = a.phone_number;
      let y = b.phone_number;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    data.map((item) => {
      console.log('item', item.name)
    })
    setCurentDataFiltered(mydata)
    console.log('mydata', mydata)
  }

  function sortDateAsc() {
    const mydata = [...CurentDataFiltered].sort((a, b) => (new Date(a.created_at)) - (new Date(b.created_at)))

    setCurentDataFiltered(mydata)
  }

  function sortDateDesc() {
    const mydata = [...CurentDataFiltered].sort((a, b) => (new Date(b.created_at)) - new Date(a.created_at))

    setCurentDataFiltered(mydata)
  }

  // const [SelectedItems, setSelectedItems] = useState([])

  // console.warn(SelectedItems)

  useEffect(() => {
    if(props.dataSort){
      if(props.dataSort === "nameDesc"){
        myFunctionDesc()
      }
      if(props.dataSort === "nameAsc"){
        myFunctionAsc()
      }
      if(props.dataSort === "hpAsc"){
        sortHpAsc()
      }
      if(props.dataSort === "hpDesc"){
        sortHpDesc()
      }
      if(props.dataSort === "dateAsc"){
        sortDateAsc()
      }
      if(props.dataSort === "dateDesc"){
        sortDateDesc()
      }
    }
  }, [props.dataSort])

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
    console.log("tempData", tempData);
    setCurentData(tempData);
    setCurentDataFiltered(tempData);
    // setCurentData(data)
  };

  const DATAGRID_COLUMNS = [
    { field: "index", headerName: "#" },
    { field: "id", headerName: "ID", hide: true },
    {
      field: "name",
      headerName: "Nama & email",
      minWidth: 300,
      flex: 1,
      renderCell: StylingNameEmail,
    },
    { field: "phone_number", headerName: "No. Handphone", minWidth: 160 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      renderCell: StylingRole,
    },
    { field: "location", headerName: "Kantor", minWidth: 160 },
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

  function StylingNameEmail(params) {
    return (
      <AvatarNameEmail
        name={params.row.name}
        email={params.row.email}
        profile_picture={params.row.profile_picture}
      />
    );
  }

  function StylingDateRegister(params) {
    return <DateRegister created_at={params.row.created_at} />;
  }

  function StylingRole(params) {
    return <Typography fontSize={14}>{params.value}</Typography>;
  }

  function StylingStatus(params) {
    return (
      <Typography
        fontSize={14}
        color={
          params.value.toLowerCase() === "active"
            ? "success.main"
            : params.value.toLowerCase() === "aktif"
            ? "success.main"
            : params.value.toLowerCase() === "not active"
            ? "tint.yellow"
            : params.value.toLowerCase() === "tidak aktif"
            ? "tint.yellow"
            : params.value.toLowerCase() === "non aktif"
            ? "tint.yellow"
            : "text.primary"
        }
      >
        {params.value}
      </Typography>
    );
  }

  const TABS = [
    { index: 0, label: "Internal" },
    { index: 1, label: "External" },
  ];

  const filterData = () => {
    console.log("CurentData", CurentData);
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

  useEffect(() => {
    if (props.dataFilter) {
      filterData();
      // if(props.dataFilter !== ''){
      //   filterData()
      // }
    }

  }, [props.dataFilter]);

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
        <Popover
          open={isMainMenuOpen}
          onClose={() => setMenuAnchorEl(null)}
          anchorEl={MenuanchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <UMEdit
            data={EditData}
            // acceptBtnClick={() => {}}
            setMenuAnchorEl={setMenuAnchorEl}
            reload={reload}
            // fromPage={fromPage}
          />
        </Popover>
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={CurentDataFiltered}
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
          onSelectionModelChange={(rows) => console.log(rows)}
          onCellClick={(e) => {
            setMenuAnchorEl(true);
            setEditData(e);
          }}
        />
      </Box>
    </>
  );
}
