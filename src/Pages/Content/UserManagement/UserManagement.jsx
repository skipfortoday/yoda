import React, { useEffect, useState, useReducer } from "react";
import axiosBackend from "../../../Helper/axiosBackend";
import { Container } from "@mui/material";
import TabPanel from "../../../Components/Helper/TabPanel";
import MyAppbar from "../../../Components/Navigation/MyAppbar";
import UMWaiting from "./UMWaiting";
import UMAccepted from "./UMAccepted";
import UMRejected from "./UMRejected";
import moment from "moment";
import axios from "axios";

export default function UserManagementPage(props) {
  // console.log('props UserManagementPage', props)
  const ActivePage = 1; // Staticly Setup for Active Menu
  const [ActiveTab, setActiveTab] = useState(0);
  const [ActiveSubTab, setActiveSubTab] = useState(0);

  const [WaitingData, setWaitingData] = useState([]);
  const [AcceptedData, setAcceptedData] = useState([]);
  const [RejectedData, setRejectedData] = useState([]);
  const [AllData, setAllData] = useState([]);

  // async function GetAllUsersOri() {
  //   const thisToken = sessionStorage.getItem("token");
  //   console.log("thisToken", thisToken);
  //   // console.log('GetAllUsers')
  //   var AllUsers = [];
  //   await axiosBackend
  //     .get("/users")
  //     .then((response) => {
  //       console.log("response", response);
  //       AllUsers = response.data.users;
  //     })
  //     .catch((err) => {
  //       console.warn(err.response);
  //     });
  //   return AllUsers;
  // }

  async function GetAllUsers() {
    const thisToken = sessionStorage.getItem("token");
    console.log("thisToken", thisToken);
    const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT_PROD;

    console.log("GetAllUsers");
    var AllUsers = [];
    await axiosBackend
      .get(`/users`)
      .then((res) => {
        if (res.status === 200) {
          AllUsers = res.data.users;
          setAllData(res.data.users);
          // return AllUsers;
        }
        // console.log("data GetAllUsers", data);
        // if (data.status === 200) {
        //   AllUsers = data.data.users;
        // }
        return AllUsers;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function GetAllUsers() {
    const thisToken = sessionStorage.getItem("token");
    console.log("thisToken", thisToken);
    // const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV
    const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT_DEV;

    // console.log('GetAllUsers')
    var AllUsers = [];
    try {
      const data = await axios.post(`${baseURL}/filterUser`, {
        role: "",
        Status: "",
        cabang: "",
      });
      console.log("data GetAllUsers", data);
      if (data.status === 200) {
        AllUsers = data.data.results;
        console.log("AllUsers", AllUsers);
        return AllUsers;
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  async function LoadWaitingData() {
    console.log("LoadWaitingData");
    // var tempUsers = await GetAllUsers();
    let tempUsers = await GetAllUsers();
    tempUsers = tempUsers?.filter((user) => {
      // console.log('2--LoadWaitingData')
      // var tempUsers = await GetAllUsers()
      // tempUsers = tempUsers.filter(user => {
      return (
        user?.role?.name !== "Super Admin" &&
        user.user_status.toString().toLowerCase() === "unconfirmed"
        // user.user_status.toString().toLowerCase() !== "unconfirmed" &&
        // user.user_status.toString().toLowerCase() !== "rejected"
      );
    });
    tempUsers?.forEach((user, index) => {
      let stillUtc = moment.utc(user.created_at).toDate();
      let local = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
      user.created_at = local;
      user.index = index + 1;
    });
    setWaitingData(tempUsers);
  }
  async function LoadAcceptedData() {
    console.log("LoadAcceptedData");
    let tempUsers = await GetAllUsers();
    tempUsers = tempUsers?.filter((user) => {
      // var tempUsers = await GetAllUsers()
      // tempUsers = tempUsers.filter(user => {
      return (
        user.user_status.toString().toLowerCase() !== "unconfirmed" &&
        user.user_status.toString().toLowerCase() !== "rejected" &&
        // (user.user_status.toString().toLowerCase() === "active" ||
        // user.user_status.toString().toLowerCase() === "non aktif")
        user?.role?.name !== "Super Admin"
      );
    });
    tempUsers?.forEach((user, index) => {
      let stillUtc = moment.utc(user.created_at).toDate();
      let local = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
      user.created_at = local;
      user.index = index + 1;
      user.user_code = "#" + user.id.toString().padStart(5, "0");
    });
    setAcceptedData(tempUsers);
  }
  async function LoadRejectedData() {
    console.log("LoadRejectedData");
    let tempUsers = await GetAllUsers();
    tempUsers = tempUsers?.filter((user) => {
      return user.user_status.toString().toLowerCase() === "rejected";
    });
    setAcceptedData(tempUsers);
    console.log("1--LoadAcceptedData", tempUsers);
  }
  async function LoadRejectedData() {
    console.log("3--LoadRejectedData");
    var tempUsers = await GetAllUsers();
    tempUsers = tempUsers?.filter((user) => {
      return user.user_status.toString().toLowerCase() === "rejected";
    });
    tempUsers?.forEach((user, index) => {
      let stillUtc = moment.utc(user.created_at).toDate();
      let local = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
      user.created_at = local;
      user.index = index + 1;
    });
    console.log(tempUsers, "TURTURTUR");
    setRejectedData(tempUsers);
  }

  const [dataSort, setDataSort] = useState([]);
  const getData = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
    setDataSort(val);
  };

  const [dataFilter, setDataFilter] = useState([]);
  const getDataFilter = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
    setDataFilter(val);
  };

  useEffect(() => {
    LoadWaitingData();
    LoadAcceptedData();
    LoadRejectedData();
  }, [AllData]);

  const currentSubTab = (val) => {
    console.log("currentSubTab 1 => ", val);
    setActiveSubTab(val);
  };

  const cleanFilteredData = () => {
    setFilteredData([]);
  };

  const [isFilter, setIsFilter] = useState(false);
  const [filteredDataInternal, setFilteredDataInternal] = useState([]);
  const doFilter = (val) => {
    setIsFilter(val);
  };
  const getFilteredDataInternal = (val) => {
    console.log("getFilteredDataInternal", val);
    setFilteredDataInternal(val);
  };

  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataEx, setFilteredDataEx] = useState([]);
  const getFilteredDataUsersInternal = (val) => {
    console.log("getFilteredDataUsersInternal", val);
    setFilteredData(val);
    setAcceptedData(val);
  };

  const getFilteredDataUsersExternal = (val) => {
    console.log("---getFilteredDataUsersExternal", val);
    // setFilteredData(val)
    // setAcceptedData(val)
    setFilteredDataEx(val);
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  useEffect(() => {
    if (filteredData.length === 0 && filteredDataEx.length === 0) {
      console.log("filteredDataEx & filteredData kosong");
      LoadWaitingData();
      LoadAcceptedData();
      LoadRejectedData();
    } else {
      console.log("filteredDataEx & filteredData ada data");
    }
  }, [filteredData, filteredDataEx]);

  const searchedData = (key, val) => {
    if (key === "waiting") {
      console.log("SDW", val);
      val = val.filter((user) => {
        return (
          user?.role?.name !== "Super Admin" &&
          user.user_status.toString().toLowerCase() === "unconfirmed"
        );
      });

      val = val.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

      console.log(val, "VAL");

      val.forEach((user, index) => {
        console.log("index", index);
        user.index = index + 1;
      });
      setWaitingData(val);
    } else if (key === "accepted") {
      console.log("SDA");
      val = val.filter((user) => {
        return user.user_status.toString().toLowerCase() !== "rejected";
      });

      val = val.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

      console.log(val, "VAL");

      val.forEach((user, index) => {
        console.log("index", index);
        user.index = index + 1;
      });
      setAcceptedData(val);
      setFilteredData(val);
    } else if (key === "rejected") {
      console.log("SDR");
      val = val.filter((user) => {
        return user.user_status.toString().toLowerCase() === "rejected";
      });
      val = val.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

      console.log(val, "VAL");

      val.forEach((user, index) => {
        console.log("index", index);
        user.index = index + 1;
      });
      setRejectedData(val);
      setFilteredData(val);
    }
  };

  const DATA = {
    header: "Manajemen pengguna",
    tabsMenu: [
      {
        value: 0,
        label: "Menunggu konfirmasi",
        content: (
          <UMWaiting
            data={WaitingData}
            dataSort={dataSort}
            reload={() => {
              GetAllUsers();
              LoadWaitingData(); /*console.log('LoadWaitingData')*/
              LoadAcceptedData();
              LoadRejectedData();
            }}
          />
        ),
      },
      {
        value: 1,
        label: "Disetujui",
        content: (
          <UMAccepted
            data={AcceptedData}
            dataSort={dataSort}
            dataFilter={dataFilter}
            reload={() => {
              // GetAllUsers();
              LoadAcceptedData(); /*console.log('LoadAcceptedData')*/
            }}
            currentSubTab={(val) => {
              currentSubTab(val);
            }}
            isFilter={isFilter}
            filteredData={filteredData}
            filteredDataEx={filteredDataEx}
          />
        ),
      },
      {
        value: 2,
        label: "Ditolak",
        content: (
          <UMRejected
            data={RejectedData}
            dataSort={dataSort}
            filteredData={filteredData}
            reload={() => {
              LoadRejectedData(); /*console.log('LoadRejectedData')*/
            }}
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
        ActiveSubTab={ActiveSubTab}
        ActivePage={ActivePage}
        sendData={getData}
        getDataFilter={getDataFilter}
        doFilter={doFilter}
        getFilteredDataInternal={getFilteredDataInternal}
        filteredDataInternal={filteredDataInternal}
        getFilteredDataUsersInternal={getFilteredDataUsersInternal}
        getFilteredDataUsersExternal={getFilteredDataUsersExternal}
        searchedData={searchedData}
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
