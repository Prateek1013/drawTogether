import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { useSelector,useDispatch } from "react-redux";
import { changeColor,chnageBrushSize } from "@/slices-redux/toolboxSlice";
const ToolBox = () => {
  const activemenu=useSelector(state=>state.menu.activemenu);
  const size_val=useSelector(state=>state.toolbox[activemenu].size);

  const showcolors=activemenu!==MENU_ITEMS.ERASER;
  const dispatch=useDispatch();
  return (
    <div className={styles.toolboxContainer}>
      {showcolors && <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          {
            COLORS.map(color=>(
                <div className={styles.colorBox}  style={{backgroundColor:color}} onClick={(e)=>{
                  dispatch(changeColor({
                    item:activemenu,
                    color
                  }))
                }}/>
            ))
          }
        </div>
      </div>}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush Size</h4>
        <div className={styles.itemContainer}>
          <input type="range" min={1} max={10} step={1} value={size_val} onChange={(e)=>{ dispatch(chnageBrushSize({
            item:activemenu,
            size:e.target.value
          })) }}/>
          {size_val}
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
