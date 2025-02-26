import React, {FC, useState} from 'react';
import MyInput from "../MyInput/MyInput";
import {LoadingOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {addCommentAction} from "../../utils/Comments/AddComment";
import {addReviewPost} from "../../store/reducers/Post";
import {addReviewProject} from "../../store/reducers/Project";
import {IPostReview} from "../../types/Post/Post";

interface ILocalData {
    body: string;
}

interface ReviewInputProps {
    type: "projects" | "posts",
    id: string;
}

const ReviewInput: FC<ReviewInputProps> = ({type, id}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user)

    const [data, setData] = useState<ILocalData>({
        body: ""
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!user) {
        return null
    }


    const onAddReviewHandle = async () => {
        try {
            setIsLoading(true)
            const result = await addCommentAction(type, data, id, user)

            if (result) {
                switch (type) {
                    case "posts":
                        dispatch(addReviewPost(result as IPostReview))
                        break
                    case "projects":
                        dispatch(addReviewProject(result as IPostReview))
                        break
                    default:
                        window.location.reload();
                }
            }

        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    };

    return (
        <div className={"relative"}>
            <MyInput
                label={"Add your comment"}
                type={"textarea"}
                name={'body'}
                value={data}
                change={setData}
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

export default ReviewInput;