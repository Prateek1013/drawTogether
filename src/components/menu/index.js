import {
  FaPencil,
  FaEraser,
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaDownload,
} from "react-icons/fa6";
import styles from "./index.module.css";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick,actionItemClick } from "@/slices-redux/menuSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Menu = () => {
  const dispatch = useDispatch();
  const handleclick = (item) => {
    dispatch(menuItemClick(item));
  };
  const [col, setcol] = useState({
    [MENU_ITEMS]: "#000000",
  });
  const handleActionClick=(item)=>{
    dispatch(actionItemClick(item))
  }
  return (
    <div className={styles.menuContainer}>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: col.PENCIL }}
        onClick={() => {
          handleclick(MENU_ITEMS.PENCIL);
          setcol((prevCol) => ({
            ...Object.fromEntries(
              Object.keys(prevCol).map((key) => [key, null])
            ),
            [MENU_ITEMS.PENCIL]: "#e3e2fe",
          }));
        }}
      >
        <FaPencil className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: col.ERASER }}
        onClick={() => {
          handleclick(MENU_ITEMS.ERASER);
          setcol((prevCol) => ({
            ...Object.fromEntries(
              Object.keys(prevCol).map((key) => [key, null])
            ),
            [MENU_ITEMS.ERASER]: "#e3e2fe",
          }));
        }}
      >
        <FaEraser className={styles.icon} />
      </div>
      <div className={styles.iconWrapper} onClick={()=>{handleActionClick(MENU_ITEMS.UNDO)}}>
        <FaArrowRotateLeft className={styles.icon} />
      </div>
      <div className={styles.iconWrapper} onClick={()=>{handleActionClick(MENU_ITEMS.REDO)}}>
        <FaArrowRotateRight className={styles.icon} />
      </div>
      <div className={styles.iconWrapper} onClick={()=> {handleActionClick(MENU_ITEMS.DOWNLOAD)}}>
        <FaDownload className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
