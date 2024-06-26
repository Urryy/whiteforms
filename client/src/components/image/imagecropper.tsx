import { Delete, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, MoreVert } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { FC } from "react";
import { useResizable } from "../../hooks/useResizable";
import './imagecropper.css';

interface ImageCropperProps{
    imageData: string | undefined | null,
    formattedImage: (type: string) => void,
    handleDeleteImage: () => void,
    setValue: (height: string, width: string) => void
}

export const ImageCropper: FC<ImageCropperProps> = ({imageData, formattedImage, handleDeleteImage, setValue}) => {
    const [ref] = useResizable({setValue});
    function getValue(value: string | null | undefined){
        if(value){
            return value;
        }
        return "";
    }

    function openNavigationTool(){
        let navigationTool = document.getElementById('navigation_tool') as HTMLElement;
        navigationTool.classList.remove('display-none');
    }

    return <div className="add_image_body"> 
                <div className="body_image" id='body_image'>
                    <div className="input_image_wrapper resizable" ref={ref} id='image_wrapper'>
                        <div className='image_tools'>
                            <IconButton onClick={openNavigationTool}>
                                <MoreVert />
                            </IconButton>
                        </div>
                        <div className='image_tools_navigation display-none' id='navigation_tool'>
                            <Button fullWidth className='tools_navigation_button' onClick={() => formattedImage('left')}><FormatAlignLeft style={{padding: '1px 5px'}}/> Выровнять по левому краю</Button>
                            <Button fullWidth className='tools_navigation_button' onClick={() => formattedImage('center')}><FormatAlignCenter style={{padding: '1px 5px'}}/> Выровнять по центру</Button>
                            <Button fullWidth className='tools_navigation_button' onClick={() => formattedImage('right')}><FormatAlignRight style={{padding: '1px 5px'}}/> Выровнять по правому краю</Button>
                            <Button fullWidth className='tools_navigation_button' onClick={handleDeleteImage}><Delete style={{padding: '1px 5px'}}/> Удалить</Button>
                        </div>
                        <img alt='no_image' src={getValue(imageData)} />
                        <div className="resizer resizer--r"/>
                        <div className="resizer resizer--b"/>
                    </div>
                </div>
            </div>
}