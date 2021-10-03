import React, { useEffect, useState } from 'react'
import axiosBackend from '../../../Helper/axiosBackend'
import { Container } from '@mui/material'
import TabPanel from '../../../Components/Helper/TabPanel'
import MyAppbar from '../../../Components/Navigation/MyAppbar'
import UMWaiting from './UMWaiting'
import UMAccepted from './UMAccepted'
import UMRejected from './UMRejected'
import axios from 'axios'

export default function UserManagementPage() {
  const ActivePage = 1; // Staticly Setup for Active Menu
  const [ActiveTab, setActiveTab] = useState(0)
  const [ActiveSubTab, setActiveSubTab] = useState(0);

  const [WaitingData, setWaitingData] = useState([])
  const [AcceptedData, setAcceptedData] = useState([])
  const [RejectedData, setRejectedData] = useState([])

  async function GetAllUsersOri() {
    const thisToken = sessionStorage.getItem('token')
    console.log('thisToken', thisToken)
    // console.log('GetAllUsers')
    var AllUsers = [];
    await axiosBackend.get('/users')
    .then((response) => {
      console.log('response', response)
      AllUsers = response.data.users
    })
    .catch((err) => { console.warn(err.response) })
    return AllUsers;
  }

  async function GetAllUsers() {
    const thisToken = sessionStorage.getItem('token')
    console.log('thisToken', thisToken)
    // const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV
    const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT_DEV

    // console.log('GetAllUsers')
    var AllUsers = [];
    try {
      const data = await axios.get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${thisToken}`,
        },
      })
      console.log('data', data)
      if(data.status === 200){
        AllUsers = data.data.users
        return AllUsers
      }
    } catch (err){
      console.log('err', err)
    }
  }

  async function LoadWaitingData() {
    console.log('LoadWaitingData')
    var tempUsers = await GetAllUsers()
    tempUsers = tempUsers.filter(user => { 
      return (
        user?.role?.name !== "Super Admin" &&
        user.user_status.toString().toLowerCase() === "unconfirmed"
        // user.user_status.toString().toLowerCase() !== "unconfirmed" &&
        // user.user_status.toString().toLowerCase() !== "rejected"
      )
    })
    tempUsers.forEach((user, index) => {
      user.index = index + 1;
    });
    setWaitingData(tempUsers)
  }
  async function LoadAcceptedData() {
    console.log('LoadAcceptedData')
    var tempUsers = await GetAllUsers()
    tempUsers = tempUsers.filter(user => { 
      return (
        user.user_status.toString().toLowerCase() !== "unconfirmed"
        && user.user_status.toString().toLowerCase() !== "rejected"
        // (user.user_status.toString().toLowerCase() === "active" ||
        // user.user_status.toString().toLowerCase() === "non aktif") 
        && user?.role?.name !== "Super Admin"
      )
    })
    tempUsers.forEach((user, index) => {
      user.index = index + 1;
      user.user_code = "#" + user.id.toString().padStart(5, '0')
    });
    setAcceptedData(tempUsers)
  }
  async function LoadRejectedData() {
    console.log('LoadRejectedData')
    var tempUsers = await GetAllUsers()
    tempUsers = tempUsers.filter(user => {
      return (
        user.user_status.toString().toLowerCase() === 'rejected'
      )
    })
    tempUsers.forEach((user, index) => {
      user.index = index + 1;
    });
    setRejectedData(tempUsers)
  }

  const [dataSort, setDataSort] = useState([])
  const getData = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
    setDataSort(val)
  }

  const [dataFilter, setDataFilter] = useState([])
  const getDataFilter = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
    setDataFilter(val)
  }

  const currentSubTab = (val) => {
    console.log('currentSubTab 1 => ', val)
    setActiveSubTab(val)
  }

  const [isFilter, setIsFilter] = useState(false);
  const [filteredDataInternal, setFilteredData] = useState([]);
  const doFilter = (val) => {
    setIsFilter(val)
  }
  const getFilteredDataInternal = (val) => {
    console.log('getFilteredDataInternal', val)
    setFilteredData(val)
  }

  useEffect(() => {
    LoadWaitingData()
    LoadAcceptedData()
    LoadRejectedData()
  }, [])

  const DATA = {
    header: 'Manajemen pengguna',
    tabsMenu: [
      { value: 0, label: 'menunggu konfirmasi', content: <UMWaiting data={WaitingData} dataSort={dataSort} reload={() => {LoadWaitingData(); /*console.log('LoadWaitingData')*/}} /> },
      { 
        value: 1, 
        label: 'Disetujui', 
        content: 
          <UMAccepted
            data={AcceptedData}
            dataSort={dataSort}
            dataFilter={dataFilter}
            currentSubTab={(val) => {currentSubTab(val)}}
            isFilter={isFilter}
            reload={() => {LoadAcceptedData(); /*console.log('LoadAcceptedData')*/}} /> },
      { value: 2, label: 'Ditolak', content: <UMRejected data={RejectedData} dataSort={dataSort} reload={() => {LoadRejectedData(); /*console.log('LoadRejectedData')*/}} /> },
    ]
  }

  return (
    <>
      <MyAppbar
        header={DATA.header}
        tabsMenu={DATA.tabsMenu}
        ActiveTab={ActiveTab} setActiveTab={setActiveTab}
        ActiveSubTab={ActiveSubTab}
        ActivePage={ActivePage}
        sendData={getData}
        getDataFilter={getDataFilter}
        doFilter={doFilter}
        getFilteredDataInternal={getFilteredDataInternal}
        filteredDataInternal={filteredDataInternal}
      />

      <Container maxWidth="xl">
        { DATA?.tabsMenu?.map((tM, index) => (
          <TabPanel key={index} value={ActiveTab} index={index}>
            { tM.content }
          </TabPanel>
        )) }
      </Container>
    </>
  )
}
