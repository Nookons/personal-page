import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import logo from '../../assets/logo.svg';
import {
    ADD_POST_ROUTE,
    ADD_PROJECT_ROUTE,
    BLOG_ROUTE,
    HOME_ROUTE,
    PROJECTS_ROUTE,
    SIGN_IN_ROUTE,
} from '../../utils/const';
import ToTopButton from './ToTopButton';

type NavItem = {
    name: string;
    href: string;
    adminOnly?: boolean;
};

const ADMIN_UID = '0TiGUsGDH6d8QR5DJrMTAmdyTFg2';

const baseNavigation: NavItem[] = [
    { name: 'Projects', href: PROJECTS_ROUTE },
    { name: 'Blog', href: BLOG_ROUTE },
    { name: 'Forum', href: '#' },
    { name: 'About me', href: '#' },
];

const adminNavigation: NavItem[] = [
    { name: 'Add post', href: ADD_POST_ROUTE, adminOnly: true },
    { name: 'Add project', href: ADD_PROJECT_ROUTE, adminOnly: true },
];

interface NavigationLinksProps {
    items: NavItem[];
    onClick: (href: string) => void;
}

const NavigationLinks = memo(({ items, onClick }: NavigationLinksProps) => (
    <>
        {items.map((item) => (
            <button
                key={item.name}
                onClick={() => onClick(item.href)}
                className="text-sm/6 cursor-pointer font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200"
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
    const { user } = useAppSelector((state) => state.user);

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

    const MobileMenu = memo(() => (
        <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
        >
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto filter px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <button onClick={handleHomeClick} className="-m-1.5 p-1.5 flex gap-2 align-bottom">
                            <img alt="Nookon Web" src={logo} className="h-8 w-auto"/>
                            <h3 className="font-bold pt-1 text-gray-800">
                                Nookon Web
                            </h3>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            aria-label="Close menu"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6 flex flex-col gap-2">
                                <NavigationLinks items={navigation} onClick={handleNavigation} />
                            </div>
                            <div className="py-6">
                                {user ? (
                                    <div className="text-sm font-semibold text-gray-900">
                                        Welcome, {user.email}
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                                    >
                                        Log in
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    ));

    return (
        <>
            <ToTopButton isShowButton={isShowButton} />

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
                            <h3 className="font-bold text-gray-800 hidden sm:block">
                                Nookon Web
                            </h3>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        <NavigationLinks items={navigation} onClick={handleNavigation} />
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            aria-label="Open menu"
                        >
                            <Bars3Icon className="h-6 w-6" />
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

                {mobileMenuOpen && <MobileMenu />}
            </header>
        </>
    );
};

export default Home;