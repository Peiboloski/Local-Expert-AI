'use client'

import React, { useEffect } from "react";

const SetScreenMinHeight: React.FC<{ id: string }> = ({ id }) => {
    // define a function that sets min-height of an element to the window.innerHeight
    //THis is ised tp avoid the problem of 100vh with mobile browsers

    useEffect(() => {
        const setHeight = () => {
            const element = document.getElementById(id);
            if (element) {
                element.style.minHeight = `${window.innerHeight}px`;
            }
        }

        window.addEventListener("resize", setHeight);
        setHeight();

        return () => {
            window.removeEventListener("resize", setHeight);
        }
    }, [id]);

    return null;
}

export default SetScreenMinHeight;

