import React from 'react';
import useTheme from "../../hooks/Theme/useThemeType";
import {useAppSelector} from "../../hooks/storeHooks";

const NoComments = () => {
    const { theme, toggleTheme } = useTheme();  // Получаем тему и функцию для её переключения
    const user = useAppSelector(state => state.user.user)

    return (
        <div className={`${theme.second_bg_color} ${theme.text_color} grid grid-cols-1 p-2 mt-4 rounded`}>
            <h2>Will be first who leave comment here...</h2>
            {!user && <a href="#" className={`text-center bg-indigo-600 py-2 rounded mt-2`}>Go ahead 🔥</a>}
        </div>
    );
};

export default NoComments;