import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

export const Footer = () => {
    useGSAP(() => {
        gsap.to('#footer_title', { opacity: 1, delay: 2 })
    }, [])

    return (
        <>
        <div className="footer" >
            <p id="footer_title" className="footer_main">FORMS</p>
        </div>
        </>
    );
}