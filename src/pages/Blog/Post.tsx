import React, {useState} from 'react';
import dayjs from "dayjs";
import {IPost} from "../../types/Post/Post";
import {Button} from "antd";
import {DislikeOutlined, EyeInvisibleOutlined, EyeOutlined, LikeOutlined} from '@ant-design/icons';

const Post = ({post}: {post: IPost}) => {
    const [isFullView, setIsFullView] = useState<boolean>(false);

    let likes_count = 1034

    return (
        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex flex-col gap-4 text-xs">
                <time dateTime={dayjs(post.timeStamp).format("YYYY-MM-DD")}
                      className="text-gray-500">
                    {post.date}
                    <Button type={"text"} className={"mx-1"} onClick={() => setIsFullView(!isFullView)} shape={"circle"}>{isFullView ? <EyeInvisibleOutlined /> : <EyeOutlined />}</Button>
                    <Button type={"text"} className={"mx-1"} onClick={() => setIsFullView(!isFullView)} shape={"round"}>
                        {isFullView ? <DislikeOutlined/> : <LikeOutlined/>} <p>{likes_count.toLocaleString()}</p>
                    </Button>
                </time>
                {post.category.length > 0 &&
                    <div className={"flex flex-wrap gap-2"}>
                        {post.category.map((item) => (
                            <a
                                href={post.href}
                                className="relative text-nowrap z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                }
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                        <span className="absolute inset-0"/>
                        {post.title}
                    </a>
                </h3>
                <p className={`mt-5 line-clamp-${isFullView ? "none" : "3"} line-cl text-sm/6 text-gray-600`}>{post.description}</p>
            </div>
        </article>
    );
};

export default Post;