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
import axiosBackend from "../../Helper/axiosBackend";

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
  const [selectedAreaModel, setSelectedAreaModel] = useState([]);
  const [selectedAreaVarian, setSelectedAreaVarian] = useState([]);
  const [selectedAreaJarak, setSelectedAreaJarak] = useState([]);
  const [selectedAreaTahun, setSelectedAreaTahun] = useState([]);
  const [selectedAreaNew, setSelectedAreaNew] = useState([]);
  const [areaBeforeSearch, setAreaBeforeSearch] = useState([]);
  const [defaultArea, setDefaultArea] = useState([]);
  const [defaultAreaModel, setDefaultAreaModel] = useState([]);
  const [defaultAreaVarian, setDefaultAreaVarian] = useState([]);
  const [defaultAreaJarak, setDefaultAreaJarak] = useState([]);
  const [defaultAreaTahun, setdefaultAreaTahun] = useState([]);
  const [defaultAreaUsers, setdefaultAreaUsers] = useState([]);

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
    const arrayModel = selectedAreaModel.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayVarian = selectedAreaVarian.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayTahun = selectedAreaTahun.filter(function(element, i) {
      return element.id !== item.id;
    });
    // console.log('data', array)
    setSelectedArea(array)
    setSelectedMerek(item.name)
    setSelectedAreaModel(arrayModel)
    setSelectedAreaVarian(arrayVarian)
    setSelectedAreaTahun(arrayTahun)
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

  const areasSelectedModel = () => {
    return selectedAreaModel.map((area) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(area)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {area.model}
            </Button>
    })
  }

  const areasSelectedVarian = () => {
    return selectedAreaVarian.map((area) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(area)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {area.varian}
            </Button>
    })
  }

  const areasSelectedJarak = () => {
    return selectedAreaJarak.map((area) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(area)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {area.jarak_tempuh}
            </Button>
    })
  }

  const areasSelectedTahun = () => {
    return selectedAreaTahun.map((tahun) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(tahun)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {tahun.tahun}
            </Button>
    })
  }

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

  const pushModel = (item) => {
    setSelectedMerek(item.model)
    const data = selectedAreaModel.concat(item)
    const ids = data.map(o => o.model)
    const duplicated = data.filter(({model}, index) => !ids.includes(model, index + 1))
    console.log('duplicated pushModel', duplicated)
    setSelectedAreaModel(duplicated)
  }

  const choseMerek = () => {
    return defaultArea.map((merek) => {
      // return <button onClick={() => pushMerek(merek)} className="btn-list-sort">{merek.name}</button>
      return <button onClick={() => pushMerek(merek)} className="btn-list-sort">{merek.merek}</button>
    })
  }

  const pushVarian = (item) => {
    setSelectedMerek(item.varian)
    const data = selectedAreaVarian.concat(item)
    const ids = data.map(o => o.varian)
    const duplicated = data.filter(({varian}, index) => !ids.includes(varian, index + 1))
    console.log('duplicated setSelectedAreaVarian', duplicated)
    setSelectedAreaVarian(duplicated)
  }

  // jarak tempuh
  const pushJarak = (item) => {
    const data = selectedAreaJarak.concat(item)
    // cek duplicated
    // console.log('data', data)
    const ids = data.map(o => o.jarak_tempuh)
    const duplicated = data.filter(({jarak_tempuh}, index) => !ids.includes(jarak_tempuh, index + 1))
    console.log('duplicated jarak_tempuh', duplicated)
    setSelectedAreaJarak(duplicated)
  }

  // jarak tempuh
  const pushTahun = (item) => {
    const data = selectedAreaTahun.concat(item)
    // cek duplicated
    // console.log('data', data)
    const ids = data.map(o => o.tahun)
    const duplicated = data.filter(({tahun}, index) => !ids.includes(tahun, index + 1))
    console.log('duplicated tahun', duplicated)
    setSelectedAreaTahun(duplicated)
  }


  const choseModel = () => {
    return defaultAreaModel.map((model) => {
      return <button onClick={() => pushModel(model)} className="btn-list-sort">{model.model}</button>
    })
  }

  const choseVarian = () => {
    return defaultAreaVarian.map((varian) => {
      return <button onClick={() => pushVarian(varian)} className="btn-list-sort">{varian.varian}</button>
    })
  }

  const choseJarak = () => {
    return defaultAreaJarak.map((jarak) => {
      return <button onClick={() => pushJarak(jarak)} className="btn-list-sort">{jarak.jarak_tempuh}</button>
    })
  }

  const choseTahun = () => {
    return defaultAreaTahun.map((tahun) => {
      return <button onClick={() => pushTahun(tahun)} className="btn-list-sort">{tahun.tahun}</button>
    })
  }

  const choseUsers = () => {
    return defaultAreaUsers.map((user) => {
      return <button onClick={() => pushTahun(user)} className="btn-list-sort">{user.user_status}</button>
    })
  }

  
  const doFilterData = async () => {
    // console.log('selectedArea', selectedArea)
    // setAreaBeforeSearch([])
    const filterModel = []
    if(ActivePage === 2 && ActiveSubTab === 2 && ActiveTab ===0){
      console.log('selectedAreaJarak', selectedAreaJarak)
      selectedAreaJarak.forEach((x) => {
        filterModel.push(x.jarak_tempuh)
      })
    }
    if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
      console.log('selectedAreaTahun', selectedAreaTahun)
      selectedAreaTahun.forEach((x) => {
        filterModel.push(x.tahun)
      })
    }
    if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
      console.log('selectedAreaModel', selectedAreaModel)
      selectedArea.forEach((y) => {
        filterModel.push(y.merek)
      })
      selectedAreaModel.forEach((x) => {
        filterModel.push(x.model)
      })
      selectedAreaVarian.forEach((x) => {
        filterModel.push(x.varian)
      })
    }
    if(ActivePage === 1 && ActiveSubTab === 0 && ActiveTab === 1){
      console.log('filterUser')
      // selectedAreaTahun.forEach((x) => {
      //   filterModel.push(x.tahun)
      // })
    }
    
    console.log('filterModel.toString()',filterModel.toString())
    console.log('activeTabel', activeTabel)
    getDataKu(filterModel.toString())
    // handleCloseFilter()

    // props.getDataFilter(selectedArea[0] ? selectedArea[0].merek : 'resetFilter')
    // props.getDataFilterMulti(selectedArea ? selectedArea : 'resetFilter')
  }

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

  // const doSearch = ((e) => {
  //   cekFilter(e)
  // })

  const [searchEmpty, setsearchEmpty] = useState(false);
  const [noArea, setnoArea] = useState(true);
  const [allDataMerek, setAllDataMerek] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTabel, setActiveTabel] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const doSearch = async (item) => {
    setSearchValue(item)
    await axiosBackend
      .post("/filter2", {
        table: activeTabel,
        keyword: item,
      })
      .then((response) => {
        setAllDataMerek(response.data.results);
        console.log('res get filter', response.data.results)
        const ids = response.data.results.map((o) => o.merek);
        const duplicated = response.data.results.filter(
          ({ merek }, index) => !ids.includes(merek, index + 1)
        );
        if(activeTabel === "jarak_tempuhs"){
          console.log('jarak_tempuhs', response.data.results)
          setDefaultAreaJarak(response.data.results)
        }
        if(activeTabel === "tahun_pembuatans"){
          console.log('tahun_pembuatans', response.data.results)
          setdefaultAreaTahun(response.data.results)
        }
        if(activeTabel === "users"){
          console.log('users', response.data.results)
          const idsUsers = response.data.results.map((o) => o.model);
          const duplicatedUser = response.data.results.filter(
            ({ model }, index) => !idsUsers.includes(model, index + 1)
          );
          console.log('duplicatedUser users', duplicatedUser)
          setdefaultAreaUsers(duplicatedUser)
        }
        setDefaultArea(duplicated);
        console.log('duplicated', duplicated)
        const idsModel = response.data.results.map((o) => o.model);
        const duplicatedModel = response.data.results.filter(
          ({ model }, index) => !idsModel.includes(model, index + 1)
        );
        const idsVarian = response.data.results.map(o => o.varian)
        const duplicatedVarian = response.data.results.filter(({varian}, index) => !idsVarian.includes(varian, index + 1))

        setDefaultAreaModel(duplicatedModel);
        setDefaultAreaVarian(duplicatedVarian)
        if(response.data.results.length === 0){
          setDefaultArea([])
          setDefaultAreaModel([])
          setDefaultAreaVarian([])
        }
        if(response.data.results.length === 0 && item !== ""){
          setsearchEmpty(true)
        } else {
          setsearchEmpty(false)
        }
      })
      .catch((err) => {
        console.warn(err.response);
      });
  };

  const getDataKu = async (item) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filter2',{
      table: activeTabel,
      keyword: item
    })
    .then((response) =>{ 
      // setFilteredData(response.data.results)
      if(ActivePage === 2 && ActiveSubTab === 2 && ActiveTab ===0){
        console.log('res getFilteredDataJarak', response.data.results)
        props.getFilteredDataJarak(response.data.results)
      }
      if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
        console.log('res getFilteredDataTahun', response.data.results)
        props.getFilteredDataTahun(response.data.results)
      }
      if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
        console.log('res getFilteredDataMerekModel', response.data.results)
        props.getFilteredDataMerekModel(response.data.results)
      }
      props.doFilter(true)
      setTimeout(() => {
        props.doFilter(false)
      }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  useEffect(() => {
    if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
      setShowFilter(true)
    }
    else if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
      setShowFilter(true)
    }
    else if(ActivePage === 1 && ActiveSubTab === 0 && ActiveTab ===1){
      setShowFilter(true)
    }
    else {
      setShowFilter(false)
    }
  }, [ActivePage, ActiveSubTab, ActiveTab])

  useEffect(() => {
    if(ActivePage === 2 && ActiveSubTab === 2 && ActiveTab ===0){
      setActiveTabel('jarak_tempuhs')
    }
    if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
      setActiveTabel('merek_model_varians')
    }
    if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
      setActiveTabel('tahun_pembuatans')
    }
    else if(ActivePage === 1 && ActiveSubTab === 0 && ActiveTab ===1){
      setActiveTabel('users')
    }
  }, [ActivePage, ActiveSubTab, ActiveTab])

  useEffect(() => {
    setNameSort(texts[0].name);
  }, [ActiveSubTab]);

  useEffect(() => {
    setNameSort(texts[0].name);
  }, [ActiveTab]);

  useEffect(() => {
    if (defaultArea.length === 0 && searchValue === ""){
      // console.log('default area length', defaultArea.length)
      if(selectedArea.length === 0){
        setnoArea(true)
      }
    } else {
      setnoArea(false)
    }
    setNameSort(texts[0].name);
  }, [defaultArea, searchValue]);

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
                    {/* <button onClick={() => console.log(props)}>cek</button> */}
                      <b>Urutkan Berdasarkan</b>
                    </p>
                    <div className="list-filter">{choseListFilter()}</div>
                  </div>
                </Menu>
              </div>
              {showFilter
              ?
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
                    {/* <button onClick={() => console.log('cek props', props)}>cek props</button> */}
                    { (props.ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0) ?
                    <div>
                      <div className="mt-5">
                        {/* <p>Selected</p> */}
                        {/* {areasSelected()} */}
                        {areasSelected()}
                        {areasSelectedModel()}
                        {areasSelectedVarian()}
                      </div>
                      {selectedArea.length > 0 || selectedAreaModel.length > 0 || selectedAreaVarian.length > 0
                        ? <hr className="hr-filter"/>
                        : <span></span>
                      }
                      {/* <div>
                        <p>Chose</p>
                        {choseAreas()}
                      </div> */}
                      <div>
                      {/* <button onClick={() => console.log('defaultAreaModel', defaultAreaModel)}>defaultAreaModel</button> */}
                        {/* <p>Merek</p>
                        {choseMerek()}
                        <p>Model</p>
                        {choseModel()} */}
                        {defaultArea.length > 0
                         ? <p className="color-primary">Merek</p>
                         : <span></span>
                        }
                        {choseMerek()}
                        {defaultAreaModel.length > 0
                         ? <p className="color-primary">Model</p>
                         : <span></span>
                        }
                        {choseModel()}
                        {defaultAreaVarian.length > 0
                         ? <p className="color-primary">Varian</p>
                         : <span></span>
                        }
                        {choseVarian()}
                        {/* {noArea ? 
                          <div className="empty-search">Isi keyword untuk melakukan pencarian.</div> : 
                          <span></span>
                        } */}
                        {defaultArea.length === 0 && defaultAreaModel.length === 0 && defaultAreaVarian.length === 0 && searchValue === ""
                          ? <div className="empty-search">Isi keyword untuk melakukan pencarian.</div>
                          : <span></span>
                        }
                        {defaultArea.length === 0 && defaultAreaModel.length === 0 && defaultAreaVarian.length === 0 && searchValue !== ""
                          ? <div className="empty-search">Hasil tidak ditemukan, masukkan keyword lain.</div>
                          : <span></span>
                        }
                        {/* {searchEmpty ? 
                          <div className="empty-search">Hasil tidak ditemukan, masukkan keyword lain.</div> : 
                          <span></span>
                        } */}
                      </div>
                    </div>
                    : (props.ActivePage === 2 && ActiveSubTab === 2 && ActiveTab ===0) 
                    ? 
                    <div>
                      {/* <p>Areas selected</p> */}
                      {areasSelectedJarak()}
                      <hr/>
                      {choseJarak()}
                      {/* <button onClick={() => console.log('defaultAreaJarak', defaultAreaJarak)}>defaultAreaJarak</button> */}
                    </div>
                    : (props.ActivePage === 2 && ActiveSubTab === 1 && ActiveTab === 0) 
                    ? 
                    <div>
                      {/* <p>Tahun selected</p> */}
                      {areasSelectedTahun()}
                      <hr/>
                      {choseTahun()}
                      {/* <button onClick={() => console.log('defaultAreaTahun', defaultAreaTahun)}>defaultAreaTahun</button> */}
                    </div>
                    :
                    (props.ActivePage === 1 && ActiveSubTab === 0 && ActiveTab ===1)
                    ?
                    <div>
                      {/* choseUsers
                      {choseUsers} */}
                    </div>
                    :
                    <span><button onClick={() => console.log('propss', props)}>Model</button></span>}
                    {/* <button onClick={() => cek()}>cek</button> */}
                  </div>
                </Menu>
              </div>
              :
              <span></span>}
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

