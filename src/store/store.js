import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accouts/accountSlice";
import customerReducer from "../features/customers/customersSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
