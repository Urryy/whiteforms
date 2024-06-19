import './modal.css';

import { Box, Button, Input, Modal, TextField, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { QuestionProps } from '../../interfaces/interfaces';

interface LinkModalWindowProps{
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    setUri: (value: string) => void
}


export const LinkModalWindow: FC<LinkModalWindowProps> = ({isOpen, setIsOpen, setUri}) => {
    const [link, setLink] = React.useState('');
    const [linkText, setLinkText] = React.useState('');

    const handleOnAddAnchor = () => {
        if(!link || !linkText){
            return;
        }

        setUri(` <a href=${link} target="_blank">${linkText}</a>`)
        setIsOpen(!isOpen);
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
                        <Button style={{color: '#0c73fb'}} onClick={handleOnAddAnchor}>ОК</Button>
                    </div>
                </footer>
            </Box>
        </Modal>
    )
}