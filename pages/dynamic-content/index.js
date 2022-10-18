
import styles from "../../styles/DynamicContent.module.css";
import { useRouter } from "next/router";
//components
import BreadCustom from "../../components/BreadCustom";
const index = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <BreadCustom titles={["Dynamic Content"]} btn={false} />
        </div>
    )
}

export default index;