import React from 'react';
import { PROJECTS_OVERVIEW } from "../../utils/const";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../types/Project/Project";
import useTheme from "../../hooks/Theme/useThemeType";

const ProjectCard = ({ project }: { project: IProject }) => {
    const navigate = useNavigate();
    const {theme} = useTheme();

    const projectClickHandle = (id: string) => {
        navigate(`${PROJECTS_OVERVIEW}?projectId=${id}`);
    }

    return (
        <div
            key={project.id}
            onClick={() => projectClickHandle(project.id)}
            className={`group ${theme.card_background} max-w-sm xs:max-w-full cursor-pointer rounded-md overflow-hidden shadow-md hover:shadow-lg`}
        >
            <img
                src={project.image_4}
                alt={project.name}
                className="aspect-square max-w-full object-cover xl:aspect-[7/8]"
            />
            <div className="p-4">
                <h3 className={theme.time_mark}>{project.date}</h3>
                <p className={`${theme.text_color} text-md mt-2`}>{project.name}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
