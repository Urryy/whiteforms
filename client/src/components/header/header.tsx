import React from "react";
import './header.css';
import icon from '../../assets/forms-icon.png';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Header = () => {
    useGSAP(() => {
        gsap.to('#header_info', { y: 0, opacity: 1, delay: 2})
    }, [])

    return (
    <div className="header">
        <div className="header_info" id="header_info">
            <div className="header_icon">
                <img src={icon} alt="no image" className="header_icon_img"/>
            </div>  
            <div className="header_title">Формы</div>
        </div>
    </div>
    );
}