import {
  FaPencil,
  FaEraser,
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaDownload,
} from "react-icons/fa6";
import styles from "./index.module.css";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick } from "@/slices-redux/menuSlice";
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
      <div className={styles.iconWrapper}>
        <FaArrowRotateLeft className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FaArrowRotateRight className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FaDownload className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
