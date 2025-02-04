import React from 'react';


const About = () => {


    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-white to-green-600 opacity-20 animate-gradient-x"/>

            {/* Content */}
            <div className="relative z-10 py-24 px-4 max-w-screen-md mx-auto">
                <span className="text-indigo-600 font-semibold block mb-2">
                    Front-end Developer
                </span>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Dmytro Kolomiiets
                </h1>

                <div className="space-y-6 text-gray-700 mb-8">
                    <p>
                        I transform ideas into digital reality through modern web apps built with
                        <span className="text-indigo-600 font-medium"> React</span>,
                        <span className="text-indigo-600 font-medium"> TypeScript</span>, and
                        <span className="text-indigo-600 font-medium"> Redux</span>.
                    </p>

                    <p>
                        With over three years of experience, I focus on clean architecture,
                        responsive design, and performance optimization. I thrive on challenges
                        like API integration and performance tuning to create apps that
                        both solve problems and delight users.
                    </p>

                    <p>
                        Continuously learning and adapting to new trends, I collaborate with teams
                        to build impactful products. When not coding, I contribute to open-source,
                        write tech articles, and find inspiration in music and travel.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">My Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Redux', 'Node.js', 'Webpack', 'Jest'].map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600">
                    "Code isn't just instructions for a computer. It's the language I use
                    to speak with the future."
                </blockquote>

                <div className="mt-8">
                    <button
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Let's Connect! ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;