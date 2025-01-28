
export const getHighlightsDescription = (value: string) => {
    switch (value) {
        case "JavaScript":
            return "JavaScript is a programming language used to create dynamic and interactive web content. It allows developers to manipulate HTML and CSS, control multimedia, and handle user input, making websites more engaging and responsive."
        case "TypeScript":
            return "TypeScript is a superset of JavaScript that adds static typing, enabling developers to catch errors early and improve code quality. It compiles down to JavaScript, making it compatible with all browsers and JavaScript environments."
        case "GitHub":
            return "GitHub is a platform for hosting and collaborating on code using Git version control. It allows developers to track changes, work together, and share projects with others."
        case "FireBase":
            return "Firebase is a platform by Google that provides tools for building and managing web and mobile apps. It offers services like real-time databases, authentication, hosting, and cloud functions to simplify backend development."
        case "Antd Design":
            return "Ant Design (Antd) is a popular React UI framework that provides a set of high-quality, reusable components for building modern, responsive web applications. It follows a clean, consistent design system to help developers create user-friendly interfaces quickly."
        default:
            return ""
    }
}


