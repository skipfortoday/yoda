import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from '@mui/material/InputBase';
import OutlinedInput from "@mui/material/OutlinedInput";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SortIcon from "@mui/icons-material/Sort";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Button, Popover, Stack, Tab, Tabs } from "@mui/material";
// import { HeadphonesBatterySharp } from '@mui/icons-material';
import MyMenu from "./MyMenu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileCard from "../Auth/ProfileCard";
import UploadIcon from "@mui/icons-material/Upload";
import FilterListIcon from "@mui/icons-material/FilterList";
// import NestedMenuItem from "material-ui-nested-menu-item";
import axios from "axios";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: "inherit",
  borderRadius: 50,
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledInputBaseFilter = styled(OutlinedInput)(({ theme }) => ({
  color: "inherit",
  borderRadius: 50,
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const uploadData = async (e) => {
  const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
  const file = e.target.files[0];
  console.log("file", file);
  const bodyFormData = new FormData();
  console.log("bodyFormData", bodyFormData);
  bodyFormData.append("image", file);
  axios
    .post(`${baseURL}/upload-excel`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("res", response);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

async function uploadData1(image) {
  const file = image.target.files[0];
  console.log("image", file);
}

export default function MyAppbar(props) {
  const userInfo = sessionStorage.getItem("user");
  const { ActivePage } = props;
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  // const upLg = useMediaQuery(theme.breakpoints.up('lg'));

  const { header, tabsMenu } = props;
  const { ActiveTab, setActiveTab } = props;
  const { ActiveSubTab } = props;

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <ProfileCard />
    </Popover>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
  const [dataSort, setDataSort] = useState("nameDesc");
  // const sortData = () => {
  //   if (dataSort === "nameDesc") {
  //     props.sendData("nameAsc");
  //     setDataSort("nameAsc");
  //     setAnchorElSort(null);
  //   }
  //   if (dataSort === "nameAsc") {
  //     props.sendData("nameDesc");
  //     setDataSort("nameDesc");
  //     setAnchorElSort(null);
  //   }
  // };

  // sort data
  const [dataSortHp, setDataSortHp] = useState("hpDesc");
  const sortDataHp = () => {
    if (dataSortHp === "hpDesc") {
      props.sendData("hpAsc");
      setDataSortHp("hpAsc");
      setAnchorElSort(null);
    }
    if (dataSortHp === "hpAsc") {
      props.sendData("hpDesc");
      setDataSortHp("hpDesc");
      setAnchorElSort(null);
    }
  };

  // filter data
  const filterData = (loc) => {
    props.getDataFilter(loc);
  };

  const [openSub, setOpenSub] = React.useState(false);

  const handleClickSub = () => {
    setOpenSub(!openSub);
  };

  const textsTab = [
    {
      id: 1,
      name: "A-Z",
      type: "Asc",
    },
    {
      id: 2,
      name: "Z-A",
      type: "Desc",
    },
  ];

  let texts = [
    {
      id: 1,
      name: "Nama & Email",
    },
    {
      id: 2,
      name: "Tanggal",
    },
    {
      id: 3,
      name: "No. Handphone",
    },
  ];

  if (ActivePage === 2) {
    if (ActiveTab === 0) {
      if (ActiveSubTab === 0) {
        texts = [
          {
            id: 1,
            name: "Merek",
          },
          {
            id: 2,
            name: "Model",
          },
          {
            id: 3,
            name: "Varian",
          },
        ];
      } else if (ActiveSubTab === 1) {
        texts = [
          {
            id: 1,
            name: "Tahun",
          },
        ];
      } else if (ActiveSubTab === 2) {
        texts = [
          {
            id: 1,
            name: "Jarak tempuh unit",
          },
        ];
      } else if (ActiveSubTab === 3) {
        texts = [
          {
            id: 1,
            name: "Warna unit",
          },
        ];
      } else if (ActiveSubTab === 4) {
        texts = [
          {
            id: 1,
            name: "Jenis bahan bakar",
          },
        ];
      } else if (ActiveSubTab === 5) {
        texts = [
          {
            id: 1,
            name: "Jenis transmisi",
          },
        ];
      } else if (ActiveSubTab === 6) {
        texts = [
          {
            id: 1,
            name: "Kondisi unit",
          },
        ];
      } else if (ActiveSubTab === 7) {
        texts = [
          {
            id: 1,
            name: "Jenis unit",
          },
        ];
      }
    } else if (ActiveTab === 1) {
      if (ActiveSubTab === 0) {
        texts = [
          {
            id: 1,
            name: "Nama",
          },
          {
            id: 2,
            name: "Kode cabang",
          },
          {
            id: 3,
            name: "Nomer telpon",
          },
          {
            id: 4,
            name: "Alamat",
          },
          {
            id: 5,
            name: "Tanggal",
          },
        ];
      } else if (ActiveSubTab === 1) {
        texts = [
          {
            id: 1,
            name: "Provinsi",
          },
          {
            id: 2,
            name: "Kota",
          },
          {
            id: 3,
            name: "Kecamatan",
          },
          {
            id: 4,
            name: "Cabang pengelola",
          },
          {
            id: 5,
            name: "Tanggal",
          },
        ];
      }
    } else if (ActiveTab === 2) {
      if (ActiveSubTab === 0) {
        texts = [
          {
            id: 1,
            name: "Tujuan pengunaan",
          },
        ];
      } else if (ActiveSubTab === 1) {
        texts = [
          {
            id: 1,
            name: "Kategori",
          },
        ];
      } else if (ActiveSubTab === 2) {
        texts = [
          {
            id: 1,
            name: "Tipe asuransi",
          },
        ];
      } else if (ActiveSubTab === 3) {
        texts = [
          {
            id: 1,
            name: "Kesertaan asuransi",
          },
        ];
      } else if (ActiveSubTab === 4) {
        texts = [
          {
            id: 1,
            name: "Nilai pertanggungan",
          },
        ];
      } else if (ActiveSubTab === 5) {
        texts = [
          {
            id: 1,
            name: "Pembayaran asuransi",
          },
        ];
      } else if (ActiveSubTab === 6) {
        texts = [
          {
            id: 1,
            name: "Tenor",
          },
        ];
      } else if (ActiveSubTab === 7) {
        texts = [
          {
            id: 1,
            name: "Angsuran pertama",
          },
        ];
      }
    } else if (ActiveTab === 3) {
      if (ActiveSubTab === 0) {
        texts = [
          {
            id: 1,
            name: "Nama",
          },
          {
            id: 2,
            name: "Nomer telpon",
          },
          {
            id: 3,
            name: "Alamat",
          },
          {
            id: 4,
            name: "Provinsi",
          },
          {
            id: 5,
            name: "Kota",
          },
          {
            id: 6,
            name: "Kecamatan",
          },
        ];
      }
    }
  }

  // const choseListFilter = () => {
  //   const array = [1, 2, 3 ,4, 5]

  //   return array.map((number) => {
  //     return <button key={number} onClick={() => console.log('numb', number)}>{number}</button>
  //   })

  // }

  // sorting
  const [typeSort, setTypeSort] = useState("Asc");
  const [nameSort, setNameSort] = useState("Nama & Email");
  const [selectedTabId, setSelectedTabId] = useState({ id: 1 });
  const [selectedId, setSelectedId] = useState({ id: 1 });

  const sortData = () => {
    console.log("typeSort", typeSort);
    console.log("nameSort", nameSort);
    if (typeSort === "Desc") {
      console.log("do Desc");
      if (nameSort === "Nama & Email") {
        props.sendData("nameDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tanggal") {
        props.sendData("dateDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "No. Handphone") {
        props.sendData("hpDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Merek") {
        props.sendData("merekDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Model") {
        props.sendData("modelDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Varian") {
        props.sendData("varianDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tahun") {
        props.sendData("tahunDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jarak tempuh unit") {
        props.sendData("jarakTempuhUnitDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Warna unit") {
        props.sendData("warnaUnitDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jenis bahan bakar") {
        props.sendData("jenisBahanBakarDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jenis transmisi") {
        props.sendData("jenisTransmisiDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Kondisi unit") {
        props.sendData("kondisiUnitDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jenis unit") {
        props.sendData("jenisUnitDesc");
        setAnchorElSort(null);
      }

      // ------------------------------------------------
      if (ActiveTab === 1 && ActiveSubTab === 0) {
        if (nameSort === "Nama") {
          props.sendData("namaKantorDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kode cabang") {
          props.sendData("kodeCabangDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Nomer telpon") {
          props.sendData("nomerTelponKantorDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Alamat") {
          props.sendData("alamatKantorDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Tanggal") {
          props.sendData("tanggalKantorDesc");
          setAnchorElSort(null);
        }
      }
      if (ActiveTab === 1 && ActiveSubTab === 1) {
        if (nameSort === "Provinsi") {
          props.sendData("provinsiWilayahDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kota") {
          props.sendData("kotaWilayahDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kecamatan") {
          props.sendData("kecamatanWilayahDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Cabang pengelola") {
          props.sendData("cabangPengelolaDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Tanggal") {
          props.sendData("tanggalWilayahDesc");
          setAnchorElSort(null);
        }
      }

      // ------------------------------------------------

      if (nameSort === "Tujuan pengunaan") {
        props.sendData("tujuanPengunaanDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Kategori") {
        props.sendData("kategoriDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tipe asuransi") {
        props.sendData("tipeAsuransiDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Kesertaan asuransi") {
        props.sendData("kesertaanAsuransiDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Nilai pertanggungan") {
        props.sendData("nilaiPertanggunganDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Pembayaran asuransi") {
        props.sendData("pembayaranAsuransiDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tenor") {
        props.sendData("tenorDesc");
        setAnchorElSort(null);
      }
      if (nameSort === "Angsuran pertama") {
        props.sendData("angsuranPertamaDesc");
        setAnchorElSort(null);
      }

      // -------------------------------------------

      if (ActiveTab === 3 && ActiveSubTab === 0) {
        if (nameSort === "Nama") {
          props.sendData("namaPenjualDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Nomer telpon") {
          props.sendData("nomerTelponPenjualDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Alamat") {
          props.sendData("alamatPenjualDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Provinsi") {
          props.sendData("provinsiPenjualDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kota") {
          props.sendData("kotaPenjualDesc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kecamatan") {
          props.sendData("kecamatanPenjualDesc");
          setAnchorElSort(null);
        }
      }
    }
    if (typeSort === "Asc") {
      console.log("do Asc");
      if (nameSort === "Nama & Email") {
        props.sendData("nameAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tanggal") {
        props.sendData("dateAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "No. Handphone") {
        props.sendData("hpAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Merek") {
        props.sendData("merekAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Model") {
        props.sendData("modelAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Varian") {
        props.sendData("varianAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tahun") {
        props.sendData("tahunAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jarak tempuh unit") {
        props.sendData("jarakTempuhUnitAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Warna unit") {
        props.sendData("warnaUnitAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jenis bahan bakar") {
        props.sendData("jenisBahanBakarAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jenis transmisi") {
        props.sendData("jenisTransmisiAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Kondisi unit") {
        props.sendData("kondisiUnitAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Jenis unit") {
        props.sendData("jenisUnitAsc");
        setAnchorElSort(null);
      }

      // ------------------------------------------------
      if (ActiveTab === 1 && ActiveSubTab === 0) {
        if (nameSort === "Nama") {
          props.sendData("namaKantorAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kode cabang") {
          props.sendData("kodeCabangAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Nomer telpon") {
          props.sendData("nomerTelponKantorAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Alamat") {
          props.sendData("alamatKantorAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Tanggal") {
          props.sendData("tanggalKantorAsc");
          setAnchorElSort(null);
        }
      }

      if (ActiveTab === 1 && ActiveSubTab === 1) {
        if (nameSort === "Provinsi") {
          props.sendData("provinsiWilayahAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kota") {
          props.sendData("kotaWilayahAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kecamatan") {
          props.sendData("kecamatanWilayahAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Cabang pengelola") {
          props.sendData("cabangPengelolaAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Tanggal") {
          props.sendData("tanggalWilayahAsc");
          setAnchorElSort(null);
        }
      }

      // ------------------------------------------------

      if (nameSort === "Tujuan pengunaan") {
        props.sendData("tujuanPengunaanAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Kategori") {
        props.sendData("kategoriAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tipe asuransi") {
        props.sendData("tipeAsuransiAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Kesertaan asuransi") {
        props.sendData("kesertaanAsuransiAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Nilai pertanggungan") {
        props.sendData("nilaiPertanggunganAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Pembayaran asuransi") {
        props.sendData("pembayaranAsuransiAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Tenor") {
        props.sendData("tenorAsc");
        setAnchorElSort(null);
      }
      if (nameSort === "Angsuran pertama") {
        props.sendData("angsuranPertamaAsc");
        setAnchorElSort(null);
      }

      // -------------------------------------------

      if (ActiveTab === 3 && ActiveSubTab === 0) {
        if (nameSort === "Nama") {
          props.sendData("namaPenjualAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Nomer telpon") {
          props.sendData("nomerTelponPenjualAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Alamat") {
          props.sendData("alamatPenjualAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Provinsi") {
          props.sendData("provinsiPenjualAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kota") {
          props.sendData("kotaPenjualAsc");
          setAnchorElSort(null);
        }
        if (nameSort === "Kecamatan") {
          props.sendData("kecamatanPenjualAsc");
          setAnchorElSort(null);
        }
      }
    }
  };

  const pushTabId = (item) => {
    setSelectedTabId(item);
    setTypeSort(item.type);
  };

  const pushId = (item) => {
    setSelectedId(item);
    setNameSort(item.name);
  };

  const choseTab = () => {
    return textsTab.map((number) => {
      // return <button key={number} onClick={() => console.log('numb', number)}>{number}</button>
      return (
        <button
          onClick={() => pushTabId(number)}
          className={`btn-list-tab ${
            selectedTabId.id === number.id ? "btn-active" : ""
          } ${number.id === 1 ? "border-left" : "border-right"}`}
        >
          {number.name}
        </button>
      );
    });
  };
  const choseListFilter = () => {
    return texts.map((number) => {
      // return <button key={number} onClick={() => console.log('numb', number)}>{number}</button>
      return (
        <button
          onClick={() => pushId(number)}
          className={`btn-list-sort ${
            selectedId.id === number.id ? "btn-active" : ""
          }`}
        >
          {number.name}
        </button>
      );
    });
  };

  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedAreaNew, setSelectedAreaNew] = useState([]);
  const [areaBeforeSearch, setAreaBeforeSearch] = useState([]);
  const [defaultArea, setDefaultArea] = useState([]);
  const [defaultAreaModel, setDefaultAreaModel] = useState([]);

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
      // console.log('value', value.name)
      return value.name !== item.name
    })
    setDefaultArea(filtered)
    if(filtered === ""){
      console.log("filtered kosong")
    }
    console.log('filtered', filtered)
  }

  const pushAreaDefault = (item) => {
    const array = selectedArea.filter(function(element, i) {
      return element.id !== item.id;
    });
    // console.log('data', array)
    setSelectedArea(array)
    setSelectedMerek(item.name)
  }

  const choseAreas = () => {
    return defaultArea.map((area) => {
      return <button onClick={() => pushArea(area)} className={`btn-list-sort ${selectedId.id === area.id ? 'btn-active' : ''}`}>{area.name}</button>
    })
  }

  const areasSelectedOri = () => {
    return selectedArea.map((area) => {
      // return <button onClick={() => pushAreaDefault(area)} className="btn-list-sort btn-active">{area.name}<HighlightOffIcon/></button>
      return <Button className="m-1" onClick={() => pushAreaDefault(area)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {area.name}
            </Button>
    })
  }

  const areasSelected = () => {
    return selectedArea.map((area) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(area)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {area.merek}
            </Button>
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

  const doSearchOri = ((e) => {
    const searchString = e.toLowerCase();
    console.log('searchString', searchString)
    console.log('defaultArea search', defaultArea)

    const filteredCharacters = defaultArea.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    setDefaultArea(filteredCharacters)
    console.log('doSearch',filteredCharacters);
})


  const [selectedMerek, setSelectedMerek] = useState();

  const pushMerekOri = (item) => {
    setSelectedMerek(item.name)
    setSelectedArea(selectedArea.concat(item))
    console.log('item', item.name)
    var filtered = defaultArea.filter(function(value){
      return value.name !== item.name
    })
    setDefaultArea(filtered)
    console.log('filtered', filtered)
  }

  const pushMerekOri2 = (item) => {
    setSelectedMerek(item.name)
    const data = selectedArea.concat(item)
    // cek duplicated
    console.log('data', data)
    const ids = data.map(o => o.id)
    const duplicated = data.filter(({id}, index) => !ids.includes(id, index + 1))
    // console.log('duplicated', duplicated)
    setSelectedArea(duplicated)
  }

  const pushMerek = (item) => {
    setSelectedMerek(item.merek)
    const data = selectedArea.concat(item)
    // cek duplicated
    // console.log('data', data)
    const ids = data.map(o => o.merek)
    const duplicated = data.filter(({merek}, index) => !ids.includes(merek, index + 1))
    // console.log('duplicated', duplicated)
    setSelectedArea(duplicated)
  }

  const choseMerek = () => {
    return defaultArea.map((merek) => {
      // return <button onClick={() => pushMerek(merek)} className="btn-list-sort">{merek.name}</button>
      return <button onClick={() => pushMerek(merek)} className="btn-list-sort">{merek.merek}</button>
    })
  }


  const choseModel = () => {
    return defaultAreaModel.map((model) => {
      // return <button onClick={() => pushMerek(merek)} className="btn-list-sort">{merek.name}</button>
      return <button onClick={() => pushMerek(model)} className="btn-list-sort">{model.model}</button>
    })
  }


  const [doMore, setdoMore] = useState(true);
  const [myindex, setindex] = useState();

const doConcat = () => {
  // const dahlah = data
  // const dataThree = dataO.concat(dataT)
  console.log('***doConcat',areaBeforeSearch)
}
  
  const multiFilter = async (x, index) => {
    // console.log('index', index)
    console.log('---1 areaBeforeSearch data', index, areaBeforeSearch)
    setdoMore(false)
    var tempData = [];
    // console.log('get ke => ', x.id)
      const filters = {
        Merek   : x.merek,
      }
      // console.log('filters => ', filters)
      axios.post('https://yodamobi.sagaramedia.id/api/filter',{
        table: 'Merek, model, varian', filters
      })
      .then((response) =>{ 
        console.log('++++res ', index, response.data.results)
        // pushMerek()
        response.data.results.forEach((x) => {
          // console.log('looping data', x)
          tempData.push({...x})
        })
        // console.log('tempdata', tempData)
        console.log('---2 areaBeforeSearch data', areaBeforeSearch)
        // const dataSatu = areaBeforeSearch
        
        // console.log('&*&% dataCo => ', dataCo.type)
        const dataCo = areaBeforeSearch.concat(response.data.results)
        setAreaBeforeSearch(dataCo)
        setTimeout(() => {
          console.log('dataSettimeout dataCo => ', dataCo)
          console.log('dataSettimeout areaBeforeSearch => ', areaBeforeSearch)
        }, 3000)
        // setAreaBeforeSearch([...areaBeforeSearch].tempData)
        setdoMore(true)
      })
      .catch((err) => { 
        console.warn(err.response)
      })
  }

  const doFilterData = async () => {
    setAreaBeforeSearch([])

    props.getDataFilter(selectedArea[0] ? selectedArea[0].merek : 'resetFilter')
    props.getDataFilterMulti(selectedArea ? selectedArea : 'resetFilter')
  }

  const doFilterData2 = () => {
    const requests = [];
    const url = 'https://yodamobi.sagaramedia.id/api/filter';
    const filters            = {
      Merek   : selectedMerek,
    }
    for (let i = 0; i < selectedArea.length; i++) {
        requests.push(axios.post(url, { params: {
            table: 'Merek, model, varian',
            filters
        }})
        )
    }

    axios.all(requests)
        .then((res) => {
            console.log(res);
        });
  };

  async function uploadExcel(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].name.split(".").pop() === "xlsx") {
        console.log(e.target.files[i]);
        axios
          .post(
            "https://yodamobi.sagaramedia.id/api/upload-excel",
            {
              excel: e.target.files[i],
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.warn(err.response);
          });
      }
    }
  }

  const cekFilterOri = () => {
    // const arr = [{id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 1, name: 'one'}]
    const ids = selectedArea.map(o => o.id)
    const filtered = selectedArea.filter(({id}, index) => !ids.includes(id, index + 1))
    setSelectedArea(filtered)
    // console.log(filtered)
  }

  const doSearch = ((e) => {
    cekFilter(e)
  })

  const [searchEmpty, setsearchEmpty] = useState(false);
  const [noArea, setnoArea] = useState(true);
  const [allDataMerek, setAllDataMerek] = useState([]);

  const cekFilter = async (item) => {
    await axios
      .post("https://yodacentral.herokuapp.com/api/filter2", {
        table: "Merek, model, varian",
        keyword: item,
      })
      .then((response) => {
        setAllDataMerek(response.data.results);
        // console.log('res get filter', response.data.results)
        const ids = response.data.results.merek.map((o) => o.merek);
        const duplicated = response.data.results.merek.filter(
          ({ merek }, index) => !ids.includes(merek, index + 1)
        );
        // console.log('duplicated', duplicated)
        const idsModel = response.data.results.model.map((o) => o.model);
        const duplicatedModel = response.data.results.model.filter(
          ({ model }, index) => !idsModel.includes(model, index + 1)
        );
        // console.log('setAllDataMerek', allDataMerek)
        // console.log('res get filter', response.data.results)

        setDefaultArea(duplicated);
        setDefaultAreaModel(duplicatedModel);
        if (duplicated.length === 0) {
          setsearchEmpty(true);
          if (defaultArea > 0) {
            setnoArea(false);
          }
        } else {
          setnoArea(false);
          setsearchEmpty(false);
        }
      })
      .catch((err) => {
        console.warn(err.response);
      });
  };

  useEffect(() => {
    setNameSort(texts[0].name);
  }, [ActiveSubTab]);

  useEffect(() => {
    setNameSort(texts[0].name);
  }, [ActiveTab]);

  useEffect(() => {
    if (defaultArea.length === 0) {
      if (selectedArea.length === 0) {
        setnoArea(true);
      }
    } else {
      setnoArea(false);
    }
    setNameSort(texts[0].name);
  }, [defaultArea]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="plainwhite"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ height: 100 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            sx={{ mr: 2 }}
          >
            <SortIcon
              sx={{ color: isMainMenuOpen ? "primary.main" : "inherit" }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="column"
              justifyContent="flex-end"
              sx={{ height: 100 }}
            >
              <Typography variant="h6" noWrap component="div">
                {header}
              </Typography>
              <Box
                sx={{ border: 0, width: { xs: "70vw", md: "auto" } }}
                color="primary"
              >
                <Tabs
                  value={ActiveTab}
                  variant="scrollable"
                  sx={{ paddingBottom: 0 }}
                  onChange={(e, newVal) => setActiveTab(newVal)}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabsMenu?.map((tM, index) => (
                    <Tab
                      key={index}
                      label={tM.label}
                      disableRipple
                      sx={{ textTransform: "capitalize" }}
                    />
                  ))}
                </Tabs>
              </Box>
            </Stack>
          </Box>
          {upMd ? (
            <>
              <div>
                {/* <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openSort ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Dashboard
                </Button> */}
                <input
                  accept=".xlsx"
                  // className={classes.input}
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e) => {
                    uploadExcel(e);
                  }}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="raised"
                    component="span"
                    // className={classes.button}
                  >
                    Upload
                  </Button>
                </label>
                <Button
                  disableRipple
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openSort ? "true" : undefined}
                  onClick={handleClick}
                  color="primary"
                  startIcon={<ImportExportIcon />}
                >
                  {"Sortir"}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElSort}
                  open={openSort}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <div className="menuSort">
                    <div className="switch">
                      <div>
                        <Button disabled>Sortir</Button>
                      </div>
                      <div>
                        <button
                          className="btn-terapkan"
                          onClick={() => sortData()}
                        >
                          Terapkan
                        </button>
                      </div>
                    </div>
                    <div className="flex tab-sort mt-8">{choseTab()}</div>
                    <hr className="border-grey my-5" />
                    <p>
                      <b>Urutkan Berdasarkan</b>
                    </p>
                    <div className="list-filter">{choseListFilter()}</div>
                  </div>
                </Menu>
              </div>
              <div>
                <Button
                  disableRipple
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openFilter ? "true" : undefined}
                  onClick={handleClickFilter}
                  color="primary"
                  startIcon={<FilterListIcon />}
                >
                  {"Filter"}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElFilter}
                  open={openFilter}
                  onClose={handleCloseFilter}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <div className="menuSort">
                    <div className="switch">
                      <div>
                        <Button disabled>Filter</Button>
                      </div>
                      <div>
                        <button className="btn-terapkan" onClick={() => doFilterData()}>Terapkan</button>
                        {/* <button className="btn-terapkan" onClick={() => doConcat()}>doConcat</button> */}
                      </div>
                    </div>
                    <div className="mt-5">
                      {/* <button onClick={() => cekFilter()}>cek</button> */}
                      <Search
                        onChange={(filed) => doSearch(filed.target.value)}
                      >
                        <SearchIconWrapper>
                          <SearchIcon sx={{ color: "tint.black.60" }} />
                        </SearchIconWrapper>
                        <StyledInputBaseFilter
                          color="primary"
                          placeholder="Cari . . ."
                          inputProps={{ "aria-label": "search" }}
                        />
                      </Search>
                    </div>
                    {/* <button onClick={() => cek()}>cek</button> */}
                    <div className="mt-5">
                      {/* <p>Selected</p> */}
                      {/* {areasSelected()} */}
                      {areasSelected()}
                    </div>
                    <hr/>
                    {/* <div>
                      <p>Chose</p>
                      {choseAreas()}
                    </div> */}
                    <div>
                      {/* <p>Merek</p> */}
                      {choseMerek()}
                      {/* <p>Model</p>
                      {choseModel()} */}
                      {/* {noArea ? 
                        <div className="empty-search">Isi keyword untuk melakukan pencarian.</div> : 
                        <span></span>
                      }
                      {searchEmpty ? 
                        <div className="empty-search">Hasil tidak ditemukan, masukkan keyword lain.</div> : 
                        <span></span>
                      } */}
                    </div>
                  </div>
                </Menu>
              </div>
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "tint.black.60" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  color="primary"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */}
            </>
          ) : null}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={1} color="red20">
                <MailIcon color="primary"/>
              </Badge>
            </IconButton> */}
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
              {/* <Avatar src="./images/web/avatar-example.png" /> */}
              {userInfo.profile_picture ? (
                <Avatar src={userInfo.profile_picture} />
              ) : (
                <Avatar src="./images/web/avatar-example.png" />
              )}

              {/* <AccountCircle /> */}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
        onClose={() => setMenuAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MyMenu ActivePage={ActivePage} />
      </Popover>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

