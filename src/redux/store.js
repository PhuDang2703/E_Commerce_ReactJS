import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice"
import filterReducer from "./slice/filterSlice"
import cartReducer from "./slice/cartSlice"
import checkoutReducer from './slice/checkoutSlice'
import ordersReducer from './slice/orderSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,

})

const store = configureStore({
  reducer: rootReducer,
  //api->getDefault middleware->Customizing the Included Middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //   thunk: {
      //     extraArgument: myCustomApiService,
      //   },
      serializableCheck: false,
    }),
})

export default store;