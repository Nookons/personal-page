import React, {useEffect, useState} from 'react';
import {usePosts} from "../../../hooks/usePost";
import {useLocation} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {message, Skeleton} from "antd";
import MyInput from "../../../components/MyInput/MyInput";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {addPostReviewAction} from "../../../utils/Post/AddPostReview";
import {addReview, setPost} from "../../../store/reducers/Post";
import {IPostReview} from "../../../types/Post/Post";
import PostReview from "./PostReview";
import PostStats from "./PostStats";


const PostOverview = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("postId");

    const user = useAppSelector(state => state.user.user)

    const {post, loading, error} = usePosts(id ? id : "")

    useEffect(() => {
        if (post) {
            dispatch(setPost(post))
        }
    }, [post]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [review, setReview] = useState<any>({
        body: ""
    });

    const onAddReviewHandle = async () => {
        try {
            if (!user) {
                throw new Error("You must be logged in to add a review");
            }
            if (review.body.trim().length < 3) {
                throw new Error("Your review must have a minimum of 3 characters");
            }
            if (!id) {
                throw new Error("Invalid post ID");
            }

            setIsLoading(true);
            const result = await addPostReviewAction({ user, review, id });

            if (!result) {
                throw new Error("Failed to add review");
            }

            dispatch(addReview(result as IPostReview))
            setReview((prev: { body: string }) => ({ ...prev, body: "" }));
            message.success("Review added successfully!");

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            message.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={`grid min-h-screen grid-cols-1 lg:grid-cols-2`}>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#CCFF00] sm:from-[#fff8ae] sm:to-[#aeddff] to-[#33FFFF] opacity-100 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div
                className="relative max-w-screen-sm m-auto  isolate overflow-hidden px-6 pt-24 sm:py-32 lg:overflow-visible lg:px-0"
            >
                {loading
                    ? <><Skeleton className={"my-4"}/> <Skeleton className={"my-4"}/></>
                    :
                    <>
                        <PostStats />

                        <h1 className={`my-4 text-3xl font-semibold tracking-tight text-pretty text-gray-800  sm:text-5xl`}>
                            {post?.title}
                        </h1>
                        <p className={"text-base/7 my-8 text-gray-700"}>
                            {post?.description}
                        </p>
                    </>
                }
            </div>

            <div className={"relative mt-8 px-6 pb-8 lg:py-24"}>
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
                       {isLoading ? <span><LoadingOutlined className={"mr-2"} />Posting...</span> : "Post"}
                    </button>
                </div>

                {post && <PostReview />}
            </div>
        </div>
    );
};

export default PostOverview;