import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { useSelector } from "react-redux";
const ToolBox = () => {
  const activemenu=useSelector(state=>state.menu.activemenu);
  const showcolors=activemenu!==MENU_ITEMS.ERASER;
  return (
    <div className={styles.toolboxContainer}>
      {showcolors && <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          {
            COLORS.map(color=>(
                <div className={styles.colorBox}  style={{backgroundColor:color}}/>
            ))
          }
        </div>
      </div>}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush Size</h4>
        <div className={styles.itemContainer}>
          <input type="range" min={1} max={10} step={1} />
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
