import { Popover } from '@headlessui/react'; // Use headlessui's Popover
import React from 'react';
import {
    ChevronDownIcon,
} from '@heroicons/react/16/solid';
import telegram from '../../assets/telegram.svg'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'

const solutions = [
    {
        name: 'Telegram',
        description: 'Best way to connect with me',
        href: 'https://t.me/nookon',
        icon: telegram
    },
    {
        name: 'Instagram',
        description: 'About questions to adds',
        href: '#',
        icon: instagram
    },
    {
        name: 'Whats App',
        description: 'Business chat',
        href: '#',
        icon: whatsapp
    },
];

const ContactPopover = () => {
    return (
        <Popover className="relative flex justify-center ">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm/6 font-semibold focus:outline-none focus:ring-0 md:focus:outline">
                <span>Contacts with me</span>
                <ChevronDownIcon aria-hidden="true" className="size-5" />
            </Popover.Button>



            <Popover.Panel
                transition
                className="absolute left-1/2 z-10 mt-8 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                        {solutions.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <img src={item.icon} alt=""/>
                                </div>
                                <div>
                                    <a href={item.href} className="font-semibold text-gray-900">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </a>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default ContactPopover;
