import styles from "../../styles/Blog-Management.module.css";
import { useRouter } from "next/router";
//components
import BreadCustom from "../../components/BreadCustom";
const index = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <BreadCustom titles={["Blog Management"]} btn={false} />
        </div>
    )
}

export default index;