import styles from "./index.module.css";
import { COLORS } from "@/constants";
const ToolBox = () => {
  return (
    <div className={styles.toolboxContainer}>
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          {/* <div className={styles.colorBox} style={{backgroundColor:COLORS.BLACK}}/> */}
          {
            COLORS.map(color=>(
                <div className={styles.colorBox}  style={{backgroundColor:color}}/>
            ))
          }
        </div>
      </div>
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
