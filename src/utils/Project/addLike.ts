import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {IUser} from "../../types/User";
import {IProject} from "../../types/Project/Project";

export const addProjectLikeAction = async ({user, id, project}: {user: IUser, id: string, project: IProject}) => {
    try {
        const projectRef = doc(db, "projects", id)

        await updateDoc(projectRef, {
            likes_users: arrayUnion(user.uid),
            likes: project.likes + 1
        });

        return true
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const removeProjectLikeAction = async ({user, id, project}: {user: IUser, id: string, project: IProject}) => {
    try {
        const projectRef = doc(db, "projects", id)

        await updateDoc(projectRef, {
            likes_users: arrayRemove(user.uid),
            likes: project.likes - 1
        });

        return true
    } catch (error) {
        console.log(error);
        return error;
    }
}