import { Box, Button, Divider, SwipeableDrawer, Typography  } from '@material-ui/core';
import './formtoolbar.css';

import React, { FC } from 'react';
import { ColorLens, ImageOutlined } from '@mui/icons-material';
import { SelectFontFamilyToolbar, SelectFontSizeToolbar } from './components/selecttoolbar';
import { useTextContext } from '../../contexts/TextContext';
import { QuestionProps } from '../../interfaces/interfaces';

interface FormToolbarProps{
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    questionsForm: QuestionProps[],
    setQuestionsForm: (value: QuestionProps[]) => void
}

export const FormToolbar: FC<FormToolbarProps> = ({isOpen, setIsOpen, questionsForm, setQuestionsForm}) => {
    const textContext = useTextContext();

    const toggleDrawer = (open: boolean) => 
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if(event && event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')){
            return;
        }

        setIsOpen(open);
    }

    const onChangeFont = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, setState: (value: string) => void, type: string) =>{
        if(event.target.value){
            setState(event.target.value as string);
        }

        if(type === 'kolontitul'){
            let kolontitul = document.querySelector('#DocumentName') as HTMLElement;
            kolontitul.setAttribute('style', `font-family: ${event.target.value as string}`);
        }

        if(type === 'question_text'){
            let questions = document.querySelectorAll('#input_question');
            for (let index = 0; index < questions.length; index++) {
                const element = questions[index] as HTMLElement;
                element.setAttribute('style', `font-family: ${event.target.value as string}`);
            }
            setQuestionStyle("fontFamily", event.target.value as string);
        }

        if(type === 'option_text'){
            let options = document.querySelectorAll('#input_option');
            let documentDesc= document.querySelector('#DocumentDescription');
            for (let index = 0; index < options.length; index++) {
                const element = options[index] as HTMLElement;
                element.setAttribute('style', `font-family: ${event.target.value as string}`);
            }
            setOptionStyle("fontFamily", event.target.value as string);
            documentDesc?.setAttribute('style', `font-family: ${event.target.value as string}`);
        }
    }

    const onChangeSize = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, setState: (value: string) => void, type: string) =>{
        if(event.target.value){
            setState(event.target.value as string);
        }

        if(type === 'kolontitul'){
            let kolontitul = document.querySelector('#DocumentName') as HTMLElement;
            kolontitul.setAttribute('style', `font-size: ${event.target.value as string}pt`);
        }

        if(type === 'question_text'){
            let questions = document.querySelectorAll('#input_question');
            for (let index = 0; index < questions.length; index++) {
                const element = questions[index] as HTMLElement;
                element.setAttribute('style', `font-size: ${event.target.value as string}pt`);
            }
            setQuestionStyle("fontSize", event.target.value as string);
        }

        if(type === 'option_text'){
            let options = document.querySelectorAll('#input_option');
            let documentDesc= document.querySelector('#DocumentDescription');
            for (let index = 0; index < options.length; index++) {
                const element = options[index] as HTMLElement;
                element.setAttribute('style', `font-size: ${event.target.value as string}pt`);
            }
            documentDesc?.setAttribute('style', `font-size: ${event.target.value as string}pt`);
            setOptionStyle('fontSize', event.target.value as string);
        }
    }

    function setOptionStyle(type: string, value: string){
        let newQuestions = [...questionsForm];
        if(type === 'fontSize'){
            for (let index = 0; index < newQuestions.length; index++) {
                const options = newQuestions[index].options;
                for (let indexOpt = 0; indexOpt < options.length; indexOpt++) {
                    options[indexOpt].elementStyle = {...options[indexOpt].elementStyle, fontSize: `${value}pt`};
                }
            }
        }

        if(type === 'fontFamily'){
            for (let index = 0; index < newQuestions.length; index++) {
                const options = newQuestions[index].options;
                for (let indexOpt = 0; indexOpt < options.length; indexOpt++) {
                    options[indexOpt].elementStyle = {...options[indexOpt].elementStyle, fontFamily: `${value}`};
                }
            }
        }
        setQuestionsForm(newQuestions);
    }

    function setQuestionStyle(type: string, value: string){
        let newQuestions = [...questionsForm];
        if(type === 'fontSize'){
            for (let index = 0; index < newQuestions.length; index++) {
                newQuestions[index].elementStyle = {...newQuestions[index].elementStyle, fontSize: `${value}pt`};
            }
        }

        if(type === 'fontFamily'){
            for (let index = 0; index < newQuestions.length; index++) {
                newQuestions[index].elementStyle = {...newQuestions[index].elementStyle, fontFamily: `${value}`};
            }
        }
        setQuestionsForm(newQuestions);
    }

    function drawerUI(){
        return (<>
            <Box className='box_form_toolbar' role="presentation" onKeyDown={toggleDrawer(false)}>
                <div className='toolbar_header'>
                    <ColorLens className="toolbar_icon" />
                    <span style={{fontWeight: 600}}>Тема</span>
                </div>
                <Divider />
                <div className='toolbar_body_tool'>
                    <Typography style={{fontWeight: 600}}>Стиль текста</Typography>
                    <div className='toolbar_body_tool_item'>
                        <Typography className='toolbar_item_title'>Верхний колонтитул</Typography>
                        <div className='toolbar_body_select'>
                            <SelectFontFamilyToolbar value={textContext.fontKolontitul} onEvent={onChangeFont} type='kolontitul' setState={textContext.setFontKolontitul}/>
                            <SelectFontSizeToolbar value={textContext.sizeKolontitul} onEvent={onChangeSize} type='kolontitul' setState={textContext.setSizeKolontitul}/>
                        </div>
                    </div>
                    <div className='toolbar_body_tool_item'>
                        <Typography className='toolbar_item_title'>Вопрос</Typography>
                        <div className='toolbar_body_select'>
                            <SelectFontFamilyToolbar value={textContext.fontQuestionText} onEvent={onChangeFont} type='question_text' setState={textContext.setFontQuestionText}/>
                            <SelectFontSizeToolbar value={textContext.sizeQuestionText} onEvent={onChangeSize} type='question_text' setState={textContext.setSizeQuestionText}/>
                        </div>
                    </div>
                    <div className='toolbar_body_tool_item'>
                        <Typography className='toolbar_item_title'>Текст</Typography>
                        <div className='toolbar_body_select'>
                            <SelectFontFamilyToolbar value={textContext.fontOptionText} onEvent={onChangeFont} type='option_text' setState={textContext.setFontOptionText}/>
                            <SelectFontSizeToolbar value={textContext.sizeOptionText} onEvent={onChangeSize} type='option_text' setState={textContext.setSizeOptionText}/>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='toolbar_image_tool'>
                    <Typography className='toolbar_item_title' style={{fontWeight: 600}}>Верхний колонтитул</Typography>
                    <Button variant="outlined" className='toolbar_item_image'><ImageOutlined style={{marginRight: '15px'}}/> Выберите изображение</Button>
                </div>
                <Divider />
                <div className='toolbar_color_tool'>
                    <Typography className='toolbar_item_title' style={{fontWeight: 600}}>Цвет</Typography>
                    <div className='toolbar_item_pallete_color'>
                        <div className='pallete_color' id='colordb4437'><button className='button_color'></button></div>
                        <div className='pallete_color' id="color673ab7"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color3f51b5"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color4285f4"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color03a9f4"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color00bcd4"><button className='button_color'></button></div>
                        <div className='pallete_color' id="colorff5722"><button className='button_color'></button></div>
                        <div className='pallete_color' id="colorff9800"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color009688"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color4caf50"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color607d8b"><button className='button_color'></button></div>
                        <div className='pallete_color' id="color9e9e9e"><button className='button_color'></button></div>
                    </div>
                </div>
            </Box>
        </>)
    }

    return (
        <>
        <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}>
                {drawerUI()}
          </SwipeableDrawer>
        </>
    );
}