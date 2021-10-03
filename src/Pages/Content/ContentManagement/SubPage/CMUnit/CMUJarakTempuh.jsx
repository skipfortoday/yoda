import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Popover,
} from "@mui/material";
import DynamicContentMenu from "../../../../../Components/Menus/DynamicContentMenu";
import axios from "axios";

const INPUTS = [
  { label: "Jarak tempuh", value: "", error: false, disabled: false },
];

export default function CMUJarakTempuh(props) {
  console.log('props CMUJarakTempuh', props)
  const [Data, setData] = useState([]);
  const [filteredDataJarak, setFilteredDataJarak] = useState([]);
  const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
  const thisToken = sessionStorage.getItem("token");
  // console.log('thisToken CMUJarakTempuh', thisToken)
  const { dataSort, isFilter } = props;

  async function sortJarakTempuhUnitDesc() {
    console.log('Data => Dsc', Data)
    const mydata = [...Data].sort(function (a, b) {
      let x = a.jarak_tempuh.toLowerCase();
      let y = b.jarak_tempuh.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    mydata.map((item) => {
      console.log("item", item);
    });
    setData(mydata);
    console.log("mydata Dsc => ", mydata);
  }

  async function sortJarakTempuhUnitAsc() {
    console.log('Data => Asc', Data)
    const mydata = [...Data].sort(function (a, b) {
      let x = a.jarak_tempuh.toLowerCase();
      let y = b.jarak_tempuh.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    mydata.map((item) => {
      console.log("item", item);
    });
    setData(mydata);
    console.log("mydata Asc => ", mydata);
  }

  useEffect(() => {
    if (dataSort) {
      console.log('dataSort')
      if (dataSort === "jarakTempuhUnitDesc") {
        sortJarakTempuhUnitDesc();
      }
      if (dataSort === "jarakTempuhUnitAsc") {
        sortJarakTempuhUnitAsc();
      }
    }else{
      sortJarakTempuhUnitDesc();
    }
    if(isFilter){
      console.log('props filteredDataJarak', props.filteredDataJarak)
      setData(props.filteredDataJarak)
    }
  }, [isFilter, dataSort]);
  
  useEffect(() => {
    setMenuAnchorEl(null);
    ResetInputs();
    // LoadData();
  }, [props.val]);

  async function LoadData() {
    await axios
      .get(`${baseURL}/cm/jarak-tempuh`, {
        headers: {
          Authorization: `Bearer ${thisToken}`,
        },
      })
      .then((response) => {
        var tempData = response.data;
        tempData.forEach((dat, idx) => {
          dat.index = idx + 1;
        });
        setData(tempData);
      });
  }

  const { indexPage, ActiveSubPage } = props;
  const { isMenuOpen } = props;
  const { MenuanchorEl, setMenuAnchorEl } = props;

  const [InputJarakTempuh, setInputJarakTempuh] = useState(INPUTS[0]);

  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
    }
  }

  function ResetInputs() {
    setInputJarakTempuh(INPUTS[0]);
  }

  async function InsertData() {
    await axios
      .post("/cm/jarak-tempuh", {
        headers: {
          Authorization: `Bearer ${thisToken}`,
        },
        jarak_tempuh: InputJarakTempuh.value,
      })
      .then((response) => {
        console.log(response.data);
        setMenuAnchorEl(null);
        ResetInputs();
        LoadData();
      })
      .catch((err) => {
        console.warn(err.response);
      });
  }

  const DATAGRID_COLUMNS = [
    { field: "index", headerName: "#" },
    { field: "id", headerName: "ID", hide: true },
    {
      field: "jarak_tempuh",
      headerName: "Jarak tempuh unit",
      minWidth: 180,
      flex: 1,
    },
  ];

  return (
    <>
      {indexPage !== ActiveSubPage ? null : (
        <Popover
          open={isMenuOpen}
          anchorEl={MenuanchorEl}
          onClose={() => setMenuAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <DynamicContentMenu
            header={"Tambah baru"}
            actionButtons={
              <>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Tambah
                </Button>
              </>
            }
          >
            <FormControl
              variant="outlined"
              color="primary"
              fullWidth
              error={InputJarakTempuh.error}
            >
              <InputLabel htmlFor="input-1">
                {InputJarakTempuh.label}
              </InputLabel>
              <OutlinedInput
                id="input-1"
                type="text"
                value={InputJarakTempuh.value}
                onChange={(e) =>
                  setInputJarakTempuh({
                    ...InputJarakTempuh,
                    value: e.target.value,
                  })
                }
                label={InputJarakTempuh.label}
              />
            </FormControl>
            {/* <Autocomplete
              disablePortal
              id="asd1"
              options={top100Films}
              fullWidth
              size="large"
              renderInput={(params) => <TextField {...params} label="Movie" />}
              popupIcon={<ChevronRightIcon />}
            /> */}
          </DynamicContentMenu>
        </Popover>
      )}
      <Box fullWidth sx={{ maxHeight: "70vh", height: "70vh" }}>
        <DataGrid
          columns={DATAGRID_COLUMNS}
          rows={Data}
          checkboxSelection
          onSelectionModelChange={(newId) => {
            props.changeIcons(newId, "jarak-tempuh");
            console.log(newId);
          }}
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
}
