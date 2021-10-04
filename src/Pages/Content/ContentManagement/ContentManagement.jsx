import React, { useState } from "react";
import { Container } from "@mui/material";
import TabPanel from "../../../Components/Helper/TabPanel";
import MyAppbar from "../../../Components/Navigation/MyAppbar";
import CMUnit from "./CMUnit";
import CMLocation from "./CMLocation";
import CMSeller from "./CMSeller";
import CMCredit from "./CMCredit";

export default function ContentManagementPage() {
  const ActivePage = 2; // Staticly Setup for Active Menu
  const [ActiveTab, setActiveTab] = useState(0);
  const [ActiveSubTab, setActiveSubTab] = useState(0);

  const [dataFilter, setDataFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataWilayah, setFilteredDataWilayah] = useState([]);
  const [filteredDataJarak, setFilteredDataJarak] = useState([]);
  const [filteredDataTahun, setFilteredDataTahun] = useState([]);
  const [dataFilterMulti, setDataFilterMulti] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const getDataFilter = (val) => {
    // do not forget to bind getData in constructor
    // console.log('+ filter ContentManagementPage => ',val);
    setDataFilter(val);
    // setDataFilter("Audi")
  };

  const getDataFilterMulti = (val) => {
    // do not forget to bind getData in constructor
    // console.log('+ getDataFilterMulti ContentManagementPage => ',val);
    setDataFilterMulti(val);
    // setDataFilter("Audi")
  };

  const [dataSort, setDataSort] = useState([]);
  const getData = (val) => {
    // do not forget to bind getData in constructor
    setDataSort(val);
  };

  const currentSubTab = (val) => {
    console.log("currentSubTab 1 => ", val);
    setActiveSubTab(val);
  };

  const getFilteredDataMerekModel = (val) => {
    console.log("getFilteredDataMerekModel", val);
    setFilteredData(val);
  };

  const getFilteredDataWilayah = (val) => {
    console.log("getFilteredDataWilayah", val);
    setFilteredDataWilayah(val);
  };

  const getFilteredDataJarak = (val) => {
    console.log("getFilteredDataJarak", val);
    setFilteredDataJarak(val);
  };

  const getFilteredDataTahun = (val) => {
    console.log("getFilteredDataTahun", val);
    setFilteredDataTahun(val);
  };

  const doFilter = (val) => {
    setIsFilter(val);
  };

  const searchedData = (val) => {
    setFilteredData(val);
  };

  const cleanFilteredData = () => {
    setFilteredData([]);
  };

  const DATA = {
    header: "Manajemen konten",
    tabsMenu: [
      {
        value: 0,
        label: "Unit",
        content: (
          <CMUnit
            dataFilter={dataFilter}
            dataFilterMulti={dataFilterMulti}
            dataSort={dataSort}
            currentSubTab={(val) => {
              currentSubTab(val);
            }}
            filteredData={filteredData}
            filteredDataJarak={filteredDataJarak}
            filteredDataTahun={filteredDataTahun}
            isFilter={isFilter}
          />
        ),
      },

      {
        value: 1,
        label: "Lokasi",
        content: (
          <CMLocation
            dataSort={dataSort}
            isFilter={isFilter}
            filteredData={filteredData}
            filteredDataWilayah={filteredDataWilayah}
            currentSubTab={(val) => {
              currentSubTab(val);
            }}
            cleanFilteredData={cleanFilteredData}
            />
            ),
          },
          {
            value: 2,
        label: "Kredit",
        content: (
          <CMCredit
            dataSort={dataSort}
            currentSubTab={(val) => {
              currentSubTab(val);
            }}
            filteredData={filteredData}
            cleanFilteredData={cleanFilteredData}
          />
        ),
      },
      {
        value: 3,
        label: "Penjual",
        content: (
          <CMSeller
            dataSort={dataSort}
            currentSubTab={(val) => {
              currentSubTab(val);
            }}
            filteredData={filteredData}
          />
        ),
      },
    ],
  };

  return (
    <>
      <MyAppbar
        header={DATA.header}
        tabsMenu={DATA.tabsMenu}
        ActiveTab={ActiveTab}
        setActiveTab={setActiveTab}
        ActivePage={ActivePage}
        sendData={getData}
        ActiveSubTab={ActiveSubTab}
        getDataFilter={getDataFilter}
        getDataFilterMulti={getDataFilterMulti}
        getFilteredDataMerekModel={getFilteredDataMerekModel}
        getFilteredDataWilayah={getFilteredDataWilayah}
        getFilteredDataJarak={getFilteredDataJarak}
        getFilteredDataTahun={getFilteredDataTahun}
        doFilter={doFilter}
        searchedData={searchedData}
        searchInput={searchInput}
      />

      <Container maxWidth="xl">
        {DATA?.tabsMenu?.map((tM, index) => (
          <TabPanel key={index} value={ActiveTab} index={index}>
            {tM.content}
          </TabPanel>
        ))}
      </Container>
    </>
  );
}
