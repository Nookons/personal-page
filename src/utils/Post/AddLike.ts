import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {IUser} from "../../types/User";
import {IPost} from "../../types/Post/Post";

export const addPostLikeAction = async ({user, id, post}: {user: IUser, id: string, post: IPost}) => {
    try {
        const postRef = doc(db, "posts", id)

        await updateDoc(postRef, {
            likes_users: arrayUnion(user.uid),
            likes: post.likes + 1
        });

        return true
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const removePostLikeAction = async ({user, id, post}: {user: IUser, id: string, post: IPost}) => {
    try {
        const postRef = doc(db, "posts", id)

        await updateDoc(postRef, {
            likes_users: arrayRemove(user.uid),
            likes: post.likes - 1
        });

        return true
    } catch (error) {
        console.log(error);
        return error;
    }
}