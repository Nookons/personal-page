import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import { usePosts } from "../../hooks/usePosts";
import { Alert, Empty, Skeleton } from "antd";
import { IPost } from "../../types/Post/Post";
import Post from "./Post";
import useTheme from "../../hooks/Theme/useThemeType";

const PostList = () => {
    const { posts, loading, error } = usePosts();
    const [reversed, setReversed] = useState<IPost[]>([]);

    useEffect(() => {
        if (posts) {
            setReversed([...posts].reverse()); // Переворачиваем массив posts
        }
    }, [posts]);

    if (loading) {
        return <Skeleton className={"py-12"} />;
    }

    if (error) {
        return (
            <Alert
                className={"my-12 "}
                showIcon
                message="In process loading post something went wrong, sorry for that issue"
                type="error"
            />
        );
    }

    if (posts.length === 0) {
        return (
            <div className={"mt-14"}>
                <Empty />
            </div>
        );
    }

    return (
        <div
            className={`mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2`}
        >
            {reversed.map((post) => (
                <div
                    key={post.id}
                    style={{ gridRow: 'auto' }} // Устанавливаем автоматическое изменение строки для каждого поста
                >
                    <Post post={post} />
                </div>
            ))}
        </div>
    );
};

export default PostList;
