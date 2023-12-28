import { FaPencil,FaEraser, FaArrowRotateLeft, FaArrowRotateRight,FaDownload } from "react-icons/fa6";
import styles from "./index.module.css"
const Menu = () => {
    return ( 
        <div className={styles.menuContainer}>
            <div className={styles.iconWrapper}>
            <FaPencil className={styles.icon}/>
            </div >
            <div className={styles.iconWrapper}>
            <FaEraser className={styles.icon}/>
            </div>
            <div className={styles.iconWrapper}>
            <FaArrowRotateLeft className={styles.icon}/>
            </div>
            <div className={styles.iconWrapper}>
            <FaArrowRotateRight className={styles.icon}/>
            </div>
            <div className={styles.iconWrapper}>
            <FaDownload className={styles.icon}/>
            </div>
            
        </div>
     );
}
 
export default Menu;