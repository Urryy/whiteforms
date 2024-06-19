import React, { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { FormatBoldOutlined, FormatItalic, FormatUnderlined, Link } from "@mui/icons-material";
import { LinkModalWindow } from "../modal/LinkModalWindow";
import './customizedinput.css';

interface CustomizedInputProps{
    id: string
    standardClassName: string,
    classNames: string[],
    setClassNames: (value: string[]) => void,
    inputText: string,
    setInputText: (value: string) => void,
    fontSize: string,
    fontFamily: string,
    dataText?: string
}

export const CustomizedInput: FC<CustomizedInputProps> = ({ id, standardClassName, classNames, setClassNames, inputText, setInputText, fontFamily, fontSize, dataText }) => {
    const [isOpenLinkModal, setIsOpenLinkModal] = useState(false);
    const [isShowToolbar, setIsShowToolbar] = useState(false);
    
    const addModification = (className: string) => {
        if(classNames.includes(className)){
            var classes = classNames.filter(i => i !== className);
            setClassNames(classes);
        }else{
            setClassNames([...classNames, className])
        }
    }
    
    const setLink = (value: string) => {
        let elementText = inputText + value;
        setInputText(elementText);
    }

    const handleBlur = (e: React.FocusEvent<HTMLElement, Element>) => {
        const currentTarget = e.currentTarget;

        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                if (currentTarget.parentNode) {
                    const children = currentTarget.children;

                    let input = children[0] as HTMLElement;
                    if(input.id === id){
                        setInputText(input.innerHTML);
                    }

                    if (children.length > 1) {
                        setIsShowToolbar(prev => !prev);
                    }
                }
            }
        });
    }

    return <>
        <div className={"input_tool "+id} onBlur={handleBlur}>
            <div role="input" id={id} className={`${standardClassName} `+ classNames?.join(" ")} contentEditable="true" style={{fontFamily: fontFamily, fontSize: `${fontSize}pt`}} 
                dangerouslySetInnerHTML={{__html: inputText}} onClick={() => setIsShowToolbar(prev => !prev)} data-text={dataText}>
            </div>
            {isShowToolbar && <div>
                <IconButton onClick={() => addModification('bold_text')} className="tool_btn"><FormatBoldOutlined className="icon_formatted"/></IconButton>
                <IconButton onClick={() => addModification('underline_text')} className="tool_btn"><FormatUnderlined className="icon_formatted"/></IconButton>
                <IconButton onClick={() => addModification('italic_text')} className="tool_btn"><FormatItalic className="icon_formatted"/></IconButton>
                <IconButton onClick={() => setIsOpenLinkModal(prev => !prev)} className="tool_btn"><Link className="icon_formatted"/></IconButton>
            </div>}
        </div>
        <LinkModalWindow isOpen={isOpenLinkModal} setIsOpen={setIsOpenLinkModal} setUri={setLink}/>
    </>
}