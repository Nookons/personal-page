import { useEffect, useState, useMemo } from 'react';
import {IThemeType} from "../../types/Theme/main";


type ThemeSource = 'system' | 'manual';

const defaultTheme: IThemeType = {
    text_color: 'text-gray-800',
    bg_color: 'bg-white',
    a: "",
    card_background: "bg-white",
    menu: {
        mobile_menu: {
            bg: "fixed inset-0 z-50 bg-black backdrop-blur-sm",
            main_text: 'text-gray-900',
            text: "text-gray-800",
        },
        container: "",
        logo_text: "text-gray-800",
        button: "transition-all text-gray-600 duration-300 cursor-pointer hover:text-gray-800 hover:border-indigo-600 hover:border-b",
    },
    card: {
        main_text: "",
        secondary_text: "",
        time_text: "",
        bg_color: ""
    }
};

const darkTheme: IThemeType = {
    text_color: 'text-white',
    bg_color: 'bg-gray-900',
    a: "",
    card_background: "",
    menu: {
        mobile_menu: {
            bg: "",
            main_text: '',
            text: "",
        },
        logo_text: "text-white",
        container: "bg-gray-900/30",
        button: "transition-all text-white duration-300 cursor-pointer hover:border-indigo-600 hover:border-b",
    },
    card: {
        main_text: "",
        secondary_text: "",
        time_text: "",
        bg_color: ""
    }
};

export const useTheme = () => {
    const [theme, setTheme] = useState<IThemeType>(defaultTheme);

    // Проверяем локальное хранилище и устанавливаем начальную тему
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setTheme(darkTheme);
        } else {
            setTheme(defaultTheme);
        }
    }, []);

    // Слушаем изменения в локальном хранилище
    useEffect(() => {
        const handleStorageChange = () => {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark') {
                setTheme(darkTheme);
            } else {
                setTheme(defaultTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === darkTheme ? defaultTheme : darkTheme;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
    };

    return useMemo(() => ({
        theme,
        toggleTheme,
    }), [theme]);
};
