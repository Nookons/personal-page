import React, {useState} from 'react';
import MyInput from "../../../components/MyInput/MyInput";
import {Button, message, Select} from 'antd';
import {IDataProject} from "../../../types/Project/ProjectForm";
import {addProjectAction} from "../../../utils/Posts/AddProject";


const AddProject = () => {
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
        setData((prev) => ({...prev, highlights: value}));
    };

    const [data, setData] = useState<IDataProject>({
        name: "",
        short_name: "",
        href: "",
        image_1: "",
        image_2: "",
        image_3: "",
        image_4: "",
        description: "",
        highlights: [],
        details: "",
    });

    const addPostHandler = async () => {
        try {
            const result = await addProjectAction(data);

            if (result) {
                setData({
                    name: "",
                    short_name: "",
                    href: "",
                    image_1: "",
                    image_2: "",
                    image_3: "",
                    image_4: "",
                    description: "",
                    highlights: [],
                    details: "",
                })
                message.success("Project was added")
            }
        } catch (err) {
            err && console.error(err.toString());
        }
    }

    return (
        <div className={"min-h-screen py-24 px-4 flex gap-2 flex-col"}>
            <h4>Add post page (only for admin)</h4>

            <MyInput label={"name"} type={"text"} name={"name"} value={data} change={setData}/>

            <MyInput label={"short_name"} type={"text"} name={"short_name"} value={data} change={setData}/>

            <MyInput label={"href"} type={"text"} name={"href"} value={data} change={setData}/>

            <MyInput label={"description"} type={"textarea"} name={"description"} value={data} change={setData}/>

            <MyInput label={"details"} type={"textarea"} name={"details"} value={data} change={setData}/>


            <MyInput label={`Image 1`} type={"text"} name={"image_1"} value={data} change={setData}/>
            <MyInput label={`Image 2`} type={"text"} name={"image_2"} value={data} change={setData}/>
            <MyInput label={`Image 3`} type={"text"} name={"image_3"} value={data} change={setData}/>
            <MyInput label={`Image 4`} type={"text"} name={"image_4"} value={data} change={setData}/>

            <div>
                <article className={"text-gray-800 font-semibold"}>Project tags</article>
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: '100%'}}
                    placeholder="Please select"
                    defaultValue={[]}
                    value={data.highlights}
                    onChange={handleChange}
                    options={teg_array.map(el => ({label: el.label, value: el.value}))}
                />
            </div>

            <Button onClick={addPostHandler}>Add project</Button>
        </div>
    );
};

export default AddProject;