"use client";

import React, { useRef, useMemo, useCallback, ChangeEvent } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
  FormControl,
  Box,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  mainModifier,
  formModifier,
  ibanModifier,
  bankInsert,
  BankAccount,
  formReset,
} from "@/redux/main-slice";
import { RootState } from "@/redux/store";
import SelectElement from "./elements/select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function NewAccountForm() {
  const ibanLengths = useMemo(() => [2, 4, 4, 4, 4, 4, 2], []);
  const ibanRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
    ibanLengths.map(() => React.createRef<HTMLInputElement>())
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BankAccount>();

  const dispatch = useDispatch();
  const { showAddAccountForm, addAccountForm } = useSelector(
    (state: RootState) => state.main
  );

  const onSubmit: SubmitHandler<BankAccount> = useCallback(
    (data) => {
      const key = Math.floor(Math.random() * 1000);
      const dataWithKey = { ...data, key };
      dispatch(bankInsert(dataWithKey));
      dispatch(mainModifier({ key: "showAddAccountForm", value: false }));
      dispatch(formReset());
    },
    [dispatch]
  );

  const handleClose = useCallback(() => {
    dispatch(mainModifier({ key: "showAddAccountForm", value: false }));
  }, [dispatch]);

  const handleSwitchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        formModifier({
          name: e.target.name,
          value: e.target.checked ? true : false,
        })
      );
    },
    [dispatch]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(formModifier({ name: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );

  const handleIBANChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(ibanModifier({ name: e.target.name, value: e.target.value }));
      if (
        e.target.value.length >= ibanLengths[index] &&
        index < ibanLengths.length
      ) {
        if (index < ibanRefs.current.length - 1) {
          ibanRefs.current[index + 1].current?.focus();
        }
        if (
          index === ibanRefs.current.length - 1 &&
          e.target.value.length === ibanLengths[index]
        ) {
          ibanRefs.current[index].current?.blur();
        }
      }
    },
    [dispatch]
  );

  const handleIBANKeyUp = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 8) {
        if (!ibanRefs.current[index].current?.value && index > 0) {
          ibanRefs.current[index - 1].current?.select();
        }
      }
    },
    [dispatch]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedData = e.clipboardData.getData("Text");
      const digits = pastedData.replace(/\D/g, "");
      if (digits.length === 24) {
        const parts = [
          digits.slice(0, 2),
          digits.slice(2, 6),
          digits.slice(6, 10),
          digits.slice(10, 14),
          digits.slice(14, 18),
          digits.slice(18, 22),
          digits.slice(22, 24),
        ];

        parts.map((part, index) =>
          dispatch(ibanModifier({ name: `input${index}`, value: part }))
        );
      }
      e.preventDefault();
    },
    [dispatch]
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={showAddAccountForm}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>افزودن حساب بانکی</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="banksInput"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <SelectElement
                      value={field.value}
                      label="انتخاب بانک"
                      labelId="banksInput"
                      name={field.name}
                      onChange={field.onChange}
                      items={addAccountForm.values.banks}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="branchInput"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <SelectElement
                      value={field.value}
                      label="نام شعبه"
                      labelId="branchName"
                      name={field.name}
                      onChange={field.onChange}
                      items={addAccountForm.values.branches}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="accountType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <SelectElement
                      value={field.value}
                      label="نوع حساب"
                      labelId="accountType"
                      name={field.name}
                      onChange={field.onChange}
                      items={addAccountForm.values.types}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("accountNumber")}
                label="شماره حساب"
                id="accountNumber"
                name="accountNumber"
                defaultValue={addAccountForm.accountNumber}
                size="small"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("cartNumber")}
                label="شماره کارت"
                id="cartNumber"
                name="cartNumber"
                defaultValue={addAccountForm.cartNumber}
                size="small"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("accountOwner")}
                label="نام دارنده حساب"
                id="accountOwner"
                name="accountOwner"
                defaultValue={addAccountForm.accountOwner}
                size="small"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("openingDate")}
                label="تاریخ افتتاح"
                id="openingDate"
                name="openingDate"
                defaultValue={addAccountForm.openingDate}
                size="small"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("initAmount")}
                label="مبلغ اولیه"
                id="initAmount"
                name="initAmount"
                defaultValue={addAccountForm.initAmount}
                size="small"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="currency"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <SelectElement
                      value={field.value}
                      label="ارز"
                      labelId="currency"
                      name={field.name}
                      onChange={field.onChange}
                      items={addAccountForm.values.currencies}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Switch
                        {...register("status")}
                        color="primary"
                        name="status"
                        checked={addAccountForm.status}
                        onChange={handleSwitchChange}
                      />
                    }
                    label={`وضعیت: ${
                      addAccountForm.status ? "فعال" : "غیر فعال"
                    }`}
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} gap={0} sx={{ marginTop: "1rem" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem" }}
              component="label"
            >
              شماره شبا
            </Typography>
          </Grid>
          <Grid
            container
            columnSpacing={{ xs: 0.5 }}
            sx={{
              alignItems: "center",
              direction: "rtl",
            }}
          >
            <Typography variant="h6" sx={{ paddingLeft: ".5rem" }}>
              IR
            </Typography>
            {ibanLengths.map((inputsLength, index) => (
              <Grid
                key={index}
                item
                xs={inputsLength === 2 ? 1.2 : 1.8}
                gap={0}
              >
                <FormControl variant="outlined">
                  <OutlinedInput
                    size="small"
                    name={`input${index}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleIBANChange(index, e)
                    }
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleIBANKeyUp(index, e)
                    }
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
                      handlePaste(e)
                    }
                    inputProps={{
                      style: { textAlign: "center" },
                      maxLength: index === 0 || index === 6 ? 2 : 4,
                    }}
                    value={addAccountForm.iban[`input${index}`]}
                    inputRef={ibanRefs.current[index]}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Box>
            <Button variant="outlined" onClick={handleClose} color="secondary">
              انصراف
            </Button>
          </Box>
          <Box flex={1}>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              افزودن حساب بانکی
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}
