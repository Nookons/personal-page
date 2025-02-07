import React, {FC, useEffect, useState} from 'react';
import MyInput from "../MyInput/MyInput";
import {LoadingOutlined} from "@ant-design/icons";
import {message} from "antd";
import {addCommentAction} from "../../utils/Comments/AddComment";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import useTheme from "../../hooks/Theme/useThemeType";
import {addReviewProject} from "../../store/reducers/Project";
import {IPostReview} from "../../types/Post/Post";

interface CommentInputProps {
    label: string;
    name: string;
    id: string;
}

const CommentInput:FC<CommentInputProps> = ({label, name, id}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const {theme} = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [review, setReview] = useState<any>({
        body: ""
    });

    if (!user) {
        return (
            <div className={`${theme.second_bg_color} ${theme.second_text_color} py-2 px-4 rounded`}>
                <h1>You must be logged if you wanna to add comment</h1>
            </div>
        )
    }

    const onAddReviewHandle = async () => {
        try {
            const result = await addCommentAction(name, review, id, user)
            if (result) {
                dispatch(addReviewProject(result as IPostReview))
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            message.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={"relative"}>
            <MyInput
                label={label}
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
    );
};

export default CommentInput;