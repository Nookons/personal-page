import React from 'react';
import PostList from "./PostList";
import {useTheme} from "../../hooks/Theme/useThemeType";

const Blog = () => {
    const { theme, toggleTheme } = useTheme();  // Получаем тему и функцию для её переключения

    return (
        <div className={`min-h-screen py-24 sm:py-32 ${theme.bg_color} ${theme.text_color}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto rounded max-w-2xl lg:mx-0">
                    <h2 className="text-pretty text-xl font-semibold tracking-tight sm:text-5xl">My experience</h2>
                    <p className="mt-2 text-lg/8 text-sm ">I'd love to share with you the challenges I've faced and
                        some of the strategies that have helped me overcome them.</p>
                </div>

                <PostList />
            </div>
        </div>
    );
};

export default Blog;
