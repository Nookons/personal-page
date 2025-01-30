import React from 'react';
import {LikeOutlined, MessageOutlined} from "@ant-design/icons";
import {Skeleton} from "antd";
import {useAppSelector} from "../../hooks/storeHooks";

const PostStats = () => {
    const post = useAppSelector(state => state.post.post)

    return (
        <div className="w-full border rounded my-2 grid grid-cols-2">
            <div className={"flex gap-2 border-r py-2 px-4 justify-center align-middle"}>
                <div className={"w-full"}>
                    <div className={"flex justify-between"}>
                        <span className={"max-w-xl text-base/7 text-gray-500 lg:max-w-lg"}>Likes</span>
                        <span
                            className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}><LikeOutlined/></span>
                    </div>
                    {!post
                        ? <Skeleton.Button/>
                        :
                        <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>1,324</h6>
                    }
                </div>
            </div>
            <div className={"flex gap-2 py-2 px-4 justify-center align-middle"}>
                <div className={"w-full"}>
                    <div className={"flex justify-between"}>
                        <span className={"max-w-xl text-base/7 text-gray-500 lg:max-w-lg"}>Reviews</span>
                        <span className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}><MessageOutlined/></span>
                    </div>
                    {!post
                        ? <Skeleton.Button/>
                        :
                        <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>
                            {post.comments.length.toLocaleString()}
                        </h6>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostStats;