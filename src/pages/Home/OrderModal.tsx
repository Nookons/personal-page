import React, {FC, useState} from 'react';
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";
import useTheme from "../../hooks/Theme/useThemeType";

import telegram from '../../assets/telegram.svg'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'

interface OrderModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const OrderModal:FC<OrderModalProps> = ({open, setOpen}) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Dialog open={open} onClose={() => setOpen(false)}  className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Choose best way to you
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Hey, we totally get it, picking where to place your order can be tricky! So, we've made it super easy by offering you loads of different options. Take your pick of the platform or location that works best for you.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 mt-4 gap-2">
                                        <a
                                            type="button"
                                            href={`https://t.me/nookon_bot`}
                                            onClick={() => setOpen(false)}
                                            className="inline-flex w-full bg-gray-100 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                        >
                                            <img className={`max-w-10`} src={telegram} alt=""/>
                                        </a>
                                        <a
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex w-full bg-gray-100 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                        >
                                            <img className={`max-w-10`} src={instagram} alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default OrderModal;