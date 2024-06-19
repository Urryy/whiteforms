import React from "react";
import './template.css';
import { MoreVert, UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { IconButton } from "@material-ui/core";
import BaseTemplateCardIcon from "../../assets/form-add-blank.png";
import {useNavigate} from 'react-router-dom';

export const Template = () => {
    const navigate = useNavigate();

    function createForm(){
        navigate("/form");
    }

    return (
        <div className="template_section">
            <div className="template_top">
                <div className="template_left">
                    <span className="template_left_title">Новая форма</span>
                </div>
            </div>
            <div className="template_body">
                <div className="card" onClick={createForm}>
                    <img src={BaseTemplateCardIcon} alt="" className="card_image"/>
                    <p className="card_title">Пустая форма</p>
                </div>
            </div>
        </div>
    );
}