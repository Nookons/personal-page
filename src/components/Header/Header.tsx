import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {
    HOME_ROUTE,
} from '../../utils/const';
import ToTopButton from './ToTopButton';
import MyMenu from "./Menu/MyMenu";
import {useTheme} from "../../hooks/Theme/useThemeType";


const Home = () => {
    const navigate = useNavigate();
    const [isShowButton, setIsShowButton] = useState(false);

    const {theme, toggleTheme} = useTheme()

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



    const handleHomeClick = useCallback(() => {
        navigate(HOME_ROUTE);
    }, [navigate]);

    return (
        <>
            <ToTopButton isShowButton={isShowButton} />
            <header
                id="Header"
                className={`fixed flex  ${theme.menu.container} align-middle justify-between w-full px-8 py-4 z-50 backdrop-blur transition-all duration-300 ${isShowButton && 'shadow-lg'}`}
            >
                <div className="">
                    <button onClick={handleHomeClick} className="flex items-center gap-3 group" aria-label="Home">
                        <img alt="Nookon Web" src={logo}
                             className="h-8 w-auto transition-transform group-hover:rotate-12"/>
                        <h3 className={`text-xl font-bold ${theme.menu.logo_text}`}>
                            Nookon Web
                        </h3>
                    </button>
                </div>

                <MyMenu/>
            </header>
        </>
    );
};

export default Home;
