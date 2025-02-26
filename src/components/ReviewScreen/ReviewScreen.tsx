import React, {FC, useEffect, useState} from 'react';
import {IPostReview} from "../../types/Post/Post";
import {useAppSelector} from "../../hooks/storeHooks";
import useTheme from "../../hooks/Theme/useThemeType";
import {Alert, Avatar} from "antd";
import NoComments from "../NoComments/NoComments";

interface ReviewScreenProps {
    data: IPostReview[],
}

const ReviewScreen:FC<ReviewScreenProps> = ({data}) => {
    const { theme, toggleTheme } = useTheme();  // Получаем тему и функцию для её переключения
    const [reversed_reviews, setReversed_reviews] = useState<IPostReview[]>([]);

    useEffect(() => {
        if (data.length) {
            setReversed_reviews([...data].reverse())
        }
    }, [data]);

    if (!data) {
        return <Alert message="Ups... Something went wrong" banner/>
    }

    if (reversed_reviews.length <= 0) {
        return <NoComments />
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
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdLNffw1DBAsD1XZlYUJF9eHhbVBbic3kQQ&s"}
                            >
                                User
                            </Avatar>
                            {index + 1 !== reversed_reviews.length && <div className={`${theme.second_bg_color} absolute top-0 z-10 rounded left-1/2 h-full w-0.5`}/>}
                        </div>
                        <div className={`${theme.second_bg_color} w-full shadow rounded-2xl rounded-ss-none`}>
                            <div className={"flex flex-wrap-reverse justify-between py-2 px-4"}>
                                <h4>{review.user_email}</h4>
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

export default ReviewScreen;