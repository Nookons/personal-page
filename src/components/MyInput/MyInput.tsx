import React, { FC, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ISignUp } from "../../pages/SignUp/SignUpForm";

interface MyInputProps {
    label: string;
    placeholder?: string;
    symbol?: string;
    type: string;
    name: keyof ISignUp; // Making sure that name matches the keys of ISignUp
    value: ISignUp;
    change: (updatedValue: ISignUp) => void;
}

const MyInput: FC<MyInputProps> = ({ label, placeholder, symbol, type, name, value, change }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Handle change and update the specific field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        change({
            ...value,
            [name]: e.target.value, // Dynamically update the field based on 'name'
        });
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    {symbol && (
                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">{symbol}</div>
                    )}
                    <input
                        id={name}
                        onChange={handleChange}
                        name={name}
                        type={isVisible && type === "password" ? "text" : type}
                        placeholder={placeholder}
                        value={value[name]}
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    {type === "password" && (
                        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                            <button
                                onClick={() => setIsVisible(!isVisible)}
                                type="button"
                                className="text-sm/6 px-2 font-semibold text-gray-900"
                            >
                                {!isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyInput;
