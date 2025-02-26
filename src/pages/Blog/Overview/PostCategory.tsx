import React from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Skeleton} from "antd";
import useTheme from "../../../hooks/Theme/useThemeType";

const PostCategory = () => {
    const {post, loading, error} = useAppSelector(state => state.post)

    const { theme } = useTheme();  // Получаем тему и функцию для её переключения

    if (loading) {
        return <Skeleton.Input active className={`w-full mt-2`}/>
    }

    if (!post) {
        return <Skeleton.Input active className={`w-full mt-2`}/>
    }

    return (
        <div className={`flex flex-wrap gap-2 mb-8`}>
            {post.category.map((item) => (
                <div className={`${theme.second_text_color} text-md rounded cursor-pointer hover:text-indigo-600 transition`}>⚡ {item}</div>
            ))}
        </div>
    );
};

export default PostCategory;