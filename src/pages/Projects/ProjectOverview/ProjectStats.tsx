import React, {useEffect, useState} from 'react';
import Button from "antd/es/button";
import {HeartOutlined, LikeOutlined, LoadingOutlined, MessageOutlined} from "@ant-design/icons";
import {message, Skeleton} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {addPostLikeAction, removePostLikeAction} from "../../../utils/Post/AddLike";
import {addLike, removeLike} from "../../../store/reducers/Post";
import {addProjectLikeAction, removeProjectLikeAction} from "../../../utils/Project/addLike";

const ProjectStats = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user)
    const project = useAppSelector(state => state.project.project)

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (project && user) {
            const isHave = project.likes_users.includes(user.uid)
            setIsLiked(isHave)
        }
    }, [project]);

    const onLikeHandle = async () => {
        try {
            if (project && project.id) {
                if (!user) {
                    throw new Error("You not logged in!");
                }

                if (isLiked) {
                    setIsLoading(true);
                    const id = project.id;
                    const result = await addProjectLikeAction({user, id, project})

                    if (result) {
                        dispatch(removeLike(user))
                    }
                    return
                }

                setIsLoading(true);
                const id = project.id;
                const result = await removeProjectLikeAction({user, id, project})

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
                            {!project
                                ? <Skeleton.Button/>
                                :
                                <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>{project.likes.toLocaleString()}</h6>
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
                            {!project
                                ? <Skeleton.Button/>
                                :
                                <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>
                                    {project.comments.length.toLocaleString()}
                                </h6>
                            }
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectStats;