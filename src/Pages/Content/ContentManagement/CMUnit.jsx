import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Collapse, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Delete from "@mui/icons-material/Delete";
import axiosBackend from "../../../Helper/axiosBackend";
import CMUMerkModelVariant from "./SubPage/CMUnit/CMUMerkModelVariant";
import CMUTahun from "./SubPage/CMUnit/CMUTahun";
import CMUJarakTempuh from "./SubPage/CMUnit/CMUJarakTempuh";
import CMUWarna from "./SubPage/CMUnit/CMUWarna";
import CMUBahanBakar from "./SubPage/CMUnit/CMUBahanBakar";
import CMUTransmisi from "./SubPage/CMUnit/CMUTransmisi";
import CMUKondisiUnit from "./SubPage/CMUnit/CMUKondisiUnit";
import CMUJenisUnit from "./SubPage/CMUnit/CMUJenisUnit";
import axios from "axios";

export default function CMUnit(props) {
  console.log('props CMUnit', props)

  const [ActiveSubPage, setActiveSubPage] = useState(0);
  // const { currentSubTab } = props;
  const [DeleteButton, setDeleteButton] = useState(false);
  const [DeleteChosenId, setDeleteChosenId] = useState([]);
  const [DeleteType, setDeleteType] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const { currentSubTab, dataSort } = props;
  const [filteredData, setFilteredData] = useState([]);

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);

  const changeIcons = (val, type) => {
    setDeleteButton(val.length > 0 ? true : false);
    setDeleteChosenId(val);
    setDeleteType(type);
  };

  const multiDelete = async () => {
    await axiosBackend
      .post(`/delete/${DeleteType}`, {
        id: DeleteChosenId,
      })
      .then((response) => {
        setDeleted(!Deleted);
        console.log(response.data);
      })
      .catch((err) => {
        console.warn(err.response);
      });
  };

  const [dataFiltered, setDataFiltered] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [doMore, setdoMore] = useState(true);

  const dataO = [
    {
      id: 11,
      merek: "Aston Martin",
      model: "Cygnet",
      varian: "1.3 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-10-01 02:59:53",
      deleted_at: "2021-10-01 02:59:53",
    },
    {
      id: 12,
      merek: "Aston Martin",
      model: "Cygnet",
      varian: "2.0 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-10-01 02:59:53",
      deleted_at: "2021-10-01 02:59:53",
    },
    {
      id: 13,
      merek: "Aston Martin",
      model: "Cygnet",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-10-01 07:27:23",
      deleted_at: "2021-10-01 07:27:23",
    },
    {
      id: 14,
      merek: "Aston Martin",
      model: "DB11",
      varian: "5.2 A Design Evolution Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-10-01 02:59:53",
      deleted_at: "2021-10-01 02:59:53",
    },
    {
      id: 15,
      merek: "Aston Martin",
      model: "DB11",
      varian: "V12",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 16,
      merek: "Aston Martin",
      model: "DB11",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 17,
      merek: "Aston Martin",
      model: "DB9",
      varian: "5.9 V12 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 18,
      merek: "Aston Martin",
      model: "DB9",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 19,
      merek: "Aston Martin",
      model: "Rapide",
      varian: "S",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 20,
      merek: "Aston Martin",
      model: "Rapide",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 21,
      merek: "Aston Martin",
      model: "Rapide S",
      varian: "5.9 Luxury Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 22,
      merek: "Aston Martin",
      model: "Rapide S",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 23,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "5.9 S The Ultimate Super GT Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 24,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "5.9 S The Ultime Super GT Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 25,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "5.9 Ultimate GT Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 26,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "59 Ultimate Volente Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 27,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "5.9 Ultime GT Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 28,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "59 Ultime Volente Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 29,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "S",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 30,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "Super GT",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 31,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "Vanquish",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:45:04",
      deleted_at: "2021-09-30 08:45:04",
    },
    {
      id: 32,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "VANTAGE AMR",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 33,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "Violante",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 34,
      merek: "Aston Martin",
      model: "Vanquish",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 35,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "4.7 AMR A Fierce New Breed Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 36,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "4.7 V8 S Race Bred Dynamism Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 37,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "5.9 V12 S Pure Performance Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 38,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "5.9 V12 S Roadster Pure Sports Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 39,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "V12 S",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 40,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "V12 S Roadster",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 41,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "V8 S",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 42,
      merek: "Aston Martin",
      model: "Vantage",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 43,
      merek: "Aston Martin",
      model: "Virage",
      varian: "4.0",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 44,
      merek: "Aston Martin",
      model: "Virage",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
    {
      id: 45,
      merek: "Aston Martin",
      model: "Lain-lain",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:00:50",
      deleted_at: null,
    },
  ];
  const dataT = [
    {
      id: 1,
      merek: "Alfa Romeo",
      model: "156",
      varian: "1.2 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:43:58",
      deleted_at: "2021-09-30 08:43:58",
    },
    {
      id: 2,
      merek: "Alfa Romeo",
      model: "156",
      varian: "2.5 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:43:58",
      deleted_at: "2021-09-30 08:43:58",
    },
    {
      id: 3,
      merek: "Alfa Romeo",
      model: "156",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:43:58",
      deleted_at: "2021-09-30 08:43:58",
    },
    {
      id: 4,
      merek: "Alfa Romeo",
      model: "Giulietta",
      varian: "1.4 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 09:19:23",
      deleted_at: "2021-09-30 09:19:23",
    },
    {
      id: 5,
      merek: "Alfa Romeo",
      model: "Giulietta",
      varian: "1.5 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 09:19:23",
      deleted_at: "2021-09-30 09:19:23",
    },
    {
      id: 6,
      merek: "Alfa Romeo",
      model: "Giulietta",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:43:33",
      deleted_at: "2021-09-30 08:43:33",
    },
    {
      id: 7,
      merek: "Alfa Romeo",
      model: "Spider",
      varian: "3.0 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:43:33",
      deleted_at: "2021-09-30 08:43:33",
    },
    {
      id: 8,
      merek: "Alfa Romeo",
      model: "Spider",
      varian: "3.6 Bensin",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 08:43:33",
      deleted_at: "2021-09-30 08:43:33",
    },
    {
      id: 9,
      merek: "Alfa Romeo",
      model: "Spider",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 09:19:23",
      deleted_at: "2021-09-30 09:19:23",
    },
    {
      id: 10,
      merek: "Alfa Romeo",
      model: "Lain-lain",
      varian: "Lain-lain",
      created_at: "2021-09-30 08:00:50",
      updated_at: "2021-09-30 09:19:23",
      deleted_at: "2021-09-30 09:19:23",
    },
  ];
  const [dew, setDew] = useState([]);

  const doConcat = () => {
    // const dahlah = data
    // const dataThree = dataO.concat(dataT)
    console.log("***doConcat", dew);
  };

  const multiFilter = async (x, index) => {
    // console.log('index', index)
    console.log("---1 dew data", dew);
    setdoMore(false);
    var tempData = [];
    // console.log('get ke => ', x.id)
    const filters = {
      Merek: x.merek,
    };
    console.log("filters => ", filters);
    axios
      .post("https://yodamobi.sagaramedia.id/api/filter", {
        table: "Merek, model, varian",
        filters,
      })
      .then((response) => {
        console.log("++++res multiFilter cmUniiit", response.data.results);
        // pushMerek()
        response.data.results.forEach((x) => {
          // console.log('looping data', x)
          tempData.push({ ...x });
        });
        // console.log('tempdata', tempData)
        console.log("---2 dew data", dew);
        // const dataSatu = dew

        // console.log('&*&% dataCo => ', dataCo.type)
        setTimeout(() => {
          const dataCo = dew.concat(response.data.results);
          setDew(dataCo);
          console.log("dataSettimeout dataCo => ", dataCo);
          console.log("dataSettimeout dew => ", dew);
        }, 3000);
        // setDew([...dew].tempData)
        setdoMore(true);
      })
      .catch((err) => {
        console.warn(err.response);
      });
  };
  const doFilterData = async () => {
    setDew([]);
    var jumlahIndex = [];
    if (props.dataFilter === "") {
      // console.log('filters kosong ')
      await axiosBackend.get("/cm/merek-model-varian").then((response) => {
        var tempData = response.data;
        tempData.forEach((dat, idx) => {
          dat.index = idx + 1;
        });
        setDataFiltered(tempData);
      });
    } else {
      if (props.dataFilterMulti) {
        let users = [];
        for (const item in props.dataFilterMulti) {
          try {
            const filters = {
              Merek: props.dataFilterMulti[item].merek,
            };
            // console.log('filters', filters)
            const resp = await axios.post(
              "https://yodamobi.sagaramedia.id/api/filter",
              {
                table: "Merek, model, varian",
                filters,
              }
            );
            // console.log('resp => ', resp.data.results)
            users.push(resp.data.results);
          } catch (err) {
            console.log(err);
          }
        }

        // console.log('users', users);
        let dewo = [];
        users.forEach((x) => {
          // console.log('x', x)
          x.forEach((y) => {
            dewo.push(y);
          });
        });
        setDataFiltered(dewo);
      } else {
        const filters = {
          Merek: props.dataFilter,
        };
        console.log("filters => ", filters);
        await axios
          .post("https://yodamobi.sagaramedia.id/api/filter", {
            table: "Merek, model, varian",
            filters,
          })
          .then((response) => {
            // console.log('++++res singgle cmUniiit', response)
            setDataFiltered(response.data.results);
          })
          .catch((err) => {
            console.warn(err.response);
          });
      }
    }
  };

  const cekselectedArea = () => {
    console.log("dew", dew);
  };

  const TABS = [
    {
      index: 0,
      label: "Merk, model, varian",
      dataGrid: (
        <CMUMerkModelVariant
          dataFiltered={dataFiltered}
          indexPage={0}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
          filteredData={filteredData}
        />
      ),
    },
    {
      index: 1,
      label: "Tahun",
      dataGrid: (
        <CMUTahun
          indexPage={1}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
    {
      index: 2,
      label: "Jarak tempuh",
      dataGrid: (
        <CMUJarakTempuh
          indexPage={2}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
    {
      index: 3,
      label: "Warna",
      dataGrid: (
        <CMUWarna
          indexPage={3}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
    {
      index: 4,
      label: "Bahan bakar",
      dataGrid: (
        <CMUBahanBakar
          indexPage={4}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
    {
      index: 5,
      label: "Transmisi",
      dataGrid: (
        <CMUTransmisi
          indexPage={5}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
    {
      index: 6,
      label: "Kondisi unit",
      dataGrid: (
        <CMUKondisiUnit
          indexPage={6}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
    {
      index: 7,
      label: "Jenis unit",
      dataGrid: (
        <CMUJenisUnit
          indexPage={7}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          changeIcons={changeIcons}
          val={Deleted}
          dataSort={dataSort}
        />
      ),
    },
  ];

  useEffect(() => {
    if (props.dataFilter) {
      doFilterData();
    }
    if (props.dataFilterMulti) {
      doFilterData();
    }
    currentSubTab(0);
    if(props.filteredData){
      setFilteredData(props.filteredData)
    }
    
  }, [props.dataFilter, props.dataFilterMulti, props.filteredData]);

  return (
    <>
      <div>
        {/* <button onClick={() => doConcat()}>cekselectedArea</button> */}
      </div>
      <Box sx={{ paddingBottom: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1 }}>
            {TABS?.map((tab, index) => (
              <Button
                key={index}
                variant="contained"
                size="large"
                color={ActiveSubPage === index ? "mint20" : "grey20"}
                onClick={() => {
                  setActiveSubPage(index);
                  currentSubTab(index);
                  setDeleteChosenId(false);
                }}
                sx={{ marginRight: 1.5, marginBottom: 1.5 }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
          <Box>
            {!DeleteButton ? (
              <Button
                variant="contained"
                size="large"
                color="switch"
                startIcon={<AddCircleIcon />}
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
              >
                {"Tambah"}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                style={{
                  color: "red",
                  backgroundColor: "#F5F6F7",
                }}
                startIcon={<Delete />}
                onClick={multiDelete}
              >
                {"Hapus"}
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
      {TABS?.map((tb, index) => (
        <Collapse key={index} in={ActiveSubPage === index} timeout="auto">
          {tb.dataGrid}
        </Collapse>
      ))}
    </>
  );
}
