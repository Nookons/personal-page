import React, { FC, useState, ChangeEvent } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface MyInputProps<T> {
    label: string;
    placeholder?: string;
    symbol?: string;
    type: string;
    name: keyof T; // Ключи объекта T
    value: T; // Сам объект
    change: (updatedValue: T) => void; // Обновление объекта
}

const MyInput = <T extends Record<string, any>>({
                                                    label,
                                                    placeholder,
                                                    symbol,
                                                    type,
                                                    name,
                                                    value,
                                                    change,
                                                }: MyInputProps<T>) => {
    const [isVisible, setIsVisible] = useState(false);

    // Обработчик изменения
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        change({ ...value, [name]: e.target.value });
    };

    return (
        <div>
            <label htmlFor={String(name)} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    {symbol && <div className="shrink-0 text-base text-gray-500 sm:text-sm">{symbol}</div>}
                    <input
                        id={String(name)}
                        onChange={handleChange}
                        name={String(name)}
                        type={isVisible && type === "password" ? "text" : type}
                        placeholder={placeholder}
                        value={value[name] || ""}
                        className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
                        aria-label={label}
                    />
                    {type === "password" && (
                        <button
                            onClick={() => setIsVisible((prev) => !prev)}
                            type="button"
                            className="px-2 text-gray-900"
                            aria-pressed={isVisible}
                            aria-label="Toggle password visibility"
                        >
                            {isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyInput;
