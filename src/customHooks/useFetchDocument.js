import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const useFetchDocument = (collectionName, documentID) => {
    const [document, setDocument] = useState(null)

    //Search get document trong firebase
    //Thêm async cho lỗi docSnap.exists is not a function
    const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document docRef:", docRef);
            console.log("Document data:", docSnap.data());
            const obj = {
                id: documentID,
                ...docSnap.data()
            }
            setDocument(obj);
        } else {
            toast.error("Document not found")
        }
    }

    useEffect(() => {
        getDocument();
    }, [])

    return { document }
}

export default useFetchDocument