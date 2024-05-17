import './modal.css';

import React, { FC } from "react";
import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';

interface ImageInsertProps{
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    addImage: (value: string) => void
}

export const ImageInsertModalWindow: FC<ImageInsertProps> = ({isOpen, setIsOpen, addImage}) => {

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || '';
            addImage(imageUrl);
            setIsOpen(!isOpen);
        })
        reader.readAsDataURL(file);
    }


    return (
        <>
        <Modal open={isOpen} onClose={setIsOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='modal_image_insert'>
                <header className='header_modal'>
                    <Typography className="image_insert_modal_title" variant="h6" component="h2">
                        Вставка изображения
                    </Typography>
                    <div className='image_insert_modal_close' onClick={() => setIsOpen(!isOpen)}>
                        X
                    </div>
                </header>
                <div className='image_insert_modal_body '>
                    <label htmlFor="images" className="drop-container" id="dropcontainer">
                        <input type='file' id='images'
                            accept='image/*'
                            onChange={onSelectFile}
                            className=''/>
                        <span className="drop-title">или перетащите файл сюда</span> 
                    </label>
                    
                </div>
            </Box>
        </Modal>
        </>
    );
}