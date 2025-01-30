import React, {useEffect, useState} from 'react';
import {IPost, IPostReview} from "../../types/Post/Post";
import {useAppSelector} from "../../hooks/storeHooks";
import {Alert, Avatar} from "antd";

const PostReview = () => {
    const post = useAppSelector(state => state.post.post)

    const [reversed_reviews, setReversed_reviews] = useState<IPostReview[]>([]);

    useEffect(() => {
        if (post) {
            setReversed_reviews([...post.comments].reverse())
        }
    }, [post]);

    if (!post) {
        return <Alert message="Ups... Something went wrong" banner/>
    }

    return (
        <div className={"mt-4 flex flex-col gap-4"}>
            {reversed_reviews.map((review, index) => {

                return (
                    <div className={"flex justify-start gap-4"}>
                        <div className={"relative"}>
                            <Avatar
                                size={{xs: 40, sm: 40, md: 64, lg: 64, xl: 64, xxl: 64}}
                                src="https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHJhdyUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
                            >
                                User
                            </Avatar>
                            {/*<img*/}
                            {/*    alt=""*/}
                            {/*    src="https://images.unsplash.com/photo-1595887543484-e4a94a97abf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHJhdyUyMHBvcnRyYWl0fGVufDB8fDB8fHww"*/}
                            {/*    className="inline-block size-10 rounded-full ring-2 ring-white"*/}
                            {/*/>*/}
                            {index + 1 !== reversed_reviews.length && <div className={"bg-gray-300 absolute top-0 -z-10 rounded left-1/2 h-full w-0.5"}/>}
                        </div>
                        <div className={"bg-white w-full shadow rounded-2xl rounded-ss-none"}>
                            <div className={"flex flex-wrap-reverse justify-between py-2 px-4"}>
                                <h4>{review.user_email}<span className={"text-gray-400 text-xs mx-2"}>commented</span></h4>
                                <time className={"text-gray-400 text-xs"}>{review.date}</time>
                            </div>
                            <p className={"px-4 py-2 text-sm text-gray-500"}>
                                {review.body}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default PostReview;