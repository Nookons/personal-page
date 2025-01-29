import React, {useState} from 'react';
import {usePosts} from "../../hooks/usePost";
import {useLocation} from "react-router-dom";
import {LikeOutlined, MessageOutlined} from "@ant-design/icons";
import {Skeleton} from "antd";
import MyInput from "../../components/MyInput/MyInput";

const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
]

const PostOverview = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("postId");

    const {post, loading, error} = usePosts(id ? id : "")

    const [review, setReview] = useState<string | any>("");

    return (
        <>
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

            <div className="relative max-w-screen-md m-auto min-h-screen isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">

                {loading
                    ? <><Skeleton className={"my-4"} /> <Skeleton className={"my-4"} /></>
                    :
                    <>
                        <h1 className="my-4 text-3xl font-semibold tracking-tight text-pretty text-gray-800 sm:text-5xl">
                            {post?.title}
                        </h1>
                        <p className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}>
                            {post?.description}
                        </p>
                    </>
                }
                <div className="w-full border rounded my-2 grid grid-cols-2">
                    <div className={"flex gap-2 border-r py-2 px-4 justify-center align-middle"}>
                        <div className={"w-full"}>
                            <div className={"flex justify-between"}>
                            <span className={"max-w-xl text-base/7 text-gray-500 lg:max-w-lg"}>Likes</span>
                                <span className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}><LikeOutlined/></span>
                            </div>
                            {loading
                                ? <Skeleton.Button/>
                                : <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>1,324</h6>
                            }
                        </div>
                    </div>
                    <div className={"flex gap-2 py-2 px-4 justify-center align-middle"}>
                        <div className={"w-full"}>
                            <div className={"flex justify-between"}>
                                <span className={"max-w-xl text-base/7 text-gray-500 lg:max-w-lg"}>Reviews</span>
                                <span className={"max-w-xl text-base/7 text-gray-700 lg:max-w-lg"}><MessageOutlined/></span>
                            </div>
                            {loading
                                ? <Skeleton.Button/>
                                : <h6 className={"max-w-xl text-base/7 font-semibold text-gray-700 lg:max-w-lg"}>214</h6>
                            }
                        </div>
                    </div>
                </div>


                <div className={"relative mt-8"}>
                    <MyInput label={"Add your comment"} type={"textarea"} name={'review'} value={review} change={setReview} />
                    <button className={"bg-indigo-600 text-white text-sm py-1 px-2 absolute bottom-2 right-2 rounded"}>
                        Post
                    </button>
                </div>

            </div>
        </>
    );
};

export default PostOverview;