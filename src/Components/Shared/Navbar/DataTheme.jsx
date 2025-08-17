import React, { useState, useEffect } from "react";
import { ToggleSwitch } from "flowbite-react";

const DataTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    // useEffect(() => {
    //     if (theme === "dark") {
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //     }
    //     localStorage.setItem("theme", theme);
    // }, [theme]);

    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}, [theme]);

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div className="flex items-center gap-2">
            {/* <span className="text-sm text-gray-600 dark:text-gray-300"> */}
                {/* {theme === "dark" ? "Dark" : "Light"} */}
            {/* </span> */}
            {/* <ToggleSwitch checked={theme === "dark"} onChange={handleToggle} /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
                type="checkbox"
                value={theme}
                checked={theme === "dark"}
                onChange={handleToggle}
                className="toggle theme-controller"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </div>
    );
};

export default DataTheme;