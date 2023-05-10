import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';
import { toast } from 'react-toastify';

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true);

        try {
            setIsLoading(false);
            //Example data (search get data)
            const docRef = collection(db, collectionName);
            //Tab order and limit data
            const q = query(docRef, orderBy("createdAt", "desc"), limit(25));

            //Listen to multiple documents in a collection (get real time update)
            onSnapshot(q, (snapshot) => {
                // console.log(snapshot)
                const allData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(allData);
                //fetch products
                setData(allData);
                setIsLoading(false);
                
            });

        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getCollection();
    }, []);

    return {data, isLoading};

}

export default useFetchCollection