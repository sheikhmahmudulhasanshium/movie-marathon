"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [dark, setDark] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        setDark(theme === "dark");
    }, [theme]);

    const toggleMode = () => {
        setTheme(dark ? "light" : "dark");
        setDark(!dark);
    };

    if (!isMounted) {
        return null; // Avoid rendering mismatched content during hydration
    }

    return (
        <div className="text-4xl mr-4">
            <button onClick={toggleMode}>
                {dark ? <MdLightMode className="text-yellow-300"/> : <MdDarkMode className="text-slate-500"/>}
            </button>
        </div>
    );
};

export default ModeToggle;
