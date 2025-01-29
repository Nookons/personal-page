import React, {useState} from 'react';
import {getHighlightsDescription} from "../../../utils/Project/getHighlightsDescription";
import {getHighlightsIcon} from "../../../utils/Project/getHighlightsIcon";
import {ChevronDownIcon} from "@heroicons/react/16/solid";

const MyHighlightElement = ({highlight}: {highlight: string}) => {
    const details = getHighlightsDescription(highlight);
    const icon = getHighlightsIcon(highlight)

    const [isFull, setIsFull] = useState(false);

    return (
        <li onClick={() => setIsFull(!isFull)} className={`flex cursor-pointer p-2 transition rounded-2xl gap-x-3 ${isFull ? "bg-gradient-to-r to-100% from-indigo-50 to-white" : "bg-gradient-to-r to-25% from-indigo-50 to-white"}`}>
            {icon}
            <span>
                <strong className="font-semibold text-gray-900">
                    {highlight}
                </strong>
                <p className={`${isFull ? 'line-clamp-none' : 'line-clamp-1'}`}>
                  {details}
                </p>
                <ChevronDownIcon aria-hidden="true" className={`size-5 w-full mt-2 transition ${isFull ? "rotate-180" : "rotate-0"}`} />
            </span>
        </li>
    );
};

export default MyHighlightElement;