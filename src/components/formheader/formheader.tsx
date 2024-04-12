import React from "react";
import './formheader.css';
import './formheader.css';
import img_icon from '../../assets/forms-icon.png';
import { Button, IconButton } from "@material-ui/core";
import { ColorLens } from "@mui/icons-material";

export const FormHeader = () => {
    return (
        <div className="form_header">
            <div className="form_header_left">
                <img src={img_icon} alt="" className="header_icon_img"/>
                <input type="text" placeholder="Неизвестная форма" className="form_name"/>
                <IconButton>
                    <ColorLens className="form_header_icon" />
                </IconButton>
            </div>
            <div className="form_header_left">
                <Button variant="contained" color="primary" href="#contained-buttons">Отправить</Button>
            </div>
        </div>
    );
}