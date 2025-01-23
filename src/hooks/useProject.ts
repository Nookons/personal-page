import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { IProject } from "../types/Project/Project";
import { db } from "../firebase";

export const useProject = (id: string) => {
    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const docRef = doc(db, "projects", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProject(docSnap.data() as IProject);
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
            fetchProject();
        }
    }, [id]);

    return { project, loading, error };
};
