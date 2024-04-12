import React from "react";
import './header.css';
import  { Menu }  from "@mui/icons-material";
import icon from '../../assets/forms-icon.png';

export const Header = () => {

    return (
    <div className="header">
        <div className="header_info">
            <div className="header_icon">
                <img src={icon} alt="no image" className="header_icon_img"/>
            </div>  
            <div className="header_title">Формы</div>
        </div>
    </div>
    );
}