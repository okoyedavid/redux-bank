import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  loading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, { payload }) {
      state.balance += payload;
      state.loading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan(state, { payload }) {
      if (state.loan > 0) return;
      state.loan = payload.amount;
      state.loanPurpose = payload.purpose;
      state.balance += payload.amount;
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.loading = true;
    },
  },
});

export function deposit(amt, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amt };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amt}from=${currency}&to=USD`
    );
    const data = await res.json();

    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}

// function accountReducer(state = initialStateAccount, { type, payload }) {
//   switch (type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + payload, loading: false };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: payload.amount,
//         loanPurpose: payload.purpose,
//         balance: state.balance + payload.amount,
//       };
//     case "account/payloan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, loading: true };
//     default:
//       return state;
//   }
// }

// function deposit(amt, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amt };

//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amt}from=${currency}&to=USD`
//     );
//     const data = await res.json();

//     dispatch({ type: "account/deposit", payload: data.rates.USD });
//   };
// }
// function withdraw(amt) {
//   return { type: "account/withdraw", payload: amt };
// }
// function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }
// function payLoan() {
//   return { type: "account/payloan" };
// }

export default accountSlice.reducer;
export const { payLoan, withdraw, requestLoan } = accountSlice.actions;
