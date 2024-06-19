import { Clear } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import React, { FC, LegacyRef, RefObject, useRef, useState } from "react";
import { useFormContext } from "../../contexts/FormContxet";
import { useSnackbar } from "notistack";

interface SendFormModalProps{
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export const SendFormModalWindow: FC<SendFormModalProps> = ({ isOpen, setIsOpen }) => {
    const linkRef = useRef<HTMLInputElement>(null);
    const { enqueueSnackbar } = useSnackbar();
    const formContext = useFormContext();
    
    let uri = `http://localhost:3000/filling/form/${formContext.formId}`;
    const handleOnCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
        enqueueSnackbar('Успешно скопировано!', {variant: 'success'});
        linkRef.current?.select();
        document.execCommand('copy');
        (e.target as HTMLButtonElement).focus();     
    }

    return (
        <>
            <Modal open={isOpen} onClose={setIsOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className='modal_copy'>
                    <header className='modal_header_copy'>
                        <Typography className="copy_modal_title" variant="h6" component="h2">
                            Отправить
                        </Typography>
                        <IconButton onClick={() => setIsOpen(false)}>
                            <Clear />
                        </IconButton>
                    </header>
                    <p className="copy_modal_body_title">
                        Ссылка
                    </p>
                    <div className='copy_modal_body'>
                        {formContext.formId !== '' 
                            ? <TextField id="input_link" multiline maxRows={4} variant="standard" fullWidth inputRef={linkRef} value={uri}/>
                            : <p>Форма была не сохранена</p>}
                    </div>
                    <footer>
                        <div className="modal_buttons">
                            <Button style={{color: 'gray'}} onClick={() => setIsOpen(false)}>Отмена</Button>
                            <Button style={{color: '#0c73fb'}} onClick={handleOnCopy}>Копировать</Button>
                        </div>
                    </footer>
                </Box>
            </Modal>
        </>
    )
}