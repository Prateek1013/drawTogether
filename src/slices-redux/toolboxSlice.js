import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS,COLORS } from "@/constants";
const initialState={
    [MENU_ITEMS.PENCIL]:{
        color:COLORS.BLACK,
        size:3
    },
    [MENU_ITEMS.ERASER]:{
        color:"white",
        size:3
    },
    [MENU_ITEMS.REDO]:{},
    [MENU_ITEMS.UNDO]:{},
    [MENU_ITEMS.DOWNLOAD]:{},
}
const ToolBoxSlice=createSlice({
    name:'toolbox',
    initialState,
    reducers:{
        changeColor: (state,action)=>{
            state[action.payload.item].color=action.payload.color;
        },
        chnageBrushSize:(state,action)=>{
            state[action.payload.item].size=action.payload.size;
        }
    }
})

export const {changeColor,chnageBrushSize} =ToolBoxSlice.actions;

export default ToolBoxSlice.reducer;