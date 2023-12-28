import { configureStore } from "@reduxjs/toolkit";
import MenuReducers from './slices-redux/menuSlice'
export const store = configureStore({
    reducer: {
        menu: MenuReducers
    }
  })

