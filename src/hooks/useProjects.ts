import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {IProject} from "../types/Project/Project";

export const useProjects = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, "projects"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const projects: IProject[] = [];
                querySnapshot.forEach((doc) => {
                    projects.push(doc.data() as IProject);
                });
                setProjects(projects);
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

    return { projects, loading, error };
};
