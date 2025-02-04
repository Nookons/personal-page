import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {useTheme} from "../../../hooks/Theme/useThemeType";
import {LoginOutlined, MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import MobileMenu from "../MobileMenu";
import {Form, Switch} from "antd";

const ADMIN_UID = '0TiGUsGDH6d8QR5DJrMTAmdyTFg2';

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

const MyMenu = () => {
    const navigate = useNavigate();
    const {user} = useAppSelector((state) => state.user);

    const {theme, toggleTheme} = useTheme()

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);

    const [theme_type, setTheme_type] = useState<string>(localStorage.getItem("theme") || "");

    useEffect(() => {
        if (theme_type === "dark") {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, [theme_type]);

    const onThemeSwitchHandler = () => {
        if (isDark) {
            setIsDark(false)
            toggleTheme()
        } else {
            setIsDark(true)
            toggleTheme()
        }
    }

    const onMenuClickHandler = (navItem: NavItem) => {
        navigate(navItem.href);
    }

    return (
        <div className="flex items-center justify-between gap-8">
            {/* Основная навигация для десктопов */}
            <nav className="hidden sm:flex items-center gap-4">
                {baseNavigation.map((navItem: NavItem) => (
                    <button onClick={() => onMenuClickHandler(navItem)} key={navItem.name} className={theme.menu.button}>
                        {navItem.name}
                    </button>
                ))}
                {user?.uid === ADMIN_UID &&
                    adminNavigation.map((navItem: NavItem) => (
                        <button onClick={() => onMenuClickHandler(navItem)} key={navItem.name} className={theme.menu.button}>
                            {navItem.name}
                        </button>
                    ))}
            </nav>

            {/* Мобильное меню */}
            <div className="flex sm:hidden items-center">
                <button onClick={() => setIsOpen(true)}>
                    <MenuOutlined/>
                </button>
                <MobileMenu
                    isDark={isDark}
                    onThemeSwitchHandler={onThemeSwitchHandler}
                    mobileMenuOpen={isOpen}
                    setMobileMenuOpen={setIsOpen}
                />
            </div>

            {/* Переключатель темы */}
            <div className="hidden items-center gap-2 sm:flex">
                {!isDark
                    ? <SunOutlined onClick={onThemeSwitchHandler} className={"text-amber-500 bg-white p-1 rounded-xl text-2xl"}/>
                    : <MoonOutlined onClick={onThemeSwitchHandler} className={"text-indigo-600 bg-white p-1 rounded-xl text-2xl"}/>
                }
                <LoginOutlined onClick={() => navigate(SIGN_IN_ROUTE)} className={`px-4 text-gray-800 cursor-pointer text-xl hover:text-indigo-600`}/>
            </div>
        </div>
    );
};

export default MyMenu;