import React, { FC } from "react";
import './formheader.css';
import './formheader.css';
import img_icon from '../../assets/forms-icon.png';
import { Button, IconButton } from "@material-ui/core";
import { AccountBoxOutlined, ColorLens, Redo, RemoveRedEyeOutlined, Undo } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../reduce/stateprovider";
import { QuestionProps } from "../../interfaces/interfaces";
/* import useHistoryState from "../../hooks/useHistoryState"; */
import { QuestionFormsProps } from "../tabs/tabs";
import { red } from "@material-ui/core/colors";
import { useFormContext } from "../../contexts/FormContxet";
import { SendFormModalWindow } from "../modal/SendFormModalWindow";



export const FormHeader: FC<QuestionFormsProps> = ({questions, setQuestions, isOpenToolbar, setIsOpenToolbar}) => {
    const navigate = useNavigate();
    const [isOpenSendWindow, setIsOpenSendWindow] = React.useState(false);
    const [{doc_name}, dispatch] = useStateValue();
    //const [state, setState, undo, redo, history, pointer]  = useHistoryState<QuestionFormsProps>({questions, setQuestions});

    return (
        <>
        <div className="form_header">
            <div className="form_header_left">
                <img src={img_icon} alt="" className="header_icon_img"/>
                {/* <input type="text" placeholder="Неизвестная форма" className="form_name" value={doc_name}/> */}
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
                <IconButton>
                    <AccountBoxOutlined className="form_header_icon"/>
                </IconButton>
            </div>
        </div>
        <SendFormModalWindow isOpen={isOpenSendWindow} setIsOpen={setIsOpenSendWindow} />
        </>
    );
}