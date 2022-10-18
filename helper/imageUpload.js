import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';

const UploadImage = async (image, path) => {
    const storageRef = ref(storage, path);
    const res = await uploadBytes(storageRef, image).then(response => {
        return response;
    }).catch(err => {
        return err;
    })
    const link = await getDownloadURL(res.ref).then((downloadURL) => {
        return downloadURL;
    });
    return link;
}

export default UploadImage;