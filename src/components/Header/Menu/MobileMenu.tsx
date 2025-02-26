import React, {FC} from 'react';
import {Dialog} from '@headlessui/react';
import {LoginOutlined, MoonOutlined, SunOutlined, UserOutlined} from "@ant-design/icons";
import {
    ABOUT_ROUTE,
    ADD_POST_ROUTE,
    ADD_PROJECT_ROUTE,
    BLOG_ROUTE,
    PROJECTS_ROUTE,
    SIGN_IN_ROUTE
} from "../../../utils/const";
import {useAppSelector} from "../../../hooks/storeHooks";
import {useNavigate} from "react-router-dom";
import useTheme from "../../../hooks/Theme/useThemeType";
import {message} from "antd";

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
    const onProfileHandle = () => {
        message.info("That options temporary don't available")
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
                                        className={theme.button_a}>
                                    {navItem.name}
                                </button>
                            ))}
                            {user?.uid === ADMIN_UID &&
                                adminNavigation.map((navItem: NavItem) => (
                                    <button onClick={() => onMenuClickHandler(navItem)} key={navItem.name}
                                            className={theme.button_a}>
                                        {navItem.name}
                                    </button>
                                ))}
                        </nav>

                        <div className="flex justify-between items-center border-t pt-8 gap-2">
                            {!isDark
                                ?
                                <div onClick={onThemeSwitchHandler} className={`flex items-center bg-white py-1 px-4 rounded-xl justify-end gap-2`}>
                                    <SunOutlined className={"text-amber-500 text-2xl"}/>
                                    <h2 className={`text-xl text-gray-600 `}>Light</h2>
                                </div>
                                :
                                <div onClick={onThemeSwitchHandler} className={`flex items-center bg-white py-1 px-4 rounded-xl justify-end gap-2`}>
                                    <MoonOutlined className={"text-indigo-600 text-2xl"}/>
                                    <h2 className={`text-xl text-gray-600`}>Dark</h2>
                                </div>
                            }
                            {!user
                                ? <button onClick={onSignInHandler}
                                          className={`flex ${theme.button_a} items-center justify-end hover:text-indigo-600`}>
                                        <h2 className={`text-xl ${theme.button_a}`}>Log in</h2>
                                        <LoginOutlined className={`px-4  cursor-pointer ${theme.button_a}`}/>
                                    </button>
                                : <button onClick={onProfileHandle}
                                              className={`flex ${theme.button_a} items-center justify-end hover:text-indigo-600`}>
                                        <UserOutlined className={`mr-2 text-xl border p-2 rounded-xl`} />
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};

export default MobileMenu;