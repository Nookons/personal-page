import { useEffect, useState, useMemo } from 'react';
import {IThemeType} from "../../types/Theme/main";

const useTheme = () => {
    const defaultTheme = useMemo<IThemeType>(() => ({
        text_color: 'text-gray-800',
        second_text_color: "text-gray-600",
        bg_color: 'bg-white',
        second_bg_color: "bg-gray-200",
        button: "transition-all text-xl sm:text-sm text-gray-600 duration-300 cursor-pointer hover:text-gray-800 hover:border-indigo-600 hover:border-b",
        button_a: "transition-all text-xl sm:text-sm text-gray-600 duration-300 cursor-pointer hover:text-gray-800 hover:border-indigo-600 hover:border-b",
        second_button: "",
        time_mark: "",
        card_background: "bg-white",
    }), []);

    const darkTheme = useMemo<IThemeType>(() => ({
        text_color: 'text-gray-200',
        second_text_color: "text-indigo-200",
        bg_color: 'bg-gray-900',
        second_bg_color: "bg-gray-800",
        button: "bg-gray-800 text-sm text-nowrap rounded py-1 border-gray-800 px-2 text-gray-200 border-2 transition hover:border-indigo-600 z-10",
        button_a: "transition-all text-xl sm:text-sm text-gray-200 duration-300 cursor-pointer hover:text-indigo-200 hover:border-indigo-600 hover:border-b",
        second_button: "",
        time_mark: "text-xs text-gray-400",
        card_background: "bg-gray-800 border-2 transition border-gray-800 hover:bg-gray-900 cursor-pointer hover:border-indigo-600 border",
    }), []);

    const [theme, setTheme] = useState<IThemeType>(defaultTheme);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        setTheme(stored === 'dark' ? darkTheme : defaultTheme);
    }, []);

    useEffect(() => {
        const handler = () => {
            const stored = localStorage.getItem('theme');
            setTheme(stored === 'dark' ? darkTheme : defaultTheme);
        };

        window.addEventListener('themeChange', handler);
        return () => window.removeEventListener('themeChange', handler);
    }, []);

    const toggleTheme = () => {
        const isDark = theme.bg_color === darkTheme.bg_color;
        const newTheme = isDark ? defaultTheme : darkTheme;

        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        window.dispatchEvent(new CustomEvent('themeChange'));
        setTheme(newTheme);
    };

    return { theme, toggleTheme };
};

export default useTheme;
