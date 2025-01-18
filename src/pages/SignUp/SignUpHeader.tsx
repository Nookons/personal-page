// src/components/SignUp/SignUpHeader.tsx
import React from 'react';
import logo from "../../assets/logo.svg";

const SignUpHeader = () => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Nookon Web" src={logo} className="mx-auto h-10 w-auto" />
            <h2 className="my-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Create new Profile
            </h2>
            <p className="text-gray-800 w-full mb-4 bg-gray-100 p-2 rounded font-semibold">
                We promise not to share your data with anyone, so please trust us to look after it. But, just so you know, anyone on the site can see this.
            </p>
        </div>
    );
};

export default SignUpHeader;
