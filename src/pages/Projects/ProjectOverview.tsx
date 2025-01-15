import React from 'react';

import { StarIcon } from '@heroicons/react/20/solid'

const product = {
    name: 'GEEK Plus warehouse system',
    price: '🕚 In progress',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Nookon', href: '#' },
        { id: 2, name: 'Projects', href: '#' },
    ],
    images: [
        {
            src: 'https://images.unsplash.com/photo-1736847280194-a114a4108fc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://images.unsplash.com/photo-1735299362091-33c94b71a758?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://plus.unsplash.com/premium_photo-1734713075209-f589491adfe1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://plus.unsplash.com/premium_photo-1733514433474-e91aeaed25fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    description:
        'We\'re so excited to tell you about this awesome project! It\'s a dashboard system that\'ll help you keep track of all the items in the warehouse with ease. And that\'s not all — it also includes an error parser for text from WeChat and a graph for each need.',
    highlights: [
        'React',
        'TypeScript',
        'Redux',
        'FireBase',
    ],
    details:
        'This project was created on React with TypeScript template and also have in youre self FireBase, ANTD UI, React Router, DayJs, js-cookie, jspdf, Redux. ',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const ProjectOverview = () => {

    return (
        <div className="bg-white py-24">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page"
                               className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <img
                        alt={product.images[0].alt}
                        src={product.images[0].src}
                        className="hidden size-full rounded-lg object-cover lg:block"
                    />
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <img
                            alt={product.images[1].alt}
                            src={product.images[1].src}
                            className="aspect-[3/2] w-full rounded-lg object-cover"
                        />
                        <img
                            alt={product.images[2].alt}
                            src={product.images[2].src}
                            className="aspect-[3/2] w-full rounded-lg object-cover"
                        />
                    </div>
                    <img
                        alt={product.images[3].alt}
                        src={product.images[3].src}
                        className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto"
                    />
                </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

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
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {product.highlights.map((highlight) => (
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
                                <p className="text-sm text-gray-600">{product.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;