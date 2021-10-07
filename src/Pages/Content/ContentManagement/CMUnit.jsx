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
  console.log("props CMUnit", props);

  const [ActiveSubPage, setActiveSubPage] = useState(0);
  // const { currentSubTab } = props;
  const [DeleteButton, setDeleteButton] = useState(false);

  // reRender digunakan untuk meload data kembali setelah hapus
  const [reRender, setRerender] = useState(false);
  const [DeleteChosenId, setDeleteChosenId] = useState([]);
  const [DeleteType, setDeleteType] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const { currentSubTab, dataSort, isFilter, filteredDataTahun } = props;
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataJarak, setFilteredDataJarak] = useState([]);

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);

  // Fungsi yang di lempaer ke props untuk menyelesaikan re render
  const vRerender = () => {
    setRerender(false);
  };

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
        setRerender(true);
      })
      .catch((err) => {
        console.warn(err.response);
      });
  };

  const [dataFiltered, setDataFiltered] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [doMore, setdoMore] = useState(true);

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
      .post(`${process.env.REACT_APP_BACKEND_ENDPOINT_PROD}/filter`, {
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
              `${process.env.REACT_APP_BACKEND_ENDPOINT_PROD}/filter`,
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
          .post(`${process.env.REACT_APP_BACKEND_ENDPOINT_PROD}/filter`, {
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
          isFilter={isFilter}
          reRender={reRender}
          vRerender={vRerender}
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
          filteredData={filteredData}
          filteredDataTahun={filteredDataTahun}
          isFilter={isFilter}
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
          filteredData={filteredData}
          filteredDataJarak={filteredDataJarak}
          isFilter={isFilter}
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
          filteredData={filteredData}
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
          filteredData={filteredData}
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
          filteredData={filteredData}
          val={Deleted}
          dataSort={dataSort}
          setRerender={setRerender}
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
          filteredData={filteredData}
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
          filteredData={filteredData}
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
    // currentSubTab(0);
    if (props.filteredData) {
      setFilteredData(props.filteredData);
    }
    if (props.filteredDataJarak) {
      setFilteredDataJarak(props.filteredDataJarak);
    }
  }, [
    props.dataFilter,
    props.dataFilterMulti,
    props.filteredData,
    props.filteredDataJarak,
  ]);

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
                  setFilteredData([]);
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
                size="large"
                variant="outlined"
                color="error"
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
