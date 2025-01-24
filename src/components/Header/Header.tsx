import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import {
    ADD_POST_ROUTE,
    ADD_PROJECT_ROUTE,
    BLOG_ROUTE,
    HOME_ROUTE,
    PROJECTS_ROUTE,
    SIGN_IN_ROUTE,
} from '../../utils/const'
import { useAppSelector } from '../../hooks/storeHooks'

const Home = () => {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const { user, loading, error } = useAppSelector((state) => state.user)

    const navigation = [
        { name: 'My Projects', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Features goals', href: '#' },
        { name: 'About me', href: '#' },

        // Условный рендеринг для элементов "For admin"
        ...(user && user.uid === '0TiGUsGDH6d8QR5DJrMTAmdyTFg2'
            ? [{ name: 'Add post', href: '#' }]
            : []),
        ...(user && user.uid === '0TiGUsGDH6d8QR5DJrMTAmdyTFg2'
            ? [{ name: 'Add project', href: '#' }]
            : []),
    ]

    const homeHandle = () => {
        navigate(HOME_ROUTE)
        setMobileMenuOpen(false)
    }

    const menuHandle = (value: string) => {
        switch (value) {
            case 'My Projects':
                navigate(PROJECTS_ROUTE)
                break
            case 'Blog':
                navigate(BLOG_ROUTE)
                break
            case 'Add post':
                navigate(ADD_POST_ROUTE)
                break
            case 'Add project':
                navigate(ADD_PROJECT_ROUTE)
                break
            default:
                break
        }
        setMobileMenuOpen(false)
    }

    const loginHandle = () => {
        navigate(SIGN_IN_ROUTE)
        setMobileMenuOpen(false)
    }

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a onClick={homeHandle} className="-m-1.5 p-1.5 flex justify-between items-center space-x-2">
                            <span className="sr-only">Nookon Web</span>
                            <img alt="Nookon Web" src={logo} className="h-8 w-auto cursor-pointer" />
                            <h3 className="font-bold text-gray-800">Nookon Web</h3>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                onClick={() => menuHandle(item.name)}
                                className="text-sm/6 cursor-pointer font-semibold text-gray-900"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {user ? (
                            <div>
                                <p>Hi there, {user.email}</p>
                            </div>
                        ) : (
                            <a onClick={loginHandle} className="text-sm/6 cursor-pointer font-semibold text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        )}
                    </div>
                </nav>
                <Dialog
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                    className="lg:hidden transition-all ease-in-out duration-300"
                >
                    <div className="fixed inset-0 z-50">
                        <DialogPanel
                            className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform ease-in-out duration-300 ${
                                mobileMenuOpen ? 'transform-none opacity-100' : 'transform translate-x-full opacity-0'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Nookon Web</span>
                                    <img alt="Nookon Web" src={logo} className="h-8 w-auto" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                onClick={() => menuHandle(item.name)}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        {user ? (
                                            <div>
                                                <p>Hi there, {user.email}</p>
                                            </div>
                                        ) : (
                                            <a
                                                onClick={loginHandle}
                                                className="-mx-3 cursor-pointer block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                Log in
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </header>
        </>
    )
}

export default Home
