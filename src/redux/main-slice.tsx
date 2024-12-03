"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  [key: string]: any;
}

export interface BankAccount {
  key: number;
  banksInput: string;
  branchInput: string;
  accountType: string;
  accountNumber: string;
  cartNumber: string;
  accountOwner: string;
  openingDate: string;
  initAmount: string;
  currency: string;
  status: boolean;
  iban: string;
}

const addAccountForm = {
  banksInput: "",
  branchInput: "",
  accountType: "",
  accountNumber: "",
  cartNumber: "",
  accountOwner: "",
  openingDate: "",
  initAmount: "",
  currency: "",
  status: true,
  iban: {
    input0: "",
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  },
  values: {
    banks: [
      {
        name: "ملت",
        value: "mellat",
      },
      {
        name: "پاسارگاد",
        value: "pasargad",
      },
      {
        name: "صادرات",
        value: "saderat",
      },
    ],
    branches: [
      {
        name: "شعبه اول",
        value: "first_branch",
      },
      {
        name: "شعبه دوم",
        value: "second_branch",
      },
    ],
    types: [
      {
        name: "جاری",
        value: "current",
      },
      {
        name: "سپرده",
        value: "deposit",
      },
    ],
    currencies: [
      {
        name: "ریال",
        value: "rial",
      },
      {
        name: "دلار",
        value: "dollar",
      },
    ],
  },
};

const initialState: MainState = {
  showAddAccountForm: false,
  addAccountForm,
  mainPage: {
    banks: [],
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    mainModifier: (
      state,
      action: PayloadAction<{ key: string; value: string | boolean }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    formModifier: (
      state,
      action: PayloadAction<{ name: string; value: string | boolean }>
    ) => {
      state.addAccountForm[action.payload.name] = action.payload.value;
    },
    ibanModifier: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.addAccountForm.iban[action.payload.name] = action.payload.value;
    },
    bankInsert: (state, action: PayloadAction<BankAccount>) => {
      return {
        ...state,
        mainPage: {
          ...state.mainPage,
          banks: [...state.mainPage.banks, action.payload],
        },
      };
    },
    bankDelete: (state, action: PayloadAction<{ key: number }>) => {
      state.mainPage.banks = state.mainPage.banks.filter(
        (bank: BankAccount) => bank.key !== action.payload.key
      );
    },
    formReset: (state) => {
      state.addAccountForm = addAccountForm;
    },
  },
});

export const {
  mainModifier,
  formModifier,
  ibanModifier,
  bankInsert,
  bankDelete,
  formReset,
} = mainSlice.actions;

export default mainSlice.reducer;
