import React, { FC } from "react";
import './formheader.css';
import './formheader.css';
import img_icon from '../../assets/forms-icon.png';
import { Button, IconButton } from "@material-ui/core";
import { ColorLens, Redo, RemoveRedEyeOutlined, Undo } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { QuestionFormsProps } from "../tabs/tabs";
import { SendFormModalWindow } from "../modal/SendFormModalWindow";



export const FormHeader: FC<QuestionFormsProps> = ({questions, setQuestions, isOpenToolbar, setIsOpenToolbar}) => {
    const navigate = useNavigate();
    const [isOpenSendWindow, setIsOpenSendWindow] = React.useState(false);

    return (
        <>
        <div className="form_header">
            <div className="form_header_left">
                <IconButton onClick={() => navigate('/')} title="Главный экран Форм" style={{padding: '4px'}}>
                    <img src={img_icon} alt="" className="header_icon_img"/>
                </IconButton>
            </div>
            <div className="form_header_left">
                <IconButton>
                    <Undo className="form_header_icon"/>
                </IconButton>
                <IconButton>
                    <Redo className="form_header_icon"/>
                </IconButton>
                <IconButton onClick={() => setIsOpenToolbar(!isOpenToolbar)}>
                    <ColorLens className="form_header_icon"/>
                </IconButton>
                <IconButton onClick={() => navigate('/response')}>
                    <RemoveRedEyeOutlined className="form_header_icon"/>
                </IconButton>
                <Button variant="contained" color="primary" onClick={() => setIsOpenSendWindow(prev => !prev)}>Отправить</Button>
                {/* <IconButton>
                    <AccountBoxOutlined className="form_header_icon"/>
                </IconButton> */}
            </div>
        </div>
        <SendFormModalWindow isOpen={isOpenSendWindow} setIsOpen={setIsOpenSendWindow} />
        </>
    );
}