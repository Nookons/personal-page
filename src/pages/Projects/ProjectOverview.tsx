import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useLocation } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';

const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const ProjectOverview = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    // Use the hook unconditionally
    const { project, loading, error } = useProject(id ? id : "");

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handle case where no project is found
    if (!project) {
        return <div>No project found</div>;
    }

    return (
        <div className="bg-white py-16">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm">
                            <a href={project.href} aria-current="page"
                               className="font-medium text-gray-500 hover:text-gray-600">
                                {project.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <img
                        alt={project.image_1}
                        src={project.image_1}
                        className="hidden size-full rounded-lg object-cover lg:block"
                    />
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <img
                            alt={project.image_2}
                            src={project.image_2}
                            className="aspect-[3/2] w-full rounded-lg object-cover"
                        />
                        <img
                            alt={project.image_3}
                            src={project.image_3}
                            className="aspect-[3/2] w-full rounded-lg object-cover"
                        />
                    </div>
                    <img
                        alt={project.image_4}
                        src={project.image_4}
                        className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto"
                    />
                </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

                    {/* Options */}
                    <div className="lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{project.short_name}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            aria-hidden="true"
                                            className={classNames(
                                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                'size-5 shrink-0',
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href}
                                   className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Watch preview
                            </button>
                        </form>
                    </div>

                    <div
                        className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{project.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {project.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{project.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
