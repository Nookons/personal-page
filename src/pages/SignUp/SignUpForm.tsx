import React, { useState } from 'react';
import SignUpHeader from "./SignUpHeader";
import MyInput from "../../components/MyInput/MyInput";
import dayjs from "dayjs";
import {userCreateAccount} from "../../utils/User/SignUp";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/const";
import {useAppDispatch} from "../../hooks/storeHooks";
import {userEnter} from "../../store/reducers/User";

export interface ISignUp {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    check_password: string;
    id: string;
}

const SignUpForm = () => {
    const navigate = useNavigate();
    const disptach = useAppDispatch();

    const [form_data, setForm_data] = useState<ISignUp>({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        check_password: "",
        id: dayjs().valueOf().toString(),
    });

    // Handle changes for form inputs
    const handleChange = (updatedData: ISignUp) => {
        setForm_data(updatedData);
    };

    const onSubmitHandle = async () => {
        const result = await userCreateAccount(form_data)

        console.log(result);

        if (result) {
            message.success(`Successful created new account: ${form_data.email}`);
            setForm_data({
                email: "",
                first_name: "",
                last_name: "",
                password: "",
                check_password: "",
                id: dayjs().valueOf().toString(),
            })
            disptach(userEnter(form_data))
            navigate(HOME_ROUTE)
        }
    }


    return (
        <div className="min-h-screen py-24 px-4 max-w-lg m-auto">
            <SignUpHeader />
            <div className={"flex flex-col gap-4"}>
                <MyInput
                    label={"Email"}
                    placeholder={"ivanSolo2003@icloud.com"}
                    symbol={"😁"}
                    name={"email"}
                    type={"email"}
                    value={form_data}
                    change={handleChange}
                />

                <div className="grid grid-cols-2 gap-4">
                    <MyInput
                        type={"text"}
                        label={"First Name"}
                        placeholder={"Dmytro"}
                        name={"first_name"}
                        value={form_data}
                        change={handleChange}
                    />
                    <MyInput
                        type={"text"}
                        label={"Last Name"}
                        placeholder={"Kolomiiets"}
                        name={"last_name"}
                        value={form_data}
                        change={handleChange}
                    />
                </div>

                <MyInput
                    label={"Password"}
                    type={"password"}
                    name={"password"}
                    value={form_data}
                    change={handleChange}
                />

                <MyInput
                    label={"Password Check"}
                    type={"password"}
                    name={"check_password"}
                    value={form_data}
                    change={handleChange}
                />
                <button
                    onClick={onSubmitHandle}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create account
                </button>
                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                    Back to Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;
