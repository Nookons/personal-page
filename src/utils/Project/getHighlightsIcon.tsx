import {AntDesignOutlined, BulbOutlined, FireOutlined, GithubOutlined, JavaScriptOutlined} from "@ant-design/icons";
import React from "react";

export const getHighlightsIcon = (value: string) => {
    switch (value) {
        case "JavaScript":
            return <JavaScriptOutlined aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />;
        case "GitHub":
            return <GithubOutlined  aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />;
        case "Antd Design":
            return <AntDesignOutlined  aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />;
        case "FireBase":
            return <FireOutlined  aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />;
        default:
            return <BulbOutlined aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />;
    }
};