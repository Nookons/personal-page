import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { Country } from '../../types/Country';
import logo from "../../assets/logo.svg";

const SignUp = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState<Country | null>(null);
    const [filteredOptions, setFilteredOptions] = useState<Country[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Fetching the countries data
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
                setFilteredOptions(data);  // Initial filtering (no query)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const country = countries.find((country) => country.name.common === value);

        country && setQuery(country);

        if (value === '') {
            setIsOpen(false);
            setFilteredOptions(countries);  // Reset to all countries if query is empty
        } else {
            const filtered = countries.filter((country) =>
                country.name.common.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setIsOpen(true);
        }
    };

    const handleOptionClick = (option: Country) => {
        setQuery(option);
        setIsOpen(false);
    };

    return (
        <div className="flex py-24 px-8 justify-center items-center max-w-lg m-auto">
            <form>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Nookon Web"
                        src={logo}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="my-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create new Profile
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="border-b border-gray-900/10 pb-12">
                        <p className="mt-1 text-sm/6 text-gray-600">
                            This information will be displayed publicly, so it would be wise to exercise caution when
                            sharing content.
                        </p>

                        <div className="mt-5 flex justify-between">
                            <div className="w-full">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Nookon"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive
                            mail.</p>

                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2 w-full">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                    Country
                                </label>
                                {!loading ? (
                                    <div className="mt-2 grid grid-cols-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={query?.name.common}
                                                onChange={handleInputChange}
                                                className="w-full text-base px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                                placeholder="Start typing a country..."
                                            />
                                            {isOpen && filteredOptions.length > 0 && (
                                                <ul className="absolute w-full max-h-80 overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                                    {filteredOptions.map((option) => (
                                                        <li
                                                            key={option.cca3}
                                                            className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
                                                            onClick={() => handleOptionClick(option)}
                                                        >
                                                            {option.name.common}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full mt-2 overflow-x-clip">
                                        <Skeleton.Input style={{width: 440}} size="large"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="space-y-10">
                            <fieldset>
                                <div className="mt-6 space-y-6">
                                    <div className="flex gap-3">
                                        <div className="flex h-6 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    defaultChecked
                                                    id="comments"
                                                    name="comments"
                                                    type="checkbox"
                                                    aria-describedby="comments-description"
                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                />
                                                <svg
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                >
                                                    <path
                                                        d="M3 8L6 11L11 3.5"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                                    />
                                                    <path
                                                        d="M3 7H11"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-sm/6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Our rules
                                            </label>
                                            <p id="comments-description" className="text-gray-500">
                                                I have read and agree to the above conditions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <h2 className="text-base/7 font-semibold pt-4 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            We'll always let you know about important changes, but you pick what else you want to hear
                            about.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Back to Sign In
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
