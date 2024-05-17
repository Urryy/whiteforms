import './modal.css';

import { Box, Button, Input, Modal, TextField, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { QuestionProps } from '../../interfaces/interfaces';

interface LinkModalWindowProps{
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    linkModalModel: LinkModalModelProps | null | LinkModalModelQuestionProps
}

export interface LinkModalModelProps{
    element: string,
    setElement: (value: string) => void
}

export interface LinkModalModelQuestionProps{
    indexQuestion: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const LinkModalWindow: FC<LinkModalWindowProps> = ({isOpen, setIsOpen, linkModalModel}) => {
    const [link, setLink] = React.useState('');
    const [linkText, setLinkText] = React.useState('');

    function isStandardElement(value: LinkModalModelProps | LinkModalModelQuestionProps): value is LinkModalModelProps{
        return (value as LinkModalModelProps).element !== undefined;
    }

    function addLink(){
        if(!link || !linkText || !linkModalModel)
            return;

        if(isStandardElement(linkModalModel)){
            let model = linkModalModel as LinkModalModelProps;
            let elementWithLink = model.element + ` <a href=${link} target="_blank">${linkText}</a>`;
            model.setElement(elementWithLink);
            setIsOpen(false);
        }else{
            let model = linkModalModel as LinkModalModelQuestionProps;
            let newQues = [...model.questions];
            newQues[model.indexQuestion].questionText += ` <a href=${link} target="_blank">${linkText}</a>`;
            model.setQuestions(newQues);
            setIsOpen(false);
        }
    }

    return (
        <Modal open={isOpen} onClose={setIsOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='modal_link'>
                <header>
                    <Typography className="link_modal_title" variant="h6" component="h2">
                        Добавление ссылки
                    </Typography>
                </header>
                <div className='link_modal_body'>
                    <TextField onChange={(e) => setLinkText(e.target.value)} value={linkText} className='link_input' 
                    label='Отображаемый текст' style={{marginBottom: '25px'}}/>
                    <TextField onChange={(e) => setLink(e.target.value)} value={link} className='link_input'
                    label='Ссылка'/>
                </div>
                <footer>
                    <div className="modal_buttons">
                        <Button onClick={() => setIsOpen(false)}>Отмена</Button>
                        <Button style={{color: '#0c73fb'}} onClick={addLink}>ОК</Button>
                    </div>
                </footer>
            </Box>
        </Modal>
    )
}