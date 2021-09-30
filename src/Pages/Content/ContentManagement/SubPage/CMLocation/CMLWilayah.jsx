import React, { useState, useEffect } from "react";
import axiosBackend from "../../../../../Helper/axiosBackend";
import axiosBackend2 from "../../../../../Helper/axiosBackend2nd";
import axios from "axios";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import TextPrimarySecondary from "../../../../../Components/DataGridComponents/TextPrimarySecondary";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Popover,
  Select,
  MenuItem,
} from "@mui/material";
import DynamicContentMenu from "../../../../../Components/Menus/DynamicContentMenu";
import DateRegister from "../../../../../Components/DataGridComponents/DateRegister";

const INPUTS = [
  { label: "Provinsi", value: "", error: false, disabled: false },
  { label: "Kota", value: "", error: false, disabled: false },
  { label: "Kecamatan", value: "", error: false, disabled: false },
  { label: "Cabang pengelola", value: "", error: false, disabled: false },
];

export default function CMLWilayah(props) {
  const [Data, setData] = useState([]);
  const [Wilayah, setWilayah] = useState([]);
  const [ProvinsiArr, setProvinsiArr] = useState([]);
  const [Provinsi, setProvinsi] = useState([]);
  const [KotaArr, setKotaArr] = useState([]);
  const [Kota, setKota] = useState([]);
  const [KecamatanArr, setKecamatanArr] = useState([]);
  const [Kecamatan, setKecamatan] = useState([]);

  useEffect(() => {
    LoadData();
    getWilayah();
  }, []);

  async function LoadData() {
    await axiosBackend.get("/cm/wilayah").then((response) => {
      var tempData = response.data;
      tempData.forEach((dat, idx) => {
        dat.index = idx + 1;
      });
      setData(tempData);
    });
  }

  async function getWilayah() {
    await axios
      .get("https://yodamobi.sagaramedia.id/api/dropdown/indonesia")
      .then((response) => {
        var tempData = response.data;
        console.log(tempData);
        let listProvinsi = tempData.data.filter(
          (v, i, a) => a.findIndex((t) => t.provinsi === v.provinsi) === i
        );

        setWilayah(tempData.data);
        setProvinsiArr(listProvinsi)
      });
  }

  async function filterDaerah(nama, daerah) {
    let listDaerah = Wilayah.filter(item => item[daerah] === nama );

    if(daerah === "provinsi"){
      listDaerah = listDaerah.filter(
        (v, i, a) => a.findIndex((t) => t.kota === v.kota) === i
      );
      setKotaArr(listDaerah)
    }else if(daerah === "kota"){
      listDaerah = listDaerah.filter(
        (v, i, a) => a.findIndex((t) => t.kecamatan === v.kecamatan) === i
      );
      setKecamatanArr(listDaerah)
    }
  }

  const { indexPage, ActiveSubPage } = props;
  const { isMenuOpen } = props;
  const { MenuanchorEl, setMenuAnchorEl } = props;

  const [InputProvince, setInputProvince] = useState(INPUTS[0]);
  const [InputCity, setInputCity] = useState(INPUTS[1]);
  const [InputKecamatan, setInputKecamatan] = useState(INPUTS[2]);
  const [InputCabangPengelola, setInputCabangPengelola] = useState(INPUTS[3]);

  function handleSubmit() {
    var isPassed = true;
    // Validation
    if (isPassed) {
      InsertData();
      ResetInputs();
    }
  }

  function ResetInputs() {
    setInputProvince(INPUTS[0]);
    setInputCity(INPUTS[1]);
    setInputKecamatan(INPUTS[2]);
    setInputCabangPengelola(INPUTS[3]);
  }

  async function InsertData() {
    await axiosBackend
      .post("/cm/wilayah", {
        provinsi: InputProvince.value,
        kota: InputCity.value,
        kecamatan: InputKecamatan.value,
        cabang_pengelola: InputCabangPengelola.value,
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
    { field: "provinsi", headerName: "Provinsi", minWidth: 120, flex: 1 },
    { field: "kota", headerName: "Kota", minWidth: 160, flex: 1 },
    { field: "kecamatan", headerName: "Kecamatan", minWidth: 160, flex: 1 },
    {
      field: "cabang_pengelola",
      headerName: "Cabang pengelola",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "tanggal_registrasi",
      headerName: "Tanggal registrasi",
      minWidth: 160,
      renderCell: StylingDateRegister,
    },
  ];

  function StylingDateRegister(params) {
    return <DateRegister created_at={params.row.tanggal_registrasi} />;
  }

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
            // actionButtons={
            //   <>
            //     <Button size="large" fullWidth variant="contained" onClick={handleSubmit} >Tambah</Button>
            //   </>
            // }
          >
            <FormControl
              variant="outlined"
              color="primary"
              fullWidth
              error={InputProvince.error}
            >
              <InputLabel htmlFor="input-1">{InputProvince.label}</InputLabel>
              {/* <OutlinedInput
                id="input-1"
                type="text"
                value={InputProvince.value}
                onChange={(e) =>
                  setInputProvince({ ...InputProvince, value: e.target.value })
                }
                label={InputProvince.label}
              /> */}
              <Select
                labelId="provinsi"
                id="provinsi"
                value={Provinsi}
              >
                {ProvinsiArr?.map((data, idx) => {
                  return (
                  <MenuItem value={data.provinsi} key={idx} onClick={() => {
                    filterDaerah(data.provinsi, "provinsi")
                    setProvinsi(data.provinsi)
                  }}>
                    {data.provinsi}
                  </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              color="primary"
              fullWidth
              error={InputCity.error}
            >
              <InputLabel htmlFor="input-2">{InputCity.label}</InputLabel>
              {/* <OutlinedInput
                id="input-2"
                type="text"
                value={InputCity.value}
                onChange={(e) =>
                  setInputCity({ ...InputCity, value: e.target.value })
                }
                label={InputCity.label}
              /> */}
              <Select
                labelId="kota"
                id="kota"
                value={Kota}
              >
                {KotaArr?.map((data, idx) => {
                  return (
                  <MenuItem value={data.kota} key={idx} onClick={() => {
                    filterDaerah(data.kota, "kota")
                    setKota(data.kota)
                  }}>
                    {data.kota}
                  </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              color="primary"
              fullWidth
              error={InputKecamatan.error}
            >
              <InputLabel htmlFor="input-3">{InputKecamatan.label}</InputLabel>
              {/* <OutlinedInput
                id="input-3"
                type="text"
                value={InputKecamatan.value}
                onChange={(e) =>
                  setInputKecamatan({
                    ...InputKecamatan,
                    value: e.target.value,
                  })
                }
                label={InputKecamatan.label}
              /> */}
              <Select
                labelId="kecamatan"
                id="kecamatan"
                value={Kecamatan}
              >
                {KecamatanArr?.map((data, idx) => {
                  return (
                  <MenuItem value={data.kecamatan} key={idx} onClick={() => {
                    setKecamatan(data.kecamatan)
                  }}>
                    {data.kecamatan}
                  </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              color="primary"
              fullWidth
              error={InputCabangPengelola.error}
            >
              <InputLabel htmlFor="input-4">
                {InputCabangPengelola.label}
              </InputLabel>
              <OutlinedInput
                id="input-4"
                type="text"
                value={InputCabangPengelola.value}
                onChange={(e) =>
                  setInputCabangPengelola({
                    ...InputCabangPengelola,
                    value: e.target.value,
                  })
                }
                label={InputCabangPengelola.label}
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
          disableColumnResize={false}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
}
