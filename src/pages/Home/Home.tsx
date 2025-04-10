import React, {useEffect, useState} from 'react';
import ContactPopover from './ContactPopover';
import useTheme from "../../hooks/Theme/useThemeType";
import OrderModal from "./OrderModal";
import {useNavigate} from "react-router-dom";
import {ABOUT_ROUTE} from "../../utils/const";

const Home = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState<boolean>(false)

    // Логируем конкретные поля темы
    useEffect(() => {
        console.log('Theme updated - bg:', theme.bg_color, 'text:', theme.text_color);
    }, [theme.bg_color, theme.text_color]); // Явные зависимости

    return (
        <>
            <OrderModal open={open} setOpen={setOpen} />

            <div className={`${theme.bg_color} ${theme.text_color}`}>
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fff8ae] to-[#aeddff] opacity-100 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="sm:mb-8 sm:flex sm:justify-center">
                            <div
                                className="relative mb-8 rounded-full px-3 py-1 text-sm/6  ring-0 ring-gray-900/10 hover:ring-gray-900/20 sm:ring-1 sm:hover:ring-1"
                            >
                                <ContactPopover/>
                            </div>
                        </div>

                        <div className="text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight  sm:text-7xl">
                                Welcome, to personal page!
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
                                Hi there! I'm Kolomiiets Dmytro, and I've been lucky enough to work in software
                                development for over three years now.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    onClick={() => setOpen(true)}
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get Order
                                </a>
                                <a onClick={() => navigate(ABOUT_ROUTE)} href="#" className="text-sm/6 font-semibold ">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
