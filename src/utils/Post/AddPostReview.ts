import {arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import dayjs from "dayjs";
import {IUser} from "../../types/User";
import {IPostReview} from "../../types/Post/Post";
import {addReview} from "../../store/reducers/Post";

export const addPostReviewAction = async ({user, review, id}: {user: IUser, review: IPostReview, id: string}) => {
    try {
        const review_id = dayjs().valueOf().toString();
        const postRef = doc(db, "posts", id)

        const comment_body = {
            ...review,
            id: review_id,
            user_email: user.email,
            user: user.uid,
            date: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
            timeStamp: dayjs().valueOf(),
        }

        await updateDoc(postRef, {
            comments: arrayUnion(comment_body)
        });

        return comment_body
    } catch (error) {
        console.log(error);
        return error;
    }
}