import React, { useState } from 'react';
import dayjs from "dayjs";
import { IPost } from "../../types/Post/Post";
import { Button } from "antd";
import { DislikeOutlined, EyeInvisibleOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {BLOG_OVERVIEW} from "../../utils/const";

const Post = ({ post }: { post: IPost }) => {
    const navigate = useNavigate();
    const [isFullView, setIsFullView] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const likes_count = 1231; // Получаем количество лайков из данных

    const toggleFullView = () => setIsFullView(prevState => !prevState);
    const toggleLike = () => setIsLiked(prevState => !prevState);

    const onPostHandle = () => {
        navigate(`${BLOG_OVERVIEW}?postId=${post.id}`);
    }

    return (
        <article key={post.id} className="flex flex-col p-2 bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="flex w-full flex-col gap-4 text-xs">
                <time dateTime={dayjs(post.timeStamp).format("YYYY-MM-DD")} className="text-gray-500">
                    {post.date}
                </time>
            </div>
            <div className="group relative min-w-full">
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                    <a onClick={onPostHandle}>
                        <span className="absolute inset-0" />
                        {post.title}
                    </a>
                </h3>
                <p className={`mt-5 ${isFullView ? "line-clamp-none" : "line-clamp-3"} text-sm text-gray-600`}>
                    {post.description}
                </p>
                <div className="w-full gap-1 py-1 rounded mt-2 flex justify-end">
                    <Button
                        type="text"
                        className="mx-1"
                        onClick={toggleLike}
                        shape="round"
                    >
                        <p>{post.likes.toLocaleString()}</p>
                        {isLiked ? <DislikeOutlined /> : <LikeOutlined />}
                    </Button>
                    {post.description.length > 450 &&
                        <Button
                            type="text"
                            className="mx-1"
                            onClick={toggleFullView}
                            shape="circle"
                        >
                            {isFullView ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </Button>
                    }
                </div>
            </div>
        </article>
    );
};

export default Post;
