import React, {useEffect, useState} from 'react';
import {Alert, Avatar, message, Skeleton} from "antd";
import MyInput from "../../../components/MyInput/MyInput";
import {LoadingOutlined} from "@ant-design/icons";
import PostReview from "../../Blog/PostReview";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {IPostReview} from "../../../types/Post/Post";

const ProjectReviews = () => {
    const user = useAppSelector(state => state.user.user)
    const post = useAppSelector(state => state.post.post)

    const [reversed_reviews, setReversed_reviews] = useState<IPostReview[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [review, setReview] = useState<any>({
        body: ""
    });

    useEffect(() => {
        if (post) {
            setReversed_reviews([...post.comments].reverse())
        }
    }, [post]);

    if (!post) {
        return <Alert message="Ups... Something went wrong" banner/>
    }

    const onAddReviewHandle = async () => {
        try {

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            message.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={"relative mt-8 pb-8 lg:py-24"}>
                <div className={"relative"}>
                    <MyInput
                        label={"Add your comment"}
                        type={"textarea"}
                        name={'body'}
                        value={review}
                        change={setReview}
                    />
                    <button
                        onClick={onAddReviewHandle}
                        disabled={isLoading}
                        className={`${isLoading ? "bg-gray-400" : "bg-indigo-600 "} text-white text-sm py-1 px-2 absolute bottom-2 left-2 rounded`}
                    >
                        {isLoading ? <span><LoadingOutlined className={"mr-2"}/>Posting...</span> : "Post"}
                    </button>
                </div>

                {post && <PostReview />}
            </div>
        </>
    );
};

export default ProjectReviews;