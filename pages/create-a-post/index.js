import styles from "../../styles/Create-Blog.module.css";
import { useRouter } from "next/router";
//components
import BreadCustom from "../../components/BreadCustom";
const index = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
             <BreadCustom titles={["Create A Post"]} btn={false} />
        </div>
    )
}

export default index;