import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare: (fullName, nationalId) => {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, { payload }) {
        state.fullName = payload.fullName;
        state.nationalID = payload.nationalId;
        state.createdAt = payload.createdAt;
      },
    },

    updateName(state, { payload }) {
      state.fullName = payload;
    },
  },
});

// function customerReducer(state = initialStateCustomers, { type, payload }) {
//   switch (type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         ...payload,
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: payload,
//       };
//     default:
//       return state;
//   }
// }

// function createCustomer(fullName, nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() },
//   };
// }

// function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }

export default customer.reducer;
export const { createCustomer, updateName } = customer.actions;
