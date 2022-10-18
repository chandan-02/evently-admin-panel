import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

const DeleteImage = async (path) => {
    const storageRef = ref(storage, path);
    const res = deleteObject(storageRef).then(() => {
        // File deleted successfully
        return "success"
    }).catch((error) => {
        // Uh-oh, an error occurred!
        return "error"
    });
    return res;
}

export default DeleteImage;