import React, {useEffect, useState} from 'react';
import {IPost, IPostReview} from "../../../types/Post/Post";
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, Avatar} from "antd";
import useTheme from "../../../hooks/Theme/useThemeType";

const PostReview = () => {
    const project = useAppSelector(state => state.project.project)
    const { theme, toggleTheme } = useTheme();  // Получаем тему и функцию для её переключения

    const [reversed_reviews, setReversed_reviews] = useState<IPostReview[]>([]);

    useEffect(() => {
        if (project) {
            setReversed_reviews([...project.comments].reverse())
        }
    }, [project]);

    if (!project) {
        return <Alert message="Ups... Something went wrong" banner/>
    }

    if (project.comments.length <= 0) {
        return (
            <div className={`${theme.second_bg_color} ${theme.second_text_color} p-2 mt-4 rounded`}>
                <h2>Will be first who leave comment here...</h2>
            </div>
        )
    }

    return (
        <div className={`mt-4 flex flex-col gap-4 ${theme.second_text_color}`}>
            {reversed_reviews.map((review, index) => {

                return (
                    <div className={"flex justify-start gap-4"}>
                        <div className={"relative"}>
                            <Avatar
                                className={`z-20`}
                                size={{xs: 40, sm: 40, md: 64, lg: 64, xl: 64, xxl: 64}}
                                src="https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHJhdyUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
                            >
                                User
                            </Avatar>
                            {index + 1 !== reversed_reviews.length && <div className={`${theme.second_bg_color} absolute top-0 z-10 rounded left-1/2 h-full w-0.5`}/>}
                        </div>
                        <div className={`${theme.second_bg_color} w-full shadow rounded-2xl rounded-ss-none`}>
                            <div className={"flex flex-wrap-reverse justify-between py-2 px-4"}>
                                <h4>{review.user_email}<span className={"text-xs mx-2"}>commented</span></h4>
                                <time className={"text-xs"}>{review.date}</time>
                            </div>
                            <p className={"px-4 py-2 text-sm"}>
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