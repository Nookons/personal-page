import React, {useState} from 'react';
import MyInput from "../../../components/MyInput/MyInput";
import {Button, message, Select} from "antd";
import {IPostForm} from "../../../types/Post/PostForm";
import {addPostAction} from "../../../utils/Post/AddPost";


const AddPost = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [data, setData] = useState<IPostForm>({
        title: '',
        href: '',
        description: '',
        category: [],
    });

    const teg_array = [
        {label: "JavaScript", value: "JavaScript"},
        {label: "TypeScript", value: "TypeScript"},
        {label: "GitHub", value: "GitHub"},
        {label: "FireBase", value: "FireBase"},
        {label: "Tailwind", value: "Tailwind"},
        {label: "Antd Design", value: "Antd Design"},
        {label: "Material UI", value: "Material UI"},
    ]

    const handleChange = (value: string[]) => {
        setData((prev) => ({...prev, category: value}));
    };

    const addPostHandle = async () => {
        try {
            setIsLoading(true)
            const result = await addPostAction(data);

            if (result) {
                setData({
                    title: '',
                    href: '',
                    description: '',
                    category: [],
                })
                message.success("Post was added successfully");
            }
        } catch (error) {
            error && console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={"min-h-screen py-24 px-4 flex flex-col gap-2"}>
            AddPost...
            <MyInput label={"Title"} type={"text"} name={"title"} value={data} change={setData}/>
            <MyInput label={"href"} type={"text"} name={"href"} value={data} change={setData}/>
            <MyInput label={"description"} type={"textarea"} name={"description"} value={data} change={setData}/>

            <div>
                <article className={"text-gray-800 font-semibold"}>Post category</article>
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: '100%'}}
                    placeholder="Please select"
                    defaultValue={[]}
                    value={data.category}
                    onChange={handleChange}
                    options={teg_array.map(el => ({label: el.label, value: el.value}))}
                />
            </div>

            <Button disabled={isLoading} type={"primary"} danger={isLoading} onClick={addPostHandle}>{isLoading ? "Adding post" : "Add post"}</Button>
        </div>
    );
};

export default AddPost;