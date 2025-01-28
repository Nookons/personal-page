import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useProject} from '../../hooks/useProject';
import {Skeleton} from "antd";
import {RocketOutlined} from "@ant-design/icons";
import MyHighlightElement from "../Blog/HighlightElement";

const ProjectOverview = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const {project, loading, error} = useProject(id ? id : "");

    const [isShowButton, setIsShowButton] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (loading) {
        return <div className={"min-h-screen py-24 px-4"}><Skeleton/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!project) {
        return <div>No project found</div>;
    }

    const onViewHandle = () => {
        if (project?.href) {
            const link = project.href.startsWith('http') ? project.href : `https://${project.href}`;
            window.open(link, "_blank");
        } else {
            alert("Link not available");
        }
    }



    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">



            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-2 -z-10 transform-gpu overflow-hidden blur-3xl s sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#CCFF00] sm:from-[#fff8ae] sm:to-[#aeddff] to-[#33FFFF] opacity-100 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div
                className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-4">
                <div
                    className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base/7 font-semibold text-indigo-600">{project.short_name}</p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {project.name}
                            </h1>
                            <p className="mt-6 text-xl/8 text-gray-700">
                                {/*Here some text can be add*/}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        alt=""
                        src={project.image_1}
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
                    />
                    <button
                        onClick={onViewHandle}
                        className="rounded-md w-[48rem] max-w-none mt-4 text-left  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <RocketOutlined className={"mr-2"}/> Open project
                    </button>
                </div>

                <div
                    className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                            <p>
                                {project.description}
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                {project.highlights.map(highlight =>{
                                    return (
                                        <MyHighlightElement highlight={highlight} />
                                    )
                                })}
                            </ul>
                            <p className="mt-8">
                                {/*Here some text can be add*/}
                            </p>
                            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                                Project details
                            </h2>
                            <p className="mt-6">
                                {project.details}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
