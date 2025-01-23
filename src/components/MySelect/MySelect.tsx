import React, { FC } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface DataObj {
    label: string;
    value: string;
}

interface MySelectProps<T> {
    data: DataObj[];
    label: string;
    value: T;
    change: (value: T) => void;
}

const MySelect: FC<MySelectProps<string>> = ({ data, label, value, change }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        change(selectedValue);  // Передаем новое значение в родительский компонент
    };

    return (
        <div className="sm:col-span-3">
            <label htmlFor={label} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2 grid grid-cols-1">
                <select
                    id={label}
                    name={label.toLowerCase()}
                    value={value}  // Текущее значение
                    onChange={handleChange}  // Обработчик изменений
                    autoComplete={data[0]?.label}
                    className="col-start-1 ring-1 ring-gray-300 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                    {data.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </div>
        </div>
    );
};

export default MySelect;
