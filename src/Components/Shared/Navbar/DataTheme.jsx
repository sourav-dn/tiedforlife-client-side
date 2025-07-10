import React, { useState, useEffect } from "react";
import { ToggleSwitch } from "flowbite-react";

const DataTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
                {/* {theme === "dark" ? "Dark" : "Light"} */}
            </span>
            <ToggleSwitch checked={theme === "dark"} onChange={handleToggle} />
        </div>
    );
};

export default DataTheme;