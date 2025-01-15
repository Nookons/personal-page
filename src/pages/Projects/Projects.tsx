import React from 'react';
import {useNavigate} from "react-router-dom";
import {PROJECTS_OVERVIEW} from "../../utils/const";

const products = [
    {
        id: 1,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 5,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 6,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 7,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 8,
        name: '🕚 3 days',
        href: '#',
        price: 'Test project',
        imageSrc: 'https://thumbs.dreamstime.com/b/web-324830775.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
]

const Projects = () => {
    const navigate = useNavigate();
    const projectClickHandle = (id: number) => {
        navigate(`${PROJECTS_OVERVIEW}?id=${id}`);
    }

    return (
        <div className={`bg-white ${products.length <= 4 && "h-screen"}`}>
            <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} onClick={() => projectClickHandle(product.id)} className="group cursor-pointer">
                            <img
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;