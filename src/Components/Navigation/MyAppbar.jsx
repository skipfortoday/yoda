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
import DownloadIcon from '@mui/icons-material/Download';
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
  const [isActiveClassFilter, setIsActiveClassFilter] = useState(false);
  const [isActiveClasssorting, setIsActiveClasssorting] = useState(false);
  

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
    setIsActiveClasssorting(true)
    setAnchorElSort(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElSort(null);
    setIsActiveClasssorting(false)
  };

  // menu filter
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
    setIsActiveClassFilter(true)
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
    setIsActiveClassFilter(false)
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
  const [selectedAreaUsers, setSelectedAreaUsers] = useState([]);
  const [selectedAreaProvinsi, setSelectedAreaProvinsi] = useState([]);
  const [selectedAreaKota, setSelectedAreaKota] = useState([]);
  const [selectedAreaKecamatan, setSelectedAreaKecamatan] = useState([]);
  const [selectedAreaCabang, setSelectedAreaCabang] = useState([]);
  const [selectedAreaRole, setSelectedAreaRole] = useState([]);
  const [selectedAreaStatus, setSelectedAreaStatus] = useState([]);
  const [selectedAreaCabangUser, setSelectedAreaCabangUser] = useState([]);
  const [selectedAreaNameUser, setSelectedAreaNameUser] = useState([]);
  const [selectedAreaUserPhone, setSelectedAreaUserPhone] = useState([]);
  const [selectedAreaUserEmail, setSelectedAreaUserEmail] = useState([]);
  const [selectedAreaNew, setSelectedAreaNew] = useState([]);
  const [areaBeforeSearch, setAreaBeforeSearch] = useState([]);
  const [defaultArea, setDefaultArea] = useState([]);
  const [defaultAreaModel, setDefaultAreaModel] = useState([]);
  const [defaultAreaVarian, setDefaultAreaVarian] = useState([]);
  const [defaultAreaJarak, setDefaultAreaJarak] = useState([]);
  const [defaultAreaTahun, setdefaultAreaTahun] = useState([]);
  const [defaultAreaProvinsi, setdefaultAreaProvinsi] = useState([]);
  const [defaultAreaKota, setdefaultAreaKota] = useState([]);
  const [defaultAreaKecamatan, setdefaultAreaKecamatan] = useState([]);
  const [defaultAreaCabang, setdefaultAreaCabang] = useState([]);
  const [defaultAreaRole, setdefaultAreaRole] = useState([]);
  const [defaultAreaStatus, setdefaultAreaStatus] = useState([]);
  const [defaultAreaCabangUser, setdefaultAreaCabangUser] = useState([]);
  const [defaultAreaNameUser, setdefaultAreaNameUser] = useState([]);
  const [defaultAreaUserPhone, setdefaultAreaUserPhone] = useState([]);
  const [defaultAreaUserEmail, setdefaultAreaUserEmail] = useState([]);
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
    const arrayProvinsi = selectedAreaProvinsi.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayKota = selectedAreaKota.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayKecamatan = selectedAreaKecamatan.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayCabang = selectedAreaCabang.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayTahun = selectedAreaTahun.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayUsers = selectedAreaUsers.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayRole = selectedAreaRole.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayStatus = selectedAreaStatus.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayCabangUser = selectedAreaCabangUser.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayNameUser = selectedAreaNameUser.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayUserPhone = selectedAreaUserPhone.filter(function(element, i) {
      return element.id !== item.id;
    });
    const arrayUserEmail = selectedAreaUserEmail.filter(function(element, i) {
      return element.id !== item.id;
    });
    // console.log('data', array)
    setSelectedArea(array)
    setSelectedMerek(item.name)
    setSelectedAreaModel(arrayModel)
    setSelectedAreaVarian(arrayVarian)
    setSelectedAreaProvinsi(arrayProvinsi)
    setSelectedAreaKota(arrayKota)
    setSelectedAreaKecamatan(arrayKecamatan)
    setSelectedAreaCabang(arrayCabang)
    setSelectedAreaRole(arrayRole)
    setSelectedAreaStatus(arrayStatus)
    setSelectedAreaCabangUser(arrayCabangUser)
    setSelectedAreaNameUser(arrayNameUser)
    setSelectedAreaUserPhone(arrayUserPhone)
    setSelectedAreaUserEmail(arrayUserEmail)
    setSelectedAreaTahun(arrayTahun)
    setSelectedAreaUsers(arrayUsers)
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

  const areasSelectedProvinsi = () => {
    return selectedAreaProvinsi.map((provinsi) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(provinsi)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {provinsi.provinsi}
            </Button>
    })
  }

  const areasSelectedKota= () => {
    return selectedAreaKota.map((kota) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(kota)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {kota.kota}
            </Button>
    })
  }

  const areasSelectedKecamatan = () => {
    return selectedAreaKecamatan.map((kecamatan) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(kecamatan)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {kecamatan.kecamatan}
            </Button>
    })
  }

  const areasSelectedCabang = () => {
    return selectedAreaCabang.map((cabang_pengelola) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(cabang_pengelola)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {cabang_pengelola.cabang_pengelola}
            </Button>
    })
  }

  const areasSelectedRole = () => {
    return selectedAreaRole.map((role) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(role)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {role.role}
            </Button>
    })
  }

  const areasSelectedStatus = () => {
    return selectedAreaStatus.map((user_status) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(user_status)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {user_status.user_status}
            </Button>
    })
  }

  const areasSelectedCabangUser = () => {
    return selectedAreaCabangUser.map((location) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(location)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {location.location}
            </Button>
    })
  }

  const areasSelectedNameUser = () => {
    return selectedAreaNameUser.map((name) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(name)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {name.name}
            </Button>
    })
  }

  const areasSelectedUserPhone = () => {
    return selectedAreaUserPhone.map((phone_number) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(phone_number)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {phone_number.phone_number}
            </Button>
    })
  }

  const areasSelectedUserEmail = () => {
    return selectedAreaUserEmail.map((email) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(email)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {email.email}
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
  const areasSelectedUsers = () => {
    return selectedAreaUsers.map((user) => {
      return <Button className="m-1" onClick={() => pushAreaDefault(user)} variant="outlined" endIcon={<HighlightOffIcon />}>
              {user.user_status}
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

  const pushProvinsi = (item) => {
    const data = selectedAreaProvinsi.concat(item)
    const ids = data.map(o => o.provinsi)
    const duplicated = data.filter(({provinsi}, index) => !ids.includes(provinsi, index + 1))
    setSelectedAreaProvinsi(duplicated)
  }

  const pushKota = (item) => {
    const data = selectedAreaKota.concat(item)
    const ids = data.map(o => o.kota)
    const duplicated = data.filter(({kota}, index) => !ids.includes(kota, index + 1))
    setSelectedAreaKota(duplicated)
  }

  const pushKecamatan = (item) => {
    const data = selectedAreaKecamatan.concat(item)
    const ids = data.map(o => o.kecamatan)
    const duplicated = data.filter(({kecamatan}, index) => !ids.includes(kecamatan, index + 1))
    setSelectedAreaKecamatan(duplicated)
  }

  const pushCabang = (item) => {
    const data = selectedAreaCabang.concat(item)
    const ids = data.map(o => o.cabang_pengelola)
    const duplicated = data.filter(({cabang_pengelola}, index) => !ids.includes(cabang_pengelola, index + 1))
    setSelectedAreaCabang(duplicated)
  }

  const pushRole = (item) => {
    const data = selectedAreaRole.concat(item)
    const ids = data.map(o => o.role)
    const duplicated = data.filter(({role}, index) => !ids.includes(role, index + 1))
    console.log('duplicated setSelectedAreaRole', duplicated)
    setSelectedAreaRole(duplicated)
  }

  const pushStatus = (item) => {
    const data = selectedAreaStatus.concat(item)
    const ids = data.map(o => o.user_status)
    const duplicated = data.filter(({user_status}, index) => !ids.includes(user_status, index + 1))
    console.log('duplicated setSelectedAreaStatus', duplicated)
    setSelectedAreaStatus(duplicated)
  }

  const pushCabangUser = (item) => {
    const data = selectedAreaCabangUser.concat(item)
    const ids = data.map(o => o.location)
    const duplicated = data.filter(({location}, index) => !ids.includes(location, index + 1))
    console.log('duplicated setSelectedAreaCabangUser', duplicated)
    setSelectedAreaCabangUser(duplicated)
  }

  const pushNameUser = (item) => {
    const data = selectedAreaNameUser.concat(item)
    const ids = data.map(o => o.name)
    const duplicated = data.filter(({name}, index) => !ids.includes(name, index + 1))
    console.log('duplicated setSelectedAreaNameUser', duplicated)
    setSelectedAreaNameUser(duplicated)
  }

  const pushUserPhone= (item) => {
    const data = selectedAreaUserPhone.concat(item)
    const ids = data.map(o => o.phone_number)
    const duplicated = data.filter(({phone_number}, index) => !ids.includes(phone_number, index + 1))
    console.log('duplicated setSelectedAreaUserPhone', duplicated)
    setSelectedAreaUserPhone(duplicated)
  }

  const pushUserEmail= (item) => {
    const data = selectedAreaUserEmail.concat(item)
    const ids = data.map(o => o.email)
    const duplicated = data.filter(({email}, index) => !ids.includes(email, index + 1))
    console.log('duplicated setSelectedAreaUserEmail', duplicated)
    setSelectedAreaUserEmail(duplicated)
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

  // jarak tempuh
  const pushUser = (item) => {
    const data = selectedAreaUsers.concat(item)
    // cek duplicated
    // console.log('data', data)
    const ids = data.map(o => o.user_status)
    const duplicated = data.filter(({user_status}, index) => !ids.includes(user_status, index + 1))
    console.log('duplicated user_status', duplicated)
    setSelectedAreaUsers(duplicated)
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

  const choseProvinsi = () => {
    return defaultAreaProvinsi.map((wilayah) => {
      return <button onClick={() => pushProvinsi(wilayah)} className="btn-list-sort">{wilayah.provinsi}</button>
    })
  }

  const chosekota = () => {
    return defaultAreaKota.map((kota) => {
      return <button onClick={() => pushKota(kota)} className="btn-list-sort">{kota.kota}</button>
    })
  }

  const choseKecamatan = () => {
    return defaultAreaKecamatan.map((kecamatan) => {
      return <button onClick={() => pushKecamatan(kecamatan)} className="btn-list-sort">{kecamatan.kecamatan}</button>
    })
  }

  const choseCabang = () => {
    return defaultAreaCabang.map((cabang_pengelola) => {
      return <button onClick={() => pushCabang(cabang_pengelola)} className="btn-list-sort">{cabang_pengelola.cabang_pengelola}</button>
    })
  }

  const choseRole = () => {
    return defaultAreaRole.map((user) => {
      return <button onClick={() => pushRole(user)} className="btn-list-sort">{user.role}</button>
    })
  }

  const choseStatus = () => {
    return defaultAreaStatus.map((user) => {
      return <button onClick={() => pushStatus(user)} className="btn-list-sort">{user.user_status}</button>
    })
  }

  const choseCabangUser = () => {
    return defaultAreaCabangUser.map((user) => {
      return <button onClick={() => pushCabangUser(user)} className="btn-list-sort">{user.location}</button>
    })
  }

  const choseNameUser = () => {
    return defaultAreaNameUser.map((user) => {
      return <button onClick={() => pushNameUser(user)} className="btn-list-sort">{user.name}</button>
    })
  }

  const choseUserPhone = () => {
    return defaultAreaUserPhone.map((user) => {
      return <button onClick={() => pushUserPhone(user)} className="btn-list-sort">{user.phone_number}</button>
    })
  }

  const choseUserEmail = () => {
    return defaultAreaUserEmail.map((user) => {
      return <button onClick={() => pushUserEmail(user)} className="btn-list-sort">{user.email}</button>
    })
  }

  const choseUsers = () => {
    return defaultAreaUsers.map((user) => {
      return <button onClick={() => pushUserEmail(user)} className="btn-list-sort">{user.user_status}</button>
    })
  }

  
  const doFilterData = async () => {
    // console.log('selectedArea', selectedArea)
    // setAreaBeforeSearch([])
    const filterModel = []
    const filterdataMerek = []
    const filterdataModel = []
    const filterdataVarian = []
    const filterdataProvinsi = []
    const filterdataKota = []
    const filterdataKecamatan = []
    const filterdataCabang = []
    const filterdataRole = []
    const filterdataStatus = []
    const filterdataCabangUser = []
    const filterdataNameUser = []
    const filterdataUserPhone = []
    const filterdataUserEmail = []
    const filterdataTahun = []
    if(ActivePage === 2 && ActiveSubTab === 2 && ActiveTab ===0){
      console.log('selectedAreaJarak', selectedAreaJarak)
      selectedAreaJarak.forEach((x) => {
        filterModel.push(x.jarak_tempuh)
      })
    }
    if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
      console.log('selectedAreaTahun', selectedAreaTahun)
      selectedAreaTahun.forEach((x) => {
        filterdataTahun.push(x.tahun)
      })
      getDataTahun(filterdataTahun.toString())
    }
    if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===1){
      console.log('selectedAreaProvinsi', selectedAreaProvinsi)
      selectedAreaProvinsi.forEach((x) => {
        filterdataProvinsi.push(x.provinsi)
      })
      selectedAreaKota.forEach((x) => {
        filterdataKota.push(x.kota)
      })
      selectedAreaKecamatan.forEach((x) => {
        filterdataKecamatan.push(x.kecamatan)
      })
      selectedAreaCabang.forEach((x) => {
        filterdataCabang.push(x.cabang_pengelola)
      })
      console.log('filterdataProvinsi', filterdataProvinsi)
      getDataWilayah(filterdataProvinsi.toString(), filterdataKota.toString(), filterdataKecamatan.toString(), filterdataCabang.toString())
    }
    if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
      console.log('selectedAreaModel', selectedAreaModel)
      selectedArea.forEach((y) => {
        filterdataMerek.push(y.merek)
      })
      selectedAreaModel.forEach((x) => {
        filterdataModel.push(x.model)
      })
      selectedAreaVarian.forEach((x) => {
        filterdataVarian.push(x.varian)
      })
      getDataKuNew(filterdataMerek.toString(), filterdataModel.toString(), filterdataVarian.toString())
    }
    if(ActivePage === 1 && ActiveSubTab === 0 && ActiveTab === 1){
      console.log('filterUser')
      selectedAreaRole.forEach((x) => {
        filterdataRole.push(x.role)
      })
      selectedAreaStatus.forEach((x) => {
        filterdataStatus.push(x.user_status)
      })
      selectedAreaCabangUser.forEach((x) => {
        filterdataCabangUser.push(x.location)
      })
      getDataUsers(filterdataRole.toString(), filterdataStatus.toString(), filterdataCabangUser.toString())
    }

    if(ActivePage === 1 && ActiveSubTab === 1 && ActiveTab === 1){
      console.log('filterUser')
      selectedAreaNameUser.forEach((x) => {
        filterdataNameUser.push(x.name)
      })
      selectedAreaUserPhone.forEach((x) => {
        filterdataUserPhone.push(x.phone_number)
      })
      selectedAreaUserEmail.forEach((x) => {
        filterdataUserEmail.push(x.email)
      })
      getDataUsersExternal(filterdataNameUser.toString(), filterdataUserPhone.toString(), filterdataUserEmail.toString())
    }
    
    // console.log('filterdataMerek.toString()',filterdataMerek.toString())
    // console.log('filterdataModel.toString()',filterdataModel.toString())
    // console.log('filterdataVarian', filterdataVarian.toString())
    // handleCloseFilter()

    // props.getDataFilter(selectedArea[0] ? selectedArea[0].merek : 'resetFilter')
    // props.getDataFilterMulti(selectedArea ? selectedArea : 'resetFilter')
  }

  const getDataUsersExternal= async (nama, phone, email) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterExternal',{
      nama: nama,
      phone_number: phone,
      email: email
    })
    .then((response) =>{ 
      console.log('getDataUsersExternal', response.data.results)
      setFilteredData(response.data.results)
      props.getFilteredDataUsersExternal(response.data.results)
      props.doFilter(true)
      setTimeout(() => {
        props.doFilter(false)
      }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  const getDataWilayah= async (provinsi, kota, kecamatan, cabang) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterWilayah',{
      provinsi: provinsi,
      kota: kota,
      kecamatan: kecamatan,
      cabang_pengelola: cabang
    })
    .then((response) =>{ 
      console.log('response provinsi', response)
      setFilteredData(response.data.results)
      console.log('res getFilteredDataWilayah', response.data.results)
      props.getFilteredDataWilayah(response.data.results)
      props.doFilter(true)
      setTimeout(() => {
        props.doFilter(false)
      }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  const getDataUsers= async (role, Status, cabang) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterUser',{
      role: role,
      Status: Status,
      cabang: cabang
    })
    .then((response) =>{ 
      console.log('response', response.data.results)
      setFilteredData(response.data.results)
      props.getFilteredDataUsersInternal(response.data.results)
      props.doFilter(true)
      setTimeout(() => {
        props.doFilter(false)
      }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  const getDataKuNew = async (merek, model, varian) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterMMV',{
      merek: merek,
      model: model,
      varian: varian
    })
    .then((response) =>{ 
      console.log('response', response)
      setFilteredData(response.data.results)
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

  const getDataProvinsi = async (tahun) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterTahun',{
      tahun: tahun
    })
    .then((response) =>{
      setFilteredData(response.data.results)
      console.log('res getFilteredDataTahun', response.data.results)
      props.getFilteredDataTahun(response.data.results)
      props.doFilter(true)
      setTimeout(() => {
        props.doFilter(false)
      }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  const getDataTahun = async (tahun) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterTahun',{
      tahun: tahun
    })
    .then((response) =>{
      setFilteredData(response.data.results)
      console.log('res getFilteredDataTahun', response.data.results)
      props.getFilteredDataTahun(response.data.results)
      props.doFilter(true)
      setTimeout(() => {
        props.doFilter(false)
      }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
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
  const [showUpload, setShowUpload] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const doSearch = async (item) => {
    console.log('activeTabel', activeTabel)
    setSearchValue(item)
    if(activeTabel === "users_external") {
      console.log('wadudu')
      await axiosBackend
        .post("/filter2", {
          table: 'users',
          keyword: item,
        })
        .then((response) => {
          setAllDataMerek(response.data.results);
          console.log('res get filter', response.data.results)
          const idsUserName = response.data.results.map((o) => o.name);
          const duplicatedModel = response.data.results.filter(
            ({ name }, index) => !idsUserName.includes(name, index + 1)
          );
          const idsUserPhone = response.data.results.map((o) => o.phone_number);
          const duplicatedUserPhone = response.data.results.filter(
            ({ phone_number }, index) => !idsUserPhone.includes(phone_number, index + 1)
          );
          const idsUserEmail = response.data.results.map((o) => o.email);
          const duplicatedUserEmail = response.data.results.filter(
            ({ email }, index) => !idsUserEmail.includes(email, index + 1)
          );
          // console.log('duplicatedUserPhone', duplicatedUserPhone)
          setdefaultAreaNameUser(duplicatedModel)
          setdefaultAreaUserPhone(duplicatedUserPhone)
          setdefaultAreaUserEmail(duplicatedUserEmail)
          // console.log('duplicatedVarian', duplicatedVarian)
          // if(response.data.results.length === 0){
          //   setDefaultArea([])
          //   setDefaultAreaModel([])
          //   setDefaultAreaVarian([])
          // }
          // if(response.data.results.length === 0 && item !== ""){
          //   setsearchEmpty(true)
          // } else {
          //   setsearchEmpty(false)
          // }
        })
        .catch((err) => {
          console.warn(err.response);
        });
    }
    if(activeTabel === "users") {
      console.log('tab users')
      await axiosBackend
        .post("/buttonUser", {
          keyword: item,
        })
        .then((response) => {
          console.log('res get filter', response.data.results)
          const idsRole = response.data.results.map((o) => o.role);
          const duplicatedRole = response.data.results.filter(
            ({ role }, index) => !idsRole.includes(role, index + 1)
          );
          const idsStatus = response.data.results.map((o) => o.user_status);
          const duplicatedStatus = response.data.results.filter(
            ({ user_status }, index) => !idsStatus.includes(user_status, index + 1)
          );
          const idsCabangUser = response.data.results.map((o) => o.user_status);
          const duplicatedCabangUser = response.data.results.filter(
            ({ user_status }, index) => !idsCabangUser.includes(user_status, index + 1)
          );
          setdefaultAreaRole(duplicatedRole);
          setdefaultAreaStatus(duplicatedStatus);
          setdefaultAreaCabangUser(duplicatedCabangUser);
          if(response.data.results.length === 0){
            setdefaultAreaRole([])
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
    }
    if(activeTabel !== "users" && activeTabel !== "users_external"){
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
          setDefaultArea(duplicated);
          console.log('duplicated', duplicated)
  
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
          if(activeTabel === "wilayahs"){
            // console.log('wilayahs', response.data.results)
            // setDefaultAreaJarak(response.data.results)
            const idsProvinsi = response.data.results.map((o) => o.provinsi);
            const duplicatedProvinsi = response.data.results.filter(
              ({ provinsi }, index) => !idsProvinsi.includes(provinsi, index + 1)
            );
            const idsKota = response.data.results.map((o) => o.kota);
            const duplicatedKota = response.data.results.filter(
              ({ kota }, index) => !idsKota.includes(kota, index + 1)
            );
            const idsKecamatan = response.data.results.map((o) => o.kecamatan);
            const duplicatedKecamatan = response.data.results.filter(
              ({ kecamatan }, index) => !idsKecamatan.includes(kecamatan, index + 1)
            );
            const idsCabang = response.data.results.map((o) => o.cabang_pengelola);
            const duplicatedCabang = response.data.results.filter(
              ({ cabang_pengelola }, index) => !idsCabang.includes(cabang_pengelola, index + 1)
            );
            console.log('duplicatedProvinsi', duplicatedProvinsi)
            setdefaultAreaProvinsi(duplicatedProvinsi)
            setdefaultAreaKota(duplicatedKota)
            setdefaultAreaKecamatan(duplicatedKecamatan)
            setdefaultAreaCabang(duplicatedCabang)
          }
          
          const idsModel = response.data.results.map((o) => o.model);
          const duplicatedModel = response.data.results.filter(
            ({ model }, index) => !idsModel.includes(model, index + 1)
          );
          const idsVarian = response.data.results.map(o => o.varian)
          const duplicatedVarian = response.data.results.filter(({varian}, index) => !idsVarian.includes(varian, index + 1))
  
          setDefaultAreaModel(duplicatedModel);
          setDefaultAreaVarian(duplicatedVarian)
          console.log('duplicatedModel', duplicatedModel)
          console.log('duplicatedVarian', duplicatedVarian)
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
    }
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

  const getDataUser = async (item) => {
    await axios.post('https://yodacentral.herokuapp.com/api/filterUser',{
      role: 'External',
      cabang: 'Test',
      Status: ''
    })
    .then((response) =>{ 
      setFilteredData(response.data.results)
      // if(ActivePage === 2 && ActiveSubTab === 2 && ActiveTab ===0){
      //   console.log('res getFilteredDataJarak', response.data.results)
      //   props.getFilteredDataJarak(response.data.results)
      // }
      // if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
      //   console.log('res getFilteredDataTahun', response.data.results)
      //   props.getFilteredDataTahun(response.data.results)
      // }
      // if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
      //   console.log('res getFilteredDataMerekModel', response.data.results)
      //   props.getFilteredDataMerekModel(response.data.results)
      // }
      // props.doFilter(true)
      // setTimeout(() => {
      //   props.doFilter(false)
      // }, 300)
    })
    .catch((err) => { 
      console.warn(err.response)
    })
  }

  useEffect(() => {
    if(ActivePage === 2 && ActiveSubTab === 0 && ActiveTab ===0){
      setShowFilter(true)
      setShowUpload(true)
    }
    else if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===0){
      setShowFilter(true)
    }
    else if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===1){
      setShowFilter(true)
    }
    else if(ActivePage === 1 && ActiveSubTab === 0 && ActiveTab ===1){
      setShowFilter(true)
    }
    else if(ActivePage === 1 && ActiveSubTab === 1 && ActiveTab ===1){
      setShowFilter(true)
    }
    else {
      setShowFilter(false)
      setShowUpload(false)
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
    if(ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===1){
      setActiveTabel('wilayahs')
    }
    if(ActivePage === 1 && ActiveSubTab === 0 && ActiveTab ===1){
      setActiveTabel('users')
    }
    if(ActivePage === 1 && ActiveSubTab === 1 && ActiveTab ===1){
      setActiveTabel('users_external')
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
              <div className="navbar color-primary-grey">
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
                {/* <button onClick={() => getDataUser()}>getDataUser</button> */}
                {showUpload ? 
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="raised"
                      component="span"
                      startIcon={<DownloadIcon />}
                    >Unggah data
                    </Button>
                    {/* <Button
                      id="basic-button"
                      startIcon={<DownloadIcon />}
                    >
                      {"Unggah data"}
                    </Button> */}
                  </label>
                : <span></span>}
                {/* <button onClick={() => console.log(props)}>lah</button> */}
                <Button
                  disableRipple
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openSort ? "true" : undefined}
                  onClick={handleClick}
                  className={`${isActiveClasssorting ? "sortingon" : "sortingoff"}`}
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
              <div className="navbar">
                <Button
                  disableRipple
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openFilter ? "true" : undefined}
                  className={`box ${isActiveClassFilter ? "filteron" : "filteroff"}`}
                  onClick={handleClickFilter}
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
                      {/* {areasSelectedUsers()} */}
                      {areasSelectedRole()}
                      {areasSelectedStatus()}
                      {areasSelectedCabangUser()}
                      <hr/>
                      {/* {choseUsers()} */}
                      {defaultAreaRole.length > 0
                        ? <p className="color-primary">Role</p>
                        : <span></span>
                      }
                      {choseRole()}
                      {defaultAreaStatus.length > 0
                        ? <p className="color-primary">Status</p>
                        : <span></span>
                      }
                      {choseStatus()}
                      {defaultAreaCabangUser.length > 0
                        ? <p className="color-primary">Cabang</p>
                        : <span></span>
                      }
                      {choseCabangUser()}
                    </div>
                    :
                    (props.ActivePage === 1 && ActiveSubTab === 0 && ActiveTab ===1)
                    ?
                    <div>
                      {/* {areasSelectedUsers()} */}
                      {areasSelectedRole()}
                      {areasSelectedStatus()}
                      {areasSelectedCabangUser()}
                      <hr/>
                      {/* {choseUsers()} */}
                      {defaultAreaRole.length > 0
                        ? <p className="color-primary">Role</p>
                        : <span></span>
                      }
                      {choseRole()}
                      {defaultAreaStatus.length > 0
                        ? <p className="color-primary">Status</p>
                        : <span></span>
                      }
                      {choseStatus()}
                      {defaultAreaCabangUser.length > 0
                        ? <p className="color-primary">Cabang</p>
                        : <span></span>
                      }
                      {choseCabangUser()}
                    </div>
                    :
                    (props.ActivePage === 1 && ActiveSubTab === 1 && ActiveTab ===1)
                    ?
                    <div>
                      {areasSelectedNameUser()}
                      {areasSelectedUserPhone()}
                      {areasSelectedUserEmail()}
                      <p>name</p>
                      {choseNameUser()}
                      <p>Phone</p>
                      {choseUserPhone()}
                      <p>Email</p>
                      {choseUserEmail()}
                    </div>
                    :
                    (props.ActivePage === 2 && ActiveSubTab === 1 && ActiveTab ===1)
                    ?
                    <div>
                      {areasSelectedProvinsi()}
                      {areasSelectedKota()}
                      {areasSelectedKecamatan()}
                      {areasSelectedCabang()}
                      <hr/>
                      {defaultAreaProvinsi.length > 0
                        ?
                        <p>provinsi</p>
                        :
                        <span></span>
                      }
                      {choseProvinsi()}
                      {defaultAreaKota.length > 0
                        ?
                        <p>kota</p>
                        :
                        <span></span>
                      }
                      {chosekota()}
                      {defaultAreaKecamatan.length > 0
                        ?
                        <p>Kecamatan</p>
                        :
                        <span></span>
                      }
                      {choseKecamatan()}
                      {defaultAreaCabang.length > 0
                        ?
                        <p>Cabang pengelola</p>
                        :
                        <span></span>
                      }
                      {choseCabang()}
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "tint.black.60" }} />
            </SearchIconWrapper>
            <StyledInputBaseFilter
              color="primary"
              placeholder="Cari . . ."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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

