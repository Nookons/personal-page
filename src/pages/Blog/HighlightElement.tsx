import React, {useState} from 'react';
import {getHighlightsDescription} from "../../utils/Project/getHighlightsDescription";
import {getHighlightsIcon} from "../../utils/Project/getHighlightsIcon";

const MyHighlightElement = ({highlight}: {highlight: string}) => {
    const details = getHighlightsDescription(highlight);
    const icon = getHighlightsIcon(highlight)

    const [isFull, setIsFull] = useState(false);

    return (
        <li onClick={() => setIsFull(!isFull)} className={`flex p-2 rounded-2xl gap-x-3 ${isFull && "bg-blue-50"}`}>
            {icon}
            <span>
                <strong className="font-semibold text-gray-900">
                    {highlight}
                </strong>
                <p className={`${isFull ? 'line-clamp-none' : 'line-clamp-2'}`}>
                  {details}
                </p>
            </span>
        </li>
    );
};

export default MyHighlightElement;