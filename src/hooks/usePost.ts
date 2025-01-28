import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {IPost} from "../types/Post/Post";

export const usePosts = (id: string) => {
    const [post, setPost] = useState<IPost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const docRef = doc(db, "posts", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost(docSnap.data() as IPost);
                } else {
                    setError("Project not found");
                }
            } catch (err) {
                setError("Failed to fetch project");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    return { post, loading, error };
};
