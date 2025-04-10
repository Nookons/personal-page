import React, { FC, useState, ChangeEvent } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import useTheme from "../../hooks/Theme/useThemeType";

interface MyInputProps<T> {
    label: string;
    placeholder?: string;
    symbol?: string;
    type: "text" | "password" | "email" | "textarea"; // Уточнение типов
    name: keyof T;
    value: T;
    change: (updatedValue: T) => void;
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
    const { theme, toggleTheme } = useTheme();  // Получаем тему и функцию для её переключения

    // Обработчик изменения
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        change({ ...value, [name]: e.target.value });
    };

    return (
        <div>
            <label htmlFor={String(name)} className="block text-sm font-medium">
                {label}
            </label>
            <div className="mt-2">
                <div className={`flex ${theme.second_bg_color} items-center rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600`}>
                    {symbol && <div className="shrink-0 text-base sm:text-sm">{symbol}</div>}

                    {/* Проверяем на тип поля: если это textarea, рендерим textarea */}
                    {type === "textarea" ? (
                        <textarea
                            id={String(name)}
                            onChange={handleChange}
                            name={String(name)}
                            placeholder={placeholder}
                            value={value[name] || ""}
                            rows={4}
                            className={`block ${theme.second_bg_color} ${theme.second_text_color} w-full py-1.5 pl-1 pr-3 text-base placeholder-gray-400 focus:outline-none sm:text-sm`}
                            aria-label={label}
                        />
                    ) : (
                        <input
                            id={String(name)}
                            onChange={handleChange}
                            name={String(name)}
                            type={isVisible && type === "password" ? "text" : type}
                            placeholder={placeholder}
                            value={value[name] || ""}
                            className={`block ${theme.second_bg_color} ${theme.second_text_color} w-full py-1.5 pl-1 pr-3 text-base placeholder-gray-400 focus:outline-none sm:text-sm`}
                            aria-label={label}
                        />
                    )}

                    {/* Отображение/скрытие пароля */}
                    {type === "password" && (
                        <button
                            onClick={() => setIsVisible((prev) => !prev)}
                            type="button"
                            className="px-2"
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
