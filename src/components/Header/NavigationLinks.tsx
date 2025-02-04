import React, { memo } from "react";

type NavItem = {
    name: string;
    href: string;
    adminOnly?: boolean; // Potentially conditionally render links based on this
};

interface NavigationLinksProps {
    items: NavItem[];
    onClick: (href: string) => void;
    currentPath: string;
    isAdmin: boolean; // New prop to check if the user is an admin
}

export const NavigationLinks = memo(({ items, onClick, currentPath, isAdmin }: NavigationLinksProps) => (
    <>
        {items
            .filter(item => !item.adminOnly || isAdmin) // Only show admin-only links if the user is an admin
            .map((item) => (
                <button
                    key={item.name}
                    onClick={() => onClick(item.href)}
                    className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all
                        ${currentPath === item.href
                        ? 'text-indigo-600 bg-indigo-50/50'
                        : 'text-gray-600 hover:text-indigo-500'}
                        before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
                        before:bg-indigo-500 before:transition-all before:duration-300
                        hover:before:w-full`}
                    aria-label={`Navigate to ${item.name}`}
                >
                    {item.name}
                </button>
            ))}
    </>
));

