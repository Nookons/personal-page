import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";
import dayjs from "dayjs";
import {collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebase";


export const userSignIn = async (email: string, password: string) => {
    const auth = getAuth();

    try {
        await signInWithEmailAndPassword(auth, email, password)

        let userSnap = null;

        const q = query(collection(db, "cities"), where("email", "==", email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                userSnap = doc.data();
            }
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        message.error(errorMessage);
        return false;
    }

    return true;
}
