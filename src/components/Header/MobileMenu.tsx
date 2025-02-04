import React, {FC} from 'react';
import {Dialog} from '@headlessui/react';
import {LoginOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import {
    ABOUT_ROUTE,
    ADD_POST_ROUTE,
    ADD_PROJECT_ROUTE,
    BLOG_ROUTE,
    PROJECTS_ROUTE,
    SIGN_IN_ROUTE
} from "../../utils/const";
import {useAppSelector} from "../../hooks/storeHooks";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../hooks/Theme/useThemeType";

const ADMIN_UID = '0TiGUsGDH6d8QR5DJrMTAmdyTFg2';

interface MobileMenuProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    onThemeSwitchHandler: () => void;
    isDark: boolean;
}

type NavItem = {
    name: string;
    href: string;
    adminOnly?: boolean;
};

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

const MobileMenu: FC<MobileMenuProps> = ({isDark, onThemeSwitchHandler, mobileMenuOpen, setMobileMenuOpen}) => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user);

    const {theme} = useTheme();

    const onMenuClickHandler = (navItem: NavItem) => {
        navigate(navItem.href);
        setMobileMenuOpen(false);
    }
    const onSignInHandler = () => {
        navigate(SIGN_IN_ROUTE);
        setMobileMenuOpen(false);
    }

    return (
        <Dialog
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            className="relative z-50 lg:hidden"
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            <Dialog.Panel className={`fixed inset-y-0 right-0 w-full ${theme.bg_color}`}>
                <div className="flex h-full flex-col justify-between py-4 px-2">
                    {/* Close button */}
                    <div className="flex items-center justify-end p-4">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-500 hover:text-gray-600"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>


                    <div>
                        <nav className="flex flex-col space-y-4 px-4 py-6">
                            {baseNavigation.map((navItem: NavItem) => (
                                <button onClick={() => onMenuClickHandler(navItem)} key={navItem.name}
                                        className={theme.menu.button}>
                                    {navItem.name}
                                </button>
                            ))}
                            {user?.uid === ADMIN_UID &&
                                adminNavigation.map((navItem: NavItem) => (
                                    <button onClick={() => onMenuClickHandler(navItem)} key={navItem.name}
                                            className={theme.menu.button}>
                                        {navItem.name}
                                    </button>
                                ))}
                        </nav>

                        <div className="flex justify-between items-center gap-2">
                            {!isDark
                                ?
                                <div className={`flex items-center justify-end gap-2`}>
                                    <SunOutlined onClick={onThemeSwitchHandler}
                                                 className={"text-amber-500 bg-white p-1 rounded-xl text-2xl"}/>
                                    <h2 className={`text-xl text-gray-200 font-light`}>Light</h2>
                                </div>
                                :
                                <div className={`flex items-center justify-end gap-2`}>
                                    <MoonOutlined onClick={onThemeSwitchHandler}
                                                  className={"text-indigo-600 bg-white p-1 rounded-xl text-2xl"}/>
                                    <h2 className={`text-xl text-gray-200 font-light`}>Dark</h2>
                                </div>
                            }
                            <button onClick={onSignInHandler} className={`flex items-center justify-end hover:text-indigo-600`}>
                                <h2 className={`text-xl ${theme.text_color} font-semibold`}>Log in</h2>
                                <LoginOutlined className={`px-4  cursor-pointer ${theme.text_color} text-2xl`}/>
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};

export default MobileMenu;