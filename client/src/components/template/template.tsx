import React from "react";
import './template.css';
import { MoreVert, UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { IconButton } from "@material-ui/core";
import BaseTemplateCardIcon from "../../assets/form-add-blank.png";
import {useNavigate} from 'react-router-dom';

export const Template = () => {
    const navigate = useNavigate();

    function createForm(){
        let id = "b7ae1407-eca6-49df-97d8-3d05b13d7a30";
        navigate("/form/"+id);
    }

    return (
        <div className="template_section">
            <div className="template_top">
                <div className="template_left">
                    <span className="template_left_title">Новая форма</span>
                </div>
                <div className="template_right">
                    <div className="template_right_gallery_button">
                        Галерея форм
                        <UnfoldMore/>
                    </div>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
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