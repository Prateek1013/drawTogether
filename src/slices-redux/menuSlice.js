import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "@/constants";

const initialState = {
  activemenu: MENU_ITEMS.PENCIL,
  actionmenu: null,
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    menuItemClick: (state, action) => {
      state.activemenu = action.payload;
    },
    actionItemClick: (state, action) => {
      state.actionmenu = action.payload;
    }
  }
});

export const { menuItemClick, actionItemClick } = menuSlice.actions;
export default menuSlice.reducer;
