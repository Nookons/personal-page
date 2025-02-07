import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import dayjs from "dayjs";
import {IUser} from "../../types/User";

interface IReviewLocal {
    body: string;
}

export const addCommentAction = async (name: string, review: IReviewLocal, id: string, user: IUser) => {
    try {
        const review_id = dayjs().valueOf().toString();
        const docRef = doc(db, name, id)

        const comment_body = {
            ...review,
            id: review_id,
            user_email: user.email,
            user: user.uid,
            date: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
            timeStamp: dayjs().valueOf(),
        }

        await updateDoc(docRef, {
            comments: arrayUnion(comment_body)
        });
        return comment_body;

    } catch (error) {
        return error;
    }
}