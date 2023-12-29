import { configureStore } from "@reduxjs/toolkit";
import MenuReducers from "./slices-redux/menuSlice";
import ToolBooxReducers from "./slices-redux/toolboxSlice";
export const store = configureStore({
  reducer: {
    menu: MenuReducers,
    toolbox:ToolBooxReducers
  },
});
