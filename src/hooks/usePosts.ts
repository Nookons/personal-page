import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {IPost} from "../types/Post/Post";

export const usePosts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, "posts"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const projects: IPost[] = [];
                querySnapshot.forEach((doc) => {
                    projects.push(doc.data() as IPost);
                });
                setPosts(projects);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return { posts, loading, error };
};
