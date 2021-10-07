import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axiosBackend from "../../../Helper/axiosBackend";
import axios from "axios";

let obj = {
  data: {
    // cellMode: "view"
    // colDef: {width: 100, minWidth: 160, hide: false, sortable: true, resizable: true, …}
    // field: "created_at"
    // formattedValue: "2021-09-30T19:17:08.000000Z"
    // getValue: (...t) => n.current[e](...t)
    // hasFocus: false
    // id: 1
    // isEditable: false
    // row: {id: 1, name: 'Super Admin', email: 'vincentiusmandala@gmail.com', location: 'Surabaya', user_status: 'Active', …}
    // tabIndex: -1
    // value: "2021-09-30T19:17:08.000000Z"
    // [[Prototype]]: Object
    // setMenuAnchorEl: ƒ ()
    // [[Prototype]]: Object
  },
};

export default function CMEdit(props) {
  const { data, reload, field, dataSent } = props;
  const { setMenuAnchorEl } = props;
  const [Switch, setSwitch] = useState(false);
  //   const [ListKantor, setListKantor] = useState([]);
  //   const [ListRoles, setListRoles] = useState([]);

  const [InputMerek, setInputMerek] = useState(data.merek);
  const [InputModel, setInputModel] = useState(data.model);
  const [InputVarian, setInputVarian] = useState(data.varian);
  const [InputTahun, setInputTahun] = useState(data.tahun);
  const [InputJarakTempuh, setInputJarakTempuh] = useState(data.jarak_tempuh);
  const [InputWarna, setInputWarna] = useState(data.warna);
  const [InputBahanBakar, setInputBahanBakar] = useState(data.bahan_bakar);
  const [InputTransmisi, setInputTransmisi] = useState(data.transmisi);
  const [InputKondisi, setInputKondisi] = useState(data.kondisi);
  const [InputJenisUnit, setInputJenisUnit] = useState(data.jenis_unit);
  const [InputNamaCabang, setInputNamaCabang] = useState(data.nama_cabang);
  const [InputNoTelepon, setInputNoTelepon] = useState(data.no_telepon);
  const [InputAlamat, setInputAlamat] = useState(data.alamat);
  const [InputPIC, setInputPIC] = useState(data.pic);
  const [InputTanggalRegistrasi, setInputTanggalRegistrasi] = useState(data.user_status);
  //   useEffect(() => {
  //     loadKantor();
  //     loadRoles();
  //   }, []);

  const fieldList = {
    merek: {
      name: "merek",
      label: "Merek",
      set: setInputMerek,
      data: data.merek,
    },
    model: {
      name: "model",
      label: "Model",
      set: setInputModel,
      data: data.model,
    },
    varian: {
      name: "varian",
      label: "Varian",
      set: setInputVarian,
      data: data.varian,
    },
    tahun: {
      name: "tahun",
      label: "Tahun",
      set: setInputTahun,
      data: data.tahun,
    },
    jarak_tempuh: {
      name: "jarak_tempuh",
      label: "Jarak Tempuh",
      set: setInputJarakTempuh,
      data: data.jarak_tempuh,
    },
    warna: {
      name: "warna",
      label: "Warna",
      set: setInputWarna,
      data: data.warna,
    },
    bahan_bakar: {
      name: "bahan_bakar",
      label: "Bahan Bakar",
      set: setInputBahanBakar,
      data: data.bahan_bakar,
    },
    transmisi: {
      name: "transmisi",
      label: "Transmisi",
      set: setInputTransmisi,
      data: data.transmisi,
    },
    kondisi: {
      name: "kondisi",
      label: "Kondisi",
      set: setInputKondisi,
      data: data.kondisi,
    },
    jenis_unit: {
      name: "jenis_unit",
      label: "Jenis Unit",
      set: setInputJenisUnit,
      data: data.jenis_unit,
    },
    kondisi: {
      name: "kondisi",
      label: "Kondisi",
      set: setInputKondisi,
      data: data.kondisi,
    },
    jenis_unit: {
      name: "jenis_unit",
      label: "Jenis Unit",
      set: setInputJenisUnit,
      data: data.jenis_unit,
    },
  };

  const EditField = (title) => {
    return (
      <>
        <InputLabel htmlFor="input-1">{fieldList[title].label}</InputLabel>
        <Input
          type="text"
          label={fieldList[title].label}
          name={fieldList[title].name}
          onChange={(e) => {
            console.log(e.target.value);
            fieldList[title].set(e.target.value);
          }}
          defaultValue={fieldList[title].data}
        ></Input>
      </>
    );
  };

  const tableType = {
      "merek" : "MMV",
      "model" : "MMV",
      "varian" : "MMV",
      "tahun" : "tahun",
      "jarak_tempuh": "jarak_tempuh",
      "warna": "warna",
      "bahan_bakar": "bahan_bakar",
      "transmisi": "transmisi",
      "kondisi": "kondisi",
      "jenis_unit": "jenis_unit",
  }

  const queryParams = {
    MMV: {
      url: `/cm/merek-model-varian/update/${data.id}`,
      queryData: {
        merek: InputMerek,
        model: InputModel,
        varian: InputVarian,
      },
    },
    tahun: {
      url: `/cm/tahun-pembuatan/update/${data.id}`,
      queryData: {
        tahun: InputTahun,
      },
    },
    jarak_tempuh: {
      url: `/cm/jarak-tempuh/update/${data.id}`,
      queryData: {
        jarak_tempuh: InputJarakTempuh,
      },
    },
    warna: {
      url: `/cm/warna/update/${data.id}`,
      queryData: {
        warna: InputWarna,
      },
    },
    bahan_bakar: {
      url: `/cm/bahan-bakar/update/${data.id}`,
      queryData: {
        bahan_bakar: InputBahanBakar,
      },
    },
    transmisi: {
      url: `/cm/transmisi/update/${data.id}`,
      queryData: {
        transmisi: InputTransmisi,
      },
    },
    kondisi: {
      url: `/cm/kondisi/update/${data.id}`,
      queryData: {
        kondisi: InputKondisi,
      },
    },
    jenis_unit: {
      url: `/cm/jenis-unit/update/${data.id}`,
      queryData: {
        jenis_unit: InputJenisUnit,
      },
    },
  };

  const handleEditUser = async (type) => {
    await axiosBackend
      .post(queryParams[type].url, queryParams[type].queryData)
      .then((res) => {
        console.log(res, "CMEDIT");
        setMenuAnchorEl(null);
        reload()
      })
      .catch((err) => {
        console.log(err);
        setMenuAnchorEl(null);
      });

    dataSent();
  };

  return (
    <>
      <Card sx={{ width: 305, paddingBottom: 6, paddingTop: 1 }}>
        <CardContent sx={{ paddingBottom: 4 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="p"
              fontWeight={400}
              fontSize={15}
              color="tint.black.40"
              sx={{ marginY: 0.5, textTransform: "capitalize" }}
            >
              {`Edit ${field}`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: 10 }}
              onClick={() => handleEditUser(tableType[field])}
            >
              {"Ganti"}
            </Button>
          </Stack>
        </CardContent>
        <Collapse in={!Switch} timeout="auto" unmountOnExit>
          <CardContent>
            <Stack spacing={1}>
              {props && data ? EditField(field) : <></>}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
