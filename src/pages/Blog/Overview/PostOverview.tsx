import React, {useEffect} from 'react';
import {usePosts} from "../../../hooks/usePost";
import {useLocation} from "react-router-dom";
import {Skeleton} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {setPost} from "../../../store/reducers/Post";
import PostStats from "./PostStats";
import useTheme from "../../../hooks/Theme/useThemeType";
import PostCategory from "./PostCategory";
import ReviewScreen from "../../../components/ReviewScreen/ReviewScreen";
import ReviewInput from "../../../components/ReviewInput/ReviewInput";


const PostOverview = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("postId");
    const { theme, toggleTheme } = useTheme();  // Получаем тему и функцию для её переключения

    const {post, loading, error} = usePosts(id ? id : "")

    useEffect(() => {
        if (post) {
            dispatch(setPost(post))
        }
    }, [post]);

    if (!id) {
        return <div className={`min-h-screen ${theme.bg_color} ${theme.text_color} py-24 px-4`}><p>No project id</p></div>;
    }

    return (
        <div className={`grid min-h-screen grid-cols-1 lg:grid-cols-2 ${theme.bg_color} ${theme.text_color}`}>
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
                className="relative w-full max-w-screen-sm m-auto  isolate overflow-hidden px-6 pt-24 sm:py-32 lg:overflow-visible lg:px-0"
            >
                {loading
                    ? <><Skeleton className={"my-4"}/> <Skeleton className={"my-4"}/></>
                    :
                    <>
                        <PostCategory />
                        <PostStats />

                        <h1 className={`my-4 text-3xl font-semibold tracking-tight text-pretty sm:text-5xl`}>
                            {post?.title}
                        </h1>
                        <p className={"text-base/7 my-4 "}>
                            {post?.description}
                        </p>
                    </>
                }
            </div>

            <div className={"relative mt-2 px-6 pb-8 lg:py-24"}>
                <ReviewInput  type={'posts'} id={id}/>
                {post && <ReviewScreen data={post.comments} />}
            </div>
        </div>
    );
};

export default PostOverview;