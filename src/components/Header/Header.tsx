import React, {useCallback, useEffect, useMemo, useState, memo} from 'react';
import {Dialog, DialogPanel} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/storeHooks';
import logo from '../../assets/logo.svg';
import {
    ABOUT_ROUTE,
    ADD_POST_ROUTE,
    ADD_PROJECT_ROUTE,
    BLOG_ROUTE,
    HOME_ROUTE,
    PROJECTS_ROUTE,
    SIGN_IN_ROUTE,
} from '../../utils/const';
import ToTopButton from './ToTopButton';
import {MyToggle} from "../MyToggle/MyToggle";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";

type NavItem = {
    name: string;
    href: string;
    adminOnly?: boolean;
};

const ADMIN_UID = '0TiGUsGDH6d8QR5DJrMTAmdyTFg2';

const baseNavigation: NavItem[] = [
    {name: 'Projects', href: PROJECTS_ROUTE},
    {name: 'Blog', href: BLOG_ROUTE},
    {name: 'Forum', href: '#'},
    {name: 'About me', href: ABOUT_ROUTE},
];

const adminNavigation: NavItem[] = [
    {name: 'Add post', href: ADD_POST_ROUTE, adminOnly: true},
    {name: 'Add project', href: ADD_PROJECT_ROUTE, adminOnly: true},
];

interface NavigationLinksProps {
    items: NavItem[];
    onClick: (href: string) => void;
}

const NavigationLinks = memo(({items, onClick}: NavigationLinksProps) => (
    <>
        {items.map((item) => (
            <button
                key={item.name}
                onClick={() => onClick(item.href)}
                className="text-sm text-indigo-600 font-semibold py-2 rounded sm:bg-transparent sm:text-gray-800 sm:text-sm sm:shadow-none sm:border-none sm:filter sm:border sm:hover:text-indigo-600 transition"
                aria-label={`Navigate to ${item.name}`}
            >
                {item.name}
            </button>
        ))}
    </>
));

const Home = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isShowButton, setIsShowButton] = useState(false);
    const {user} = useAppSelector((state) => state.user);

    const [isDark, setIsDark] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        const header = document.getElementById('Header');
        if (header) {
            setIsShowButton(window.scrollY > header.offsetHeight);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const navigation = useMemo(() => {
        return [
            ...baseNavigation,
            ...(user?.uid === ADMIN_UID ? adminNavigation : []),
        ];
    }, [user]);

    const handleNavigation = useCallback(
        (href: string) => {
            navigate(href);
            setMobileMenuOpen(false);
        },
        [navigate]
    );

    const handleHomeClick = useCallback(() => {
        navigate(HOME_ROUTE);
        setMobileMenuOpen(false);
    }, [navigate]);

    const handleLogin = useCallback(() => {
        navigate(SIGN_IN_ROUTE);
        setMobileMenuOpen(false);
    }, [navigate]);


    const toggleHandler = () => {
        setIsDark(!isDark);
    };

    const MobileMenu = memo(() => (
        <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
        >
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
                <DialogPanel
                    className={`fixed flex flex-col justify-between inset-y-0 right-0 z-50 w-full transition-all overflow-y-auto ${isDark ? "bg-gray-950" : "bg-white"} px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}>
                    <div className="flex items-center justify-between">
                        <button onClick={handleHomeClick} className={`flex px-4 py-2 rounded gap-2 align-bottom`}>
                            <img alt="Nookon Web" src={logo} className="h-8 w-auto"/>
                            <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-800"} pt-1`} >
                                Nookon Web
                            </h3>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`-m-2.5 rounded-md p-2.5 ${isDark ? "text-white" : "text-gray-700"}`}
                            aria-label="Close menu"
                        >
                            <XMarkIcon className="h-6 w-6"/>
                        </button>
                    </div>

                    <div className="flex flex-col justify-end">
                        <div className="divide-y divide-gray-800">
                            <div className="grid gap-4 grid-cols-1 pb-4">
                                <NavigationLinks items={navigation} onClick={handleNavigation}/>
                            </div>
                            <div
                                className="flex items-center justify-between gap-4 pt-6"> {/* Добавлен отступ сверху и gap */}
                                {user ? (
                                    <div
                                        className="text-sm font-semibold text-gray-900 truncate"> {/* Добавлен truncate для длинных email */}
                                        Welcome, <span className="font-normal">{user.email}</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className={`${isDark ? "text-white" : "text-indigo-600"}`}
                                    >
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </button>
                                )}
                                <div className="shrink-0 flex gap-4"> {/* Запрещаем сжатие переключателя */}
                                    {!isDark
                                        ? <SunOutlined className={"text-xl px-2 rounded text-indigo-600"}/>
                                        : <MoonOutlined className={"text-xl px-2 rounded text-indigo-600"}/>
                                    }
                                    <MyToggle
                                        isToggled={isDark}
                                        setIsToggled={setIsDark}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    ));

    return (
        <>
            <ToTopButton isShowButton={isShowButton}/>

            <header
                id="Header"
                className="absolute inset-x-0 top-0 z-50  backdrop-blur-md"
            >
                <nav className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <button
                            onClick={handleHomeClick}
                            className="-m-1.5 p-1.5 flex items-center gap-x-2"
                            aria-label="Home"
                        >
                            <img
                                alt="Nookon Web"
                                src={logo}
                                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                            />
                            <h3 className="font-bold text-gray-800 block">
                                Nookon Web
                            </h3>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        <NavigationLinks items={navigation} onClick={handleNavigation}/>
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            aria-label="Open menu"
                        >
                            <Bars3Icon className="h-6 w-6"/>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {user ? (
                            <div className="text-sm font-semibold text-gray-700">
                                Welcome, <span className="text-indigo-600">{user.email}</span>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                                aria-label="Login"
                            >
                                Log in <span aria-hidden="true">&rarr;</span>
                            </button>
                        )}
                    </div>
                </nav>

                {mobileMenuOpen && <MobileMenu/>}
            </header>
        </>
    );
};

export default Home;