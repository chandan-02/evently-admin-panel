import styles from "../../styles/Crypto.module.css";
import { useRouter } from "next/router";
//components
import BreadCustom from "../../components/BreadCustom";
const index = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <BreadCustom titles={["Crypto Donations"]} btn={false} />
        </div>
    )
}

export default index;