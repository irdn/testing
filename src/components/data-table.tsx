"use client";

import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Stack,
} from "@mui/material";
import {
  ControlPoint,
  FilterAltOutlined,
  SearchOutlined,
  DateRangeOutlined,
  CheckBox,
  DisabledByDefault,
  BorderColor,
  Delete,
} from "@mui/icons-material";
import { Box, Button, Typography, TableContainer, Paper } from "@mui/material";
import { grey, green, red } from "@mui/material/colors";
import NewAccountForm from "./new-account";
import { useDispatch, useSelector } from "react-redux";
import { mainModifier, BankAccount, bankDelete } from "@/redux/main-slice";
import { RootState } from "@/redux/store";

export default function DataTable() {
  const dispatch = useDispatch();
  const { values } = useSelector(
    (state: RootState) => state.main.addAccountForm
  );
  const { banks } = useSelector((state: RootState) => state.main.mainPage);

  const handleClickOpen = useCallback(() => {
    dispatch(mainModifier({ key: "showAddAccountForm", value: true }));
  }, [dispatch]);

  const deleteBankHandler = useCallback(
    (key: number, e: React.MouseEvent<HTMLElement>) => {
      dispatch(bankDelete({ key }));
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6">حساب بانکی</Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ControlPoint sx={{ marginLeft: 1 }} />}
            onClick={handleClickOpen}
          >
            افزودن
          </Button>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ color: grey[500] }}>
                ردیف
              </TableCell>
              <TableCell align="left">کد</TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="left">نام بانک</TableCell>
              <TableCell align="left">نام شعبه</TableCell>
              <TableCell align="left">شماره شعبه</TableCell>
              <TableCell align="left">شماره حساب</TableCell>
              <TableCell align="left">نوع حساب</TableCell>
              <TableCell align="left">نام دارند حساب</TableCell>
              <TableCell align="left">موجودی</TableCell>
              <TableCell align="left">ارز</TableCell>
              <TableCell align="left">تاریخ افتتاح</TableCell>
              <TableCell align="left">فعال</TableCell>
              <TableCell align="left" sx={{ color: grey[500] }}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow sx={{ backgroundColor: grey[100] }}>
              <TableCell align="left"></TableCell>
              <TableCell align="left">
                <SearchOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <SearchOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <SearchOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <SearchOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <SearchOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <FilterAltOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <FilterAltOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <FilterAltOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <SearchOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <FilterAltOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <DateRangeOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left">
                <FilterAltOutlined sx={{ color: grey[500] }} />
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          {banks.length > 0 ? (
            <TableBody>
              {banks.map((row: BankAccount, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {++index}
                  </TableCell>
                  <TableCell align="left">{row.key}</TableCell>
                  <TableCell align="left">---</TableCell>
                  <TableCell align="left">
                    {values.banks.find(
                      (bank: { name: string; value: string }) =>
                        bank.value === row.banksInput
                    )?.name ?? "---"}
                  </TableCell>
                  <TableCell align="left">
                    {values.branches.find(
                      (bank: { name: string; value: string }) =>
                        bank.value === row.branchInput
                    )?.name ?? "---"}
                  </TableCell>
                  <TableCell align="left">---</TableCell>
                  <TableCell align="left">{row.accountNumber}</TableCell>
                  <TableCell align="left">
                    {values.types.find(
                      (bank: { name: string; value: string }) =>
                        bank.value === row.accountType
                    )?.name ?? "---"}
                  </TableCell>
                  <TableCell align="left">{row.accountOwner}</TableCell>
                  <TableCell align="left">{row.initAmount}</TableCell>
                  <TableCell align="left">
                    {values.currencies.find(
                      (bank: { name: string; value: string }) =>
                        bank.value === row.currency
                    )?.name ?? "---"}
                  </TableCell>
                  <TableCell align="left">{row.openingDate}</TableCell>
                  <TableCell align="left">
                    {row.status ? (
                      <CheckBox sx={{ color: green[500] }} />
                    ) : (
                      <DisabledByDefault sx={{ color: red[500] }} />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary">
                        <BorderColor />
                      </IconButton>
                      <IconButton
                        onClick={(e) => deleteBankHandler(row.key, e)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>
      <NewAccountForm />
    </React.Fragment>
  );
}
