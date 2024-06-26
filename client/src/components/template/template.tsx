import React, { useRef } from "react";
import './template.css';
import { MoreVert, UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { IconButton } from "@material-ui/core";
import BaseTemplateCardIcon from "../../assets/form-add-blank.png";
import {useNavigate} from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Template = () => {
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.to('.template_section', { opacity: 1, delay: 2 })
    }, [])

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