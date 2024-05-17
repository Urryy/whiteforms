import React from "react";
import './header.css';
import  { AccountBoxOutlined, ColorLens, Menu, RemoveRedEyeOutlined }  from "@mui/icons-material";
import icon from '../../assets/forms-icon.png';
import { Button, IconButton } from "@material-ui/core";

export const Header = () => {

    return (
    <div className="header">
        <div className="header_info">
            <div className="header_icon">
                <img src={icon} alt="no image" className="header_icon_img"/>
            </div>  
            <div className="header_title">Формы</div>
        </div>
        <div className="form_header_left">
            <IconButton>
                <AccountBoxOutlined className="form_header_icon"/>
            </IconButton>
        </div>
    </div>
    );
}