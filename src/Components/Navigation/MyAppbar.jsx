import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import OutlinedInput from '@mui/material/OutlinedInput';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SortIcon from '@mui/icons-material/Sort';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Popover, Stack, Tab, Tabs } from '@mui/material';
// import { HeadphonesBatterySharp } from '@mui/icons-material';
import MyMenu from './MyMenu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileCard from '../Auth/ProfileCard';
import UploadIcon from '@mui/icons-material/Upload';
import FilterListIcon from '@mui/icons-material/FilterList';
// import NestedMenuItem from "material-ui-nested-menu-item";
import axios from 'axios'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: 'inherit',
  borderRadius: 50,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledInputBaseFilter = styled(OutlinedInput)(({ theme }) => ({
  color: 'inherit',
  borderRadius: 50,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const uploadData = async (e) => {
  const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT
  const file = e.target.files[0];
  console.log('file', file)
  const bodyFormData = new FormData();
  console.log('bodyFormData', bodyFormData)
  bodyFormData.append('image', file);
  axios
    .post(`${baseURL}/upload-excel`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('res', response)
    })
    .catch((err) => {
      console.log('err', err)
    });
};

async function uploadData1(image) {
  const file = image.target.files[0]
  console.log('image', file)
  
  // const thisToken = sessionStorage.getItem('token')
  // console.log('thisToken', thisToken)
  // const baseURL= process.env.REACT_APP_BACKEND_ENDPOINT
  // var AllUsers = [];
  // try {
  //   const data = await axios.get(`${baseURL}/users`, {
  //     headers: {
  //       Authorization: `Bearer ${thisToken}`,
  //     },
  //   })
  //   console.log('data', data)
  //   if(data.status === 200){
  //     AllUsers = data.data.users
  //     return AllUsers
  //   }
  // } catch (err){
  //   console.log('err', err)
  // }
}

export default function MyAppbar(props) {
  const { ActivePage } = props;
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  // const upLg = useMediaQuery(theme.breakpoints.up('lg'));

  const { header, tabsMenu } = props;
  const { ActiveTab, setActiveTab } = props;

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMainMenuOpen = Boolean(MenuanchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <ProfileCard />
    </Popover>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // menu sort
  const [anchorElSort, setAnchorElSort] = React.useState(null);
  const openSort = Boolean(anchorElSort);
  const handleClick = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElSort(null);
  };

    // menu filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);
    const handleClickFilter = (event) => {
      setAnchorElFilter(event.currentTarget);
    };
    const handleCloseFilter = () => {
      setAnchorElFilter(null);
    };

  // sort data
  
  
  // const [dataSort, setDataSort] = useState("nameAsc");
  // const sortData = () => {
  //   if(dataSort === "nameDesc"){
  //     props.sendData('nameAsc')
  //     setDataSort('nameAsc')
  //     setAnchorElSort(null);
  //   }
  //   if(dataSort === "nameAsc"){
  //     props.sendData('nameDesc')
  //     setDataSort('nameDesc')
  //     setAnchorElSort(null);
  //   }
  // }

  // sort data
  const [dataSortHp, setDataSortHp] = useState("hpDesc");
  const sortDataHp = () => {
    if(dataSortHp === "hpDesc"){
      props.sendData('hpAsc')
      setDataSortHp('hpAsc')
      setAnchorElSort(null);
    }
    if(dataSortHp === "hpAsc"){
      props.sendData('hpDesc')
      setDataSortHp('hpDesc')
      setAnchorElSort(null);
    }
  }

  // filter data
  const filterData = (loc) => {
    props.getDataFilter(loc)
  }

  const [openSub, setOpenSub] = React.useState(false);

  const handleClickSub = () => {
    setOpenSub(!openSub);
  };

  const textsTab = [
    {
      id  : 1,
      name: 'A-Z',
      type: 'Asc'
    },
    {
      id  : 2,
      name: 'Z-A',
      type: 'Desc'
    },
  ]

  const texts = [
    {
      id  : 1,
      name: 'Nama & Email',
    },
    {
      id  : 2,
      name: 'Tanggal',
    },
    {
      id  : 3,
      name: 'No. Handphone',
    },
  ]

  // const choseListFilter = () => {
  //   const array = [1, 2, 3 ,4, 5]

  //   return array.map((number) => {
  //     return <button key={number} onClick={() => console.log('numb', number)}>{number}</button>
  //   })

  // }

  // sorting
  const [typeSort, setTypeSort] = useState("Asc");
  const [nameSort, setNameSort] = useState("Nama & Email");
  const [selectedTabId, setSelectedTabId] = useState({id:1});
  const [selectedId, setSelectedId] = useState({id:1});

  const sortData = () => {
    console.log('typeSort', typeSort)
    console.log('nameSort', nameSort)
    if(typeSort === "Desc"){
      console.log('do Desc')
      if(nameSort === 'Nama & Email'){
        props.sendData('nameDesc')
        setAnchorElSort(null);
      }
      if(nameSort === 'Tanggal'){
        props.sendData('dateDesc')
        setAnchorElSort(null);
      }
      if(nameSort === 'No. Handphone'){
        props.sendData('hpDesc')
        setAnchorElSort(null);
      }
    }
    if(typeSort === "Asc"){
      console.log('do Asc')
      if(nameSort === 'Nama & Email'){
        props.sendData('nameAsc')
        setAnchorElSort(null);
      }
      if(nameSort === 'Tanggal'){
        props.sendData('dateAsc')
        setAnchorElSort(null);
      }
      if(nameSort === 'No. Handphone'){
        props.sendData('hpAsc')
        setAnchorElSort(null);
      }
    }
  }

  const pushTabId = (item) => {
    setSelectedTabId(item)
    setTypeSort(item.type)
  }

  const pushId = (item) => {
    setSelectedId(item)
    setNameSort(item.name)
  }
  

  const choseTab = () => {
    return textsTab.map((number) => {
      // return <button key={number} onClick={() => console.log('numb', number)}>{number}</button>
      return <button onClick={() => pushTabId(number)} className={`btn-list-tab ${selectedTabId.id === number.id ? 'btn-active' : ''} ${number.id === 1 ? 'border-left' : 'border-right'}`}>{number.name}</button>
    })
  }

  const choseListFilter = () => {
    return texts.map((number) => {
      // return <button key={number} onClick={() => console.log('numb', number)}>{number}</button>
      return <button onClick={() => pushId(number)} className={`btn-list-sort ${selectedId.id === number.id ? 'btn-active' : ''}`}>{number.name}</button>
    })
  }

  const areas = [
    {
      id  : 1,
      name: 'Jakarta',
    },
    {
      id  : 2,
      name: 'Jawa Timur',
    },
    {
      id  : 3,
      name: 'Malang',
    },
    {
      id  : 4,
      name: 'Yogyakarta',
    },
  ]

  const Merek = [
    {
      id  : 1,
      name: 'Alfa Romeo',
    },
    {
      id  : 2,
      name: 'Aston Martin',
    },
    {
      id  : 3,
      name: 'BMW',
    },
    {
      id  : 4,
      name: 'Jeep',
    },
  ]

  const [selectedArea, setSelectedArea] = useState([]);
  const [areaBeforeSearch, setAreaBeforeSearch] = useState([]);
  const [defaultArea, setDefaultArea] = useState(areas);

  const cek = () => {
    setDefaultArea(defaultArea)
    const data = defaultArea.filter((item, pos, self) => self.findIndex(v => v.name === item.name) === pos);
    setDefaultArea(data)
    console.log('data', data)
  }

  const pushArea = (item) => {
    setSelectedArea(selectedArea.concat(item))
    console.log('item', item.name)
    var filtered = defaultArea.filter(function(value){ 
      console.log('value', value.name)
      return value.name !== item.name
    })
    setDefaultArea(filtered)
    console.log('filtered', filtered)
  }

  const pushAreaDefault = (item) => {
    setDefaultArea(defaultArea.concat(item))
    console.log('item', item.name)
    var filtered = selectedArea.filter(function(value){ 
      console.log('value', value.name)
      return value.name !== item.name
    })
    setSelectedArea(filtered)
    console.log('filtered', filtered)
  }

  const choseAreas = () => {
    return defaultArea.map((area) => {
      return <button onClick={() => pushArea(area)} className={`btn-list-sort ${selectedId.id === area.id ? 'btn-active' : ''}`}>{area.name}</button>
    })
  }

  const areasSelected = () => {
    return selectedArea.map((area) => {
      return <button onClick={() => pushAreaDefault(area)} className={`btn-list-sort ${selectedId.id === area.id ? 'btn-active' : ''}`}>{area.name}</button>
    })
  }

  const doSearch1 = (x) => {
    console.log('x', x)
    const inventory = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5}
    ];
    
    const result = inventory.find( ({ name }) => name === x );
    
    console.log(result) // { name: 'cherries', quantity: 5 }
  }

  const doSearch = ((e) => {
    const searchString = e.toLowerCase();
    console.log('searchString', searchString)

    const filteredCharacters = areas.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    setDefaultArea(filteredCharacters)
    console.log('doSearch',filteredCharacters);
    // if(e === 0){
    //   cek()
    // } else {
    //   setDefaultArea(filteredCharacters)
    //   console.log(filteredCharacters);
    // }
})

  // useEffect(() => {
  //   areasSelected()
  // }, [])

  

  const [selectedMerek, setSelectedMerek] = useState();
  const pushMerek = (item) => {
    setSelectedMerek(item.name)
    setSelectedArea(selectedArea.concat(item))
    console.log('item', item.name)
    var filtered = defaultArea.filter(function(value){ 
      console.log('value', value.name)
      return value.name !== item.name
    })
    setDefaultArea(filtered)
    console.log('filtered', filtered)
  }

  const choseMerek = () => {
    return Merek.map((merek) => {
      return <button onClick={() => pushMerek(merek)} className={`btn-list-sort ${selectedId.id === merek.id ? 'btn-active' : ''}`}>{merek.name}</button>
    })
  }

  const doFilterData = async () => {
    console.log('selectedMerek', selectedMerek)
    const filters            = {
      Merek   : selectedMerek,
    }
    await axios.post('https://yodamobi.sagaramedia.id/api/filter',{
      table: 'Merek, model, varian', filters
      // filters[merek]: aston
    })
    .then((response) =>{ 
      console.log('res', response)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="plainwhite" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider'}} >
        <Toolbar sx={{ height: 100 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            sx={{ mr: 2 }}
          >
            <SortIcon sx={{ color: isMainMenuOpen?'primary.main':'inherit' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="column" justifyContent="flex-end" sx={{ height: 100 }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
              >
                { header }
              </Typography>
              <Box sx={{ border: 0, width: { xs: '70vw', md: 'auto' } }} color="primary">
                <Tabs value={ActiveTab} variant="scrollable" sx={{ paddingBottom: 0, }}
                  onChange={(e, newVal) => setActiveTab(newVal)}
                  textColor="primary" indicatorColor="primary"
                >
                  { tabsMenu?.map((tM, index) => (
                    <Tab key={index} label={tM.label} disableRipple sx={{ textTransform: 'capitalize' }} />
                  )) }
                </Tabs>
              </Box>
            </Stack>
          </Box>
          { upMd? (
            <>
              <div>
                <Button disableRipple
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openSort ? 'true' : undefined}
                  onClick={handleClick}
                  color="primary"
                  startIcon={<ImportExportIcon />}
                >
                  {'Sortir'}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElSort}
                  open={openSort}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <div className="menuSort">
                    <div className="switch">
                      <div>
                        <Button disabled>Sortir</Button>
                      </div>
                      <div>
                        <button className="btn-terapkan" onClick={() => sortData()}>Terapkan</button>
                      </div>
                    </div>
                    <div className="flex tab-sort mt-8">
                      {choseTab()}
                    </div>
                    <hr className="border-grey my-5" />
                    <p><b>Urutkan Berdasarkan</b></p>
                    <div className="list-filter">
                      {choseListFilter()}
                    </div>
                  </div>
                </Menu>
              </div>
              <div>
                <Button disableRipple
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openFilter ? 'true' : undefined}
                  onClick={handleClickFilter}
                  color="primary"
                  startIcon={<FilterListIcon />}
                >
                  {'Filter'}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElFilter}
                  open={openFilter}
                  onClose={handleCloseFilter}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <div className="menuSort">
                    <div className="switch">
                      <div>
                        <Button disabled>Filter</Button>
                      </div>
                      <div>
                        <button className="btn-terapkan" onClick={() => doFilterData()}>Terapkan</button>
                      </div>
                    </div>
                    <div className="mt-5">
                    <Search
                    onChange={(filed) => doSearch(filed.target.value)}>
                      <SearchIconWrapper>
                        <SearchIcon sx={{ color: 'tint.black.60' }} />
                      </SearchIconWrapper>
                      <StyledInputBaseFilter
                        color="primary"
                        placeholder="Cari . . ."
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                    </div>
                    <button onClick={() => cek()}>cek</button>
                    <div>
                      <p>Selected</p>
                      {areasSelected()}
                    </div>
                    <hr/>
                    {/* <div>
                      <p>Chose</p>
                      {choseAreas()}
                    </div> */}
                    <div>
                      <p>Merek</p>
                      {choseMerek()}
                    </div>
                  </div>
                </Menu>
              </div>
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: 'tint.black.60' }} />
                </SearchIconWrapper>
                <StyledInputBase
                  color="primary"
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search> */}
            </>
          ) : null }
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="red20">
                <NotificationsIcon color="primary" sx={{ width: 32 }} />
              </Badge>
            </IconButton>
            <IconButton
              // size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src="./images/web/avatar-example.png" />
              {/* <AccountCircle /> */}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Popover
        open={isMainMenuOpen}
        anchorEl={MenuanchorEl}
        onClose={() => setMenuAnchorEl(null) }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MyMenu ActivePage={ActivePage}/>
      </Popover>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}