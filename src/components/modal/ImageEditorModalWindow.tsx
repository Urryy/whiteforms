import React, {FC} from "react";
import { Box, Modal } from "@material-ui/core";
import './modal.css';

interface ImageEditorProps{
    setValue: (value: string) => void,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export const ImageEditorModalWindow: FC<ImageEditorProps> = ({setValue, isOpen, setIsOpen}) => {
    
    return (
        <>
        <Modal open={isOpen} onClose={setIsOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className="modal_image_editor">
                faqwefqw
            </Box>
        </Modal>
        </>
    );
}