import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,

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