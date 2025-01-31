import { FC } from 'react';

interface MyToggleProps {
    isToggled: boolean;
    setIsToggled: (state: boolean) => void;
    disabled?: boolean; // Добавляем опциональное свойство для отключения
}

export const MyToggle: FC<MyToggleProps> = ({ isToggled, setIsToggled, disabled = false }) => {
    const handleToggle = () => {
        if (!disabled) {
            setIsToggled(!isToggled);
        }
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isToggled}
                onChange={handleToggle}
                disabled={disabled}
                aria-checked={isToggled} // Для лучшей доступности
            />
            <div className={`
                w-14 h-8 bg-gray-300 rounded-full 
                peer peer-checked:bg-blue-500 
                peer-focus:outline-none 
                after:content-[''] after:absolute after:top-1 after:left-1
                after:bg-white after:border-gray-300 after:rounded-full
                after:h-6 after:w-6 after:transition-all
                peer-checked:after:translate-x-6
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}/>
        </label>
    );
};