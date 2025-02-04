import React, {useEffect, useState} from 'react';
import {HeartOutlined, LikeOutlined, LoadingOutlined, MessageOutlined} from "@ant-design/icons";
import {message, Skeleton} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import Button from "antd/es/button";
import {addPostLikeAction, removePostLikeAction} from "../../../utils/Post/AddLike";
import {addLike, removeLike} from "../../../store/reducers/Post";

const PostStats = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user)
    const post = useAppSelector(state => state.post.post)

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (post && user) {
            const isHave = post.likes_users.includes(user.uid)
            setIsLiked(isHave)
        }
    }, [post]);

    const onLikeHandle = async () => {
        try {
            if (post && post.id) {
                if (!user) {
                    throw new Error("You not logged in!");
                }

                if (isLiked) {
                    setIsLoading(true);
                    const id = post.id;
                    const result = await removePostLikeAction({user, id, post})

                    if (result) {
                        dispatch(removeLike(user))
                    }
                    return
                }

                setIsLoading(true);
                const id = post.id;
                const result = await addPostLikeAction({user, id, post})

                if (result) {
                    dispatch(addLike(user))
                }
            }
        } catch (err) {
            err && message.error(err.toString());
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full flex justify-start gap-4">
            <div className={"flex gap-2 justify-center align-middle"}>
                <div className={"w-full"}>
                    <Button disabled={isLoading}
                            style={{background: `${isLiked ? "linear-gradient(270deg, rgba(255,255,255,1) 75%, rgba(255,130,130,1) 100%)" : ""}`}}
                            onClick={onLikeHandle} className={`flex border-none justify-start gap-2`}>
                        <span className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}>
                            {isLoading
                                ? <LoadingOutlined/>
                                : <>{!isLiked ? <LikeOutlined/> :
                                    <HeartOutlined className={"text-red-600 p-1 rounded"}/>}</>
                            }
                        </span>
                        <span className={"max-w-xl text-base/7 text-gray-500 lg:max-w-lg"}>
                            {!post
                                ? <Skeleton.Button/>
                                :
                                <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>{post.likes.toLocaleString()}</h6>
                            }
                        </span>
                    </Button>
                </div>
            </div>
            <div className={"flex gap-2 justify-center align-middle"}>
                <div className={"w-full"}>
                    <Button className={"flex border-none justify-start gap-2"}>
                        <span className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}>
                            <MessageOutlined/>
                        </span>
                        <span className={"max-w-xl text-base/7 text-gray-500 lg:max-w-lg"}>
                            {!post
                                ? <Skeleton.Button/>
                                :
                                <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>
                                    {post.comments.length.toLocaleString()}
                                </h6>
                            }
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostStats;