import styles from "../../styles/MyProfile.module.css";
import { useRouter } from "next/router";
//components
import BreadCustom from "../../components/BreadCustom";
const index = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <BreadCustom titles={["My Profile"]} btn={false} />
        </div>
    )
}

export default index;