import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import dayjs from "dayjs";
import {IPostForm} from "../../types/Post/PostForm";

export const addPostAction = async (post_data: IPostForm) => {
    try {
        const post_id = dayjs().valueOf().toString();

        await setDoc(doc(db, "posts", post_id), {
            ...post_data,
            id: post_id,
            comments: [],
            likes: 0,
            likes_users: [],
            date: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm:ss"),
            timeStamp: dayjs().valueOf(),
        });

        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}