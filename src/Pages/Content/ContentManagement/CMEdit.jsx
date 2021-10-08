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
  const { data, reload, field, dataSent, sendToast } = props;
  const { setMenuAnchorEl } = props;
  const [Switch, setSwitch] = useState(false);
  console.log(data,"CMEDIT44");
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
  const [InputKodeCabang, setInputKodeCabang] = useState(data.kode_cabang);
  const [InputNoTelepon, setInputNoTelepon] = useState(data.no_telepon);
  const [InputAlamat, setInputAlamat] = useState(data.alamat);
  const [InputPIC, setInputPIC] = useState(data.pic);
  // const [InputTanggalRegistrasi, setInputTanggalRegistrasi] = useState(data.user_status);
  const [InputKecamatan, setInputKecamatan] = useState(data.kecamatan);
  const [InputKota, setInputKota] = useState(data.kota);
  const [InputProvinsi, setInputProvinsi] = useState(data.provinsi);
  const [InputCabangPengelola, setInputCabangPengelola] = useState(data.cabang_pengelola);

  const [InputTujuanPenggunaan, setInputTujuanPenggunaan] = useState(data.tujuan_penggunaan);
  const [InputKategori, setInputKategori] = useState(data.kategori);
  const [InputTipeAsuransi, setInputTipeAsuransi] = useState(data.tipe_asuransi);
  const [InputKesertaanAsuransi, setInputKesertaanAsuransi] = useState(data.kesertaan_asuransi);
  const [InputNilaiPertanggungan, setInputNilaiPertanggungan] = useState(data.nilai_pertanggungan);
  const [InputPembayaranAsuransi, setInputPembayaranAsuransi] = useState(data.pembayaran_asuransi);
  const [InputTenor, setInputTenor] = useState(data.tenor);
  const [InputAngsuranPertama, setInputAngsuranPertama] = useState(data.angsuran_pertama);
  const [InputNama, setInputNama] = useState(data.nama);
  //const [InputCabangPengelola, setInputCabangPengelola] = useState(data.cabang_pengelola);
  //const [InputCabangPengelola, setInputCabangPengelola] = useState(data.cabang_pengelola);
  //const [InputCabangPengelola, setInputCabangPengelola] = useState(data.cabang_pengelola);
  // const [InputTanggalRegistrasi, setInputTanggalRegistrasi] = useState(data.user_status);
  const [PICArray, setPICArray] = useState([]);

    useEffect(() => {
      loadPIC()
      console.log(field, "74747474")
      console.log(InputNama, "NAMANAMA")
      // loadRoles();
    }, []);

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
    cabang_pengelola: {
      name: "cabang_pengelola",
      label: "Cabang Pengelola",
      set: setInputNamaCabang,
      data: data.cabang_pengelola,
    },
    no_telepon: {
      name: "no_telepon",
      label: "No. Telepon",
      set: setInputNoTelepon,
      data: data.no_telepon,
    },
    alamat: {
      name: "alamat",
      label: "Alamat",
      set: setInputAlamat,
      data: data.alamat,
    },
    // nama_cabang: {
    //   name: "nama_caabang",
    //   label: "Nama Cabang",
    //   set: setInputNamaCabang,
    //   data: data.nama_cabang,
    // },
    pic: {
      name: "pic",
      label: "PIC",
      set: setInputPIC,
      data: data.pic,
    },
    kecamatan: {
      name: "kecamatan",
      label: "Kecamatan",
      set: setInputKecamatan,
      data: data.kecamatan,
    },
    kota: {
      name: "kota",
      label: "Kota",
      set: setInputKota,
      data: data.kota,
    },
    provinsi: {
      name: "provinsi",
      label: "Provinsi",
      set: setInputProvinsi,
      data: data.provinsi,
    },
    cabang_pengelola: {
      name: "cabang_pengelola",
      label: "Cabang Pengelola",
      set: setInputCabangPengelola,
      data: data.cabang_pengelola,
    },
    tujuan_penggunaan: {
      name: "tujuan_penggunaan",
      label: "Tujuan Penggunaan",
      set: setInputTujuanPenggunaan,
      data: data.tujuan_penggunaan,
    },
    kategori: {
      name: "kategori",
      label: "Kategori",
      set: setInputKategori,
      data: data.kategori,
    },
    tipe_asuransi: {
      name: "tipe_asuransi",
      label: "Tipe Asuransi",
      set: setInputTipeAsuransi,
      data: data.tipe_asuransi,
    },
    kesertaan_asuransi: {
      name: "kesertaan_asuransi",
      label: "Kesertaan Asuransi",
      set: setInputKesertaanAsuransi,
      data: data.kesertaan_asuransi,
    },
    nilai_pertanggungan: {
      name: "nilai_pertanggungan",
      label: "Nilai Pertanggungan",
      set: setInputNilaiPertanggungan,
      data: data.nilai_pertanggungan,
    },
    pembayaran_asuransi: {
      name: "pembayaran_asuransi",
      label: "Pembayaran Asuransi",
      set: setInputPembayaranAsuransi,
      data: data.pembayaran_asuransi,
    },
    tenor: {
      name: "tenor",
      label: "Tenor",
      set: setInputTenor,
      data: data.tenor,
    },
    angsuran_pertama: {
      name: "angsuran_pertama",
      label: "Angsuran Pertama",
      set: setInputAngsuranPertama,
      data: data.angsuran_pertama,
    },
    nama: {
      name: "nama",
      label: "Nama",
      set: setInputNama,
      data: data.nama,
    },
  };

  const EditField = (title) => {
    console.log(title, "TITLE");
    if (title === "nama_cabang" || title === "kode_cabang"){
      return (
        <>
          <InputLabel htmlFor="input-1">Nama Cabang</InputLabel>
          <Input
            type="text"
            label="Nama Cabang"
            name="nama_cabang"
            onChange={(e) => {
              console.log(e.target.value);
              setInputNamaCabang(e.target.value);
            }}
            defaultValue={InputNamaCabang}
          ></Input>

          <InputLabel htmlFor="input-1">Kode Cabang</InputLabel>
          <Input
            type="text"
            label="Kode Cabang"
            name="kode_cabang"
            onChange={(e) => {
              console.log(e.target.value);
              setInputKodeCabang(e.target.value);
            }}
            defaultValue={InputKodeCabang}
          ></Input>
        </>
      );
    }else if(title === "pic"){
      return (
      <>
        <InputLabel htmlFor="input-1">PIC</InputLabel>

        <Select labelId="PIC" id="pic" defaultValue={InputPIC}>
          {PICArray?.map((data, idx) => {
            return (
              <MenuItem
                value={data.id}
                key={idx}
                onClick={() => {
                  console.log(data.id, "DID");
                  setInputPIC(data.id);
                }}
              >
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </>
      )
    }else{
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
    }
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
      "nama_cabang": "kantor",
      "kode_cabang": "kantor",
      "no_telepon": !InputNama ? "kantor" : "penjual",
      "alamat": !InputNama ? "kantor" : "penjual",
      "pic": "kantor",
      "kecamatan": !InputNama ? "wilayah" : "penjual",
      "kota": !InputNama ? "wilayah" : "penjual",
      "provinsi": !InputNama ? "wilayah" : "penjual",
      "cabang_pengelola": "wilayah",
      "tujuan_penggunaan": "tujuan_penggunaan",
      "kategori": "kategori",
      "tipe_asuransi": "tipe_asuransi",
      "kesertaan_asuransi": "kesertaan_asuransi",
      "nilai_pertanggungan": "nilai_pertanggungan",
      "pembayaran_asuransi": "pembayaran_asuransi",
      "tenor": "tenor",
      "angsuran_pertama": "angsuran_pertama",
      "nama": "penjual",
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
    kantor: {
      url: `/cm/kantor/update/${data.id}`,
      queryData: {
        nama_cabang: InputNamaCabang,
        kode_cabang: InputKodeCabang,
        no_telepon: InputNoTelepon,
        alamat: InputAlamat,
        pic: InputPIC,
      },
    },
    wilayah: {
      url: `/cm/wilayah/update/${data.id}`,
      queryData: {
        provinsi: InputProvinsi,
        kota: InputKota,
        kecamatan: InputKecamatan,
        cabang_pengelola: InputCabangPengelola,
      },
    },
    tujuan_penggunaan: {
      url: `/cm/tujuan-penggunaan/update/${data.id}`,
      queryData: {
        tujuan_penggunaan: InputTujuanPenggunaan,
      },
    },
    kategori: {
      url: `/cm/kategori/update/${data.id}`,
      queryData: {
        kategori: InputKategori,
      },
    },
    kesertaan_asuransi: {
      url: `/cm/kesertaan-asuransi/update/${data.id}`,
      queryData: {
        kesertaan_asuransi: InputKesertaanAsuransi,
      },
    },
    tipe_asuransi: {
      url: `/cm/tipe-asuransi/update/${data.id}`,
      queryData: {
        tipe_asuransi: InputTipeAsuransi,
      },
    },
    nilai_pertanggungan: {
      url: `/cm/nilai-pertanggungan/update/${data.id}`,
      queryData: {
        nilai_pertanggungan: InputNilaiPertanggungan,
      },
    },
    pembayaran_asuransi: {
      url: `/cm/pembayaran-asuransi/update/${data.id}`,
      queryData: {
        pembayaran_asuransi: InputPembayaranAsuransi,
      },
    },
    tenor: {
      url: `/cm/tenor/update/${data.id}`,
      queryData: {
        tenor: InputTenor,
      },
    },
    angsuran_pertama: {
      url: `/cm/angsuran-pertama/update/${data.id}`,
      queryData: {
        angsuran_pertama: InputAngsuranPertama,
      },
    },
    penjual: {
      url: `/cm/penjual/update/${data.id}`,
      queryData: {
        nama: InputNama,
        no_telepon: InputNoTelepon,
        alamat: InputAlamat,
        provinsi: InputProvinsi,
        kota: InputKota,
        kecamatan: InputKecamatan,
      },
    },
  };

  const handleEditUser = async (type) => {
    console.log("TYPE", type);
    await axiosBackend
      .post(queryParams[type].url, queryParams[type].queryData)
      .then((res) => {
        console.log(res, "CMEDIT");
        setMenuAnchorEl(null);
        sendToast()
        // reload()
      })
      .catch((err) => {
        console.log(err);
        setMenuAnchorEl(null);
      });
      
      dataSent();
    };
    
    const loadPIC = async () => {
      await axiosBackend
        .get('/dropdown-pic')
        .then((res) => {
          console.log(res, "PICARRAY");
          setPICArray(res.data.pic)
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
