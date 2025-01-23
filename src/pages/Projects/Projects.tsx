import React, { useEffect, useState } from 'react';
import { useProjects } from "../../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import { IProject } from "../../types/Project/Project";

const Projects = () => {
    const { projects, loading, error } = useProjects();
    const [reversedProjects, setReversedProjects] = useState<IProject[]>([]);

    useEffect(() => {
        if (projects && projects.length > 0) {
            setReversedProjects([...projects].reverse());
        }
    }, [projects]);

    if (loading) {
        return <div className={"min-h-screen py-24 px-4"}>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`bg-white ${projects.length <= 4 && "min-h-screen"}`}>
            <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Projects</h2>
                <div className={"flex gap-2 flex-wrap"}>
                    {reversedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
