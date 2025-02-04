import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import dayjs from "dayjs";
import {IDataProject} from "../../types/Project/ProjectForm";

export const addProjectAction = async (post_data: IDataProject) => {
    try {
        const project_id = dayjs().valueOf().toString();

        await setDoc(doc(db, "projects", project_id), {
            ...post_data,
            id: project_id,
            likes_count: 0,
            likes_users: [],
            comments: [],
            date: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm:ss"),
            timeStamp: dayjs().valueOf(),
        });

        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}