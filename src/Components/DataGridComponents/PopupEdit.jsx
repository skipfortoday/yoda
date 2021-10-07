import React, { useState } from "react";
import { Button, Popover, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UMAcceptMenu from "../../Pages/Content/UserManagement/UMAcceptMenu";
import axiosBackend from "../../Helper/axiosBackend";
import UMEdit from "../../Pages/Content/UserManagement/UMEdit";
import CMEdit from "../../Pages/Content/ContentManagement/CMEdit";
import AvatarNameEmail from "./AvatarNameEmail";
import TextPrimarySecondary from './TextPrimarySecondary'
import DateRegister from './DateRegister'
import SingleLine from './SingleLine'


export default function PopupEdit(props) {
  const { reload, dataSent, row, fromTable, fromPage, params, sendToast } = props;
  console.warn(fromTable, "FT");

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMainMenuOpen = Boolean(MenuanchorEl);

  const ListComponents = {
    name: (
      <AvatarNameEmail
        name={row.name}
        email={row.email}
        profile_picture={row.profile_picture}
        clicked={(e) => setMenuAnchorEl(e.currentTarget)}
        style={{ alignItems: "flex-end" }}
      />
    ),
    role: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {props.value}
      </Typography>
    ),
    location: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.location}
      </Typography>
    ),
    phone_number: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.phone_number}
      </Typography>
    ),
    user_status: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        color={
          props.value === "Active"
            ? "success.main"
            : props.value === "Aktif"
            ? "success.main"
            : props.value === "not Active"
            ? "tint.yellow"
            : props.value === "Tidak Aktif"
            ? "tint.yellow"
            : props.value === "Non Aktif"
            ? "tint.yellow"
            : "text.primary"
        }
      >
        {props.value}
      </Typography>
    ),
    merek: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.merek}
      </Typography>
    ),
    model: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.model}
      </Typography>
    ),
    varian: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.varian}
      </Typography>
    ),
    tahun: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.tahun}
      </Typography>
    ),
    jarak_tempuh: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.jarak_tempuh}
      </Typography>
    ),
    warna: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.warna}
      </Typography>
    ),
    bahan_bakar: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.bahan_bakar}
      </Typography>
    ),
    transmisi: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.transmisi}
      </Typography>
    ),
    kondisi: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.kondisi}
      </Typography>
    ),
    jenis_unit: (
      <Typography
        fontSize={14}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        {row.jenis_unit}
      </Typography>
    ),
    nama_cabang: (
       <TextPrimarySecondary
       primaryText={row.nama_cabang}
       secondaryText={row.kode_cabang}
       clicked={(e) => {setMenuAnchorEl(e.currentTarget); console.log('clicked')}}
     />
    ),
    no_telepon: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.no_telepon}
    </Typography>
    ),
    alamat: (
      <SingleLine clicked={(e) => setMenuAnchorEl(e.currentTarget)} Text={params !== undefined ? params.row.alamat : "-"} Width={params !== undefined ? params.colDef.computedWidth : 0} />
    ),
    pic: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.pic}
    </Typography>
    ),
    // tanggal_registrasi: (
    //   <DateRegister created_at={row.tanggal_registrasi} />
    // ),
    provinsi: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.provinsi}
    </Typography>
    ),
    kota: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.kota}
    </Typography>
    ),
    kecamatan: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.kecamatan}
    </Typography>
    ),
    cabang_pengelola: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.cabang_pengelola}
    </Typography>
    ),
    tujuan_penggunaan: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.tujuan_penggunaan}
    </Typography>
    ),
    kategori: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.kategori}
    </Typography>
    ),
    tipe_asuransi: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.tipe_asuransi}
    </Typography>
    ),
    kesertaan_asuransi: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.kesertaan_asuransi}
    </Typography>
    ),
    nilai_pertanggungan: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.nilai_pertanggungan}
    </Typography>
    ),
    pembayaran_asuransi: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.pembayaran_asuransi}
    </Typography>
    ),
    tenor: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.tenor}
    </Typography>
    ),
    angsuran_pertama: (
      <Typography
      fontSize={14}
      onClick={(e) => setMenuAnchorEl(e.currentTarget)}
    >
      {row.angsuran_pertama}
    </Typography>
    ),
    nama: (
      <TextPrimarySecondary
        primaryText={row.nama}
        secondaryText={row.kode}
        clicked={(e) => setMenuAnchorEl(e.currentTarget)}
      />
    )
  };

  return (
    <Box sx={{ width: "100%", minHeight: 0 }}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        spacing={2}
        justifyContent="flex-start"
      >
        <Box sx={{ display: "block" }}>
          {props && row ? ListComponents[fromTable] : <></>}
          <Popover
            open={isMainMenuOpen}
            onClose={() => setMenuAnchorEl(null)}
            anchorEl={MenuanchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {fromPage === "UM" ? (
              <UMEdit
                data={row}
                field={fromTable}
                // acceptBtnClick={() => {}}
                setMenuAnchorEl={setMenuAnchorEl}
                reload={reload}
                dataSent={dataSent}
                // fromPage={fromPage}
              />
            ) : (
              <CMEdit
                data={row}
                field={fromTable}
                // acceptBtnClick={() => {}}
                setMenuAnchorEl={setMenuAnchorEl}
                reload={reload}
                dataSent={dataSent}
                sendToast={sendToast}
              ></CMEdit>
            )}
          </Popover>
        </Box>
      </Stack>
    </Box>
  );
}
