import React, { FC } from "react";

import './modal.css';
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Clear, Delete } from "@mui/icons-material";

interface DeleteModalProps{
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    onDelete: (value: string) => void,
    objectId: string
}

export const DeleteModalWindow: FC<DeleteModalProps> = ({isOpen, setIsOpen, objectId, onDelete}) => {

    const handleOnDelete = () => onDelete(objectId);

    return (
        <>
        <Modal open={isOpen} onClose={setIsOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='modal_delete'>
                <header className='modal_header_delete'>
                    <Typography className="delete_modal_title" variant="h6" component="h2">
                        Удаление объекта
                    </Typography>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <Clear />
                    </IconButton>
                </header>
                <div className='delete_modal_body'>
                    <p className="delete_modal_body_title">
                        Вы действительно хотите удалить данный объект?
                    </p>
                </div>
                <footer>
                    <div className="modal_buttons">
                        <Button style={{color: 'gray'}} onClick={() => setIsOpen(false)}>Отмена</Button>
                        <Button style={{color: '#0c73fb'}} onClick={handleOnDelete}>ОК</Button>
                    </div>
                </footer>
            </Box>
        </Modal>
        </>
    )
}