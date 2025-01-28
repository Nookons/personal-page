import React from 'react';
import {UpCircleOutlined} from "@ant-design/icons";

const ToTopButton = ({isShowButton}: {isShowButton: boolean}) => {

    const onClickHandle = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Correct property name for smooth scrolling
        });
    };

    return (
        <div className={"fixed bottom-4 right-4 z-20"}>
            <button onClick={onClickHandle} className={`${isShowButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} shadow transition p-2 rounded-2xl bg-indigo-600`}>
                <UpCircleOutlined className={`text-3xl text-white`}/>
            </button>
        </div>
    );
};

export default ToTopButton;