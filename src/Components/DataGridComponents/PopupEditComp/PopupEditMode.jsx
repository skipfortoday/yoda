import React, { useState } from "react";
import { Popover, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UMEdit from "../../../Pages/Content/UserManagement/UMEdit";
import AvatarNameEmail from "../AvatarNameEmail";

export default function PopupEditModel(props) {
  const { reload, dataSent } = props;
  const { row, fromTable } = props;
  console.warn(fromTable, "FT");
  console.warn(row.name, row.id);

  const [MenuanchorEl, setMenuAnchorEl] = useState(null);
  const isMainMenuOpen = Boolean(MenuanchorEl);

  return (
    <Box sx={{ width: "100%", minHeight: 40 }}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        spacing={2}
        justifyContent="flex-start"
      >
        <Box sx={{ display: "block" }}>
          {/* <Button variant="text" color="red20" size="small" onClick={handleRejectorDeleteUser}>{TEXTS?.redButton||'Ditolak'}</Button>
          <Button variant="outlined" color="primary" size="small" onClick={(e) => setMenuAnchorEl(e.currentTarget)}>{TEXTS?.greenButton||'Disetujui'}</Button> */}
          {fromTable === "name" ? (
            <AvatarNameEmail
              name={row.name}
              email={row.email}
              profile_picture={row.profile_picture}
              clicked={(e) => setMenuAnchorEl(e.currentTarget)}
              style={{ alignItems: "flex-end" }}
            />
          ) : (
            <></>
          )}
          {fromTable === "role" ? (
            <Typography
              fontSize={14}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            >
              {props.value}
            </Typography>
          ) : (
            <></>
          )}
          {fromTable === "location" ? (
            <Typography
              fontSize={14}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            >
              {row.location}
            </Typography>
          ) : (
            <></>
          )}
          {fromTable === "phone_number" ? (
            <Typography
              fontSize={14}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
            >
              {row.phone_number}
            </Typography>
          ) : (
            <></>
          )}
          {fromTable === "user_status" ? (
            <Typography
              fontSize={14}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
              color={
                props.value.toLowerCase() === "active"
                  ? "success.main"
                  : props.value.toLowerCase() === "aktif"
                  ? "success.main"
                  : props.value.toLowerCase() === "not active"
                  ? "tint.yellow"
                  : props.value.toLowerCase() === "tidak aktif"
                  ? "tint.yellow"
                  : props.value.toLowerCase() === "non aktif"
                  ? "tint.yellow"
                  : "text.primary"
              }
            >
              {props.value}
            </Typography>
          ) : (
            <></>
          )}
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
            <UMEdit
              data={row}
              field={fromTable}
              // acceptBtnClick={() => {}}
              setMenuAnchorEl={setMenuAnchorEl}
              reload={reload}
              dataSent={dataSent}
              // fromPage={fromPage}
            />
          </Popover>
        </Box>
      </Stack>
    </Box>
  );
}
