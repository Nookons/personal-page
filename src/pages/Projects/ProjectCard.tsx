import React from 'react';
import { PROJECTS_OVERVIEW } from "../../utils/const";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../types/Project/Project";

const ProjectCard = ({ project }: { project: IProject }) => {
    const navigate = useNavigate();

    const projectClickHandle = (id: string) => {
        navigate(`${PROJECTS_OVERVIEW}?id=${id}`);
    }

    return (
        <div
            key={project.id}
            onClick={() => projectClickHandle(project.id)}
            className="group max-w-sm xs:max-w-full cursor-pointer rounded-md overflow-hidden shadow-md hover:shadow-lg"
        >
            <img
                src={project.image_4}
                alt={project.name}
                className="aspect-square max-w-full bg-gray-200 object-cover xl:aspect-[7/8]"
            />
            <div className="p-4">
                <h3 className="text-sm text-gray-700">{project.date}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{project.name}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
