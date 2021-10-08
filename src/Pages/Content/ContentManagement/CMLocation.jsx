import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Collapse, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CMLKantor from "./SubPage/CMLocation/CMLKantor";
import CMLWilayah from "./SubPage/CMLocation/CMLWilayah";
import Delete from "@mui/icons-material/Delete";

export default function CMLocation(props) {
  console.log("props CMLocation", props);
  const [ActiveSubPage, setActiveSubPage] = useState(0);
  const { currentSubTab, dataSort, filteredDataWilayah, isFilter, filteredData, reload } = props;
  // const [filteredData, setFilteredData] = useState(props.filteredData)
  const [DeleteButton, setDeleteButton] = useState(false);
  const [DeleteChosenId, setDeleteChosenId] = useState([]);
  const [DeleteType, setDeleteType] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(MenuanchorEl);

  const changeIcons = (val, type) => {
    console.log("masuk sini ");
    setDeleteButton(val.length > 0 ? true : false);
    setDeleteChosenId(val);
    setDeleteType(type);
  };

  const multiDelete = async () => {
    // await axiosBackend
    //   .post(`/delete/${DeleteType}`, {
    //     id: DeleteChosenId,
    //   })
    //   .then((response) => {
    //     setDeleted(!Deleted);
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.warn(err.response);
    //   });
  };

  useEffect(() => {
    currentSubTab(0);
  }, []);

  useEffect(() => {
    console.log("value nya disini ", DeleteButton);
  });

  const TABS = [
    {
      index: 0,
      label: "Kantor",
      dataGrid: (
        <CMLKantor
          indexPage={0}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          filteredData={filteredData}
          dataSort={dataSort}
          changeIcons={changeIcons}
        />
      ),
    },
    {
      index: 1,
      label: "Wilayah",
      dataGrid: (
        <CMLWilayah
          indexPage={1}
          MenuanchorEl={MenuanchorEl}
          setMenuAnchorEl={setMenuAnchorEl}
          isMenuOpen={isMenuOpen}
          ActiveSubPage={ActiveSubPage}
          filteredData={filteredData}
          dataSort={dataSort}
          filteredDataWilayah={filteredDataWilayah}
          isFilter={isFilter}
          changeIcons={changeIcons}
        />
      ),
    },
  ];

  return (
    <>
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
                  props.cleanFilteredData();
                  setActiveSubPage(index);
                  currentSubTab(index);
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
