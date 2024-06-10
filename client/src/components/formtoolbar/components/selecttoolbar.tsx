import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { FC } from "react";

interface SelectToolbarProps{
    value: string,
    onEvent: (event: React.ChangeEvent<{ name?: string | undefined;value: unknown; }>, setState: (value: string) => void, type: string) => void,
    setState: (value: string) => void,
    type: string
}

export const SelectFontFamilyToolbar: FC<SelectToolbarProps> = ({value, onEvent, setState, type}) =>{
    return (
        <>
            <FormControl variant="filled" size='small' className="select-fontfamily"> 
                <Select labelId='SelectFontFamily-label' id='SelectFontFamily'
                        onChange={(e) => onEvent(e, setState, type)} value={value}>
                    <MenuItem value="Amatic" style={{fontFamily: 'Amatic'}}>Amatic</MenuItem>
                    <MenuItem value="Arial" style={{fontFamily: 'Arial'}}>Arial</MenuItem>
                    <MenuItem value="Caveat" style={{fontFamily: 'Caveat'}}>Caveat</MenuItem>
                    <MenuItem value="Comfortaa" style={{fontFamily: 'Comfortaa'}}>Comfortaa</MenuItem>
                    <MenuItem value="Comic Sans MS" style={{fontFamily: 'Comic Sans MS'}}>Comic Sans MS</MenuItem>
                    <MenuItem value="Courier New" style={{fontFamily: 'Courier New'}}>Courier New</MenuItem>
                    <MenuItem value="EB Garamond" style={{fontFamily: 'EB Garamond'}}>EB Garamond</MenuItem>
                    <MenuItem value="Georgia" style={{fontFamily: 'Georgia'}}>Georgia</MenuItem>
                    <MenuItem value="Impact" style={{fontFamily: 'Impact'}}>Impact</MenuItem>
                    <MenuItem value="Lexend" style={{fontFamily: 'Lexend'}}>Lexend</MenuItem>
                    <MenuItem value="Lobster" style={{fontFamily: 'Lobster'}}>Lobster</MenuItem>
                    <MenuItem value="Lora" style={{fontFamily: 'Lora'}}>Lora</MenuItem>
                    <MenuItem value="Merriweather" style={{fontFamily: 'Merriweather'}}>Merriweather</MenuItem>
                    <MenuItem value="Montserrat" style={{fontFamily: 'Montserrat'}}>Montserrat</MenuItem>
                    <MenuItem value="Oswald" style={{fontFamily: 'Oswald'}}>Oswald</MenuItem>
                    <MenuItem value="Pacifico" style={{fontFamily: 'Pacifico'}}>Pacifico</MenuItem>
                    <MenuItem value="Playfair Display" style={{fontFamily: 'Playfair Display'}}>Playfair Display</MenuItem>
                    <MenuItem value="Roboto, Arial, sans-serif" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>Roboto</MenuItem>
                    <MenuItem value="Roboto Mono" style={{fontFamily: 'Roboto Mono'}}>Roboto Mono</MenuItem>
                    <MenuItem value="Roboto Serif" style={{fontFamily: 'Roboto Serif'}}>Roboto Serif</MenuItem>
                    <MenuItem value="Nunito" style={{fontFamily: 'Nunito'}}>Nunito</MenuItem>
                    <MenuItem value="Spectral" style={{fontFamily: 'Spectral'}}>Spectral</MenuItem>
                    <MenuItem value="Times New Roman" style={{fontFamily: 'Times New Roman'}}>Times New Roman</MenuItem>
                    <MenuItem value="Trebuchet MS" style={{fontFamily: 'Trebuchet MS'}}>Trebuchet MS</MenuItem>
                    <MenuItem value="Verdana" style={{fontFamily: 'Verdana'}}>Verdana</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export const SelectFontSizeToolbar: FC<SelectToolbarProps> = ({ value, onEvent, setState, type}) => {
    return (
        <>
            <FormControl size='small' variant="filled" className="select-fontsize">
                {type === 'kolontitul'
                ? <Select labelId='SelectFontSize-label' id='SelectFontSize'
                    onChange={(e) => onEvent(e, setState, type)} value={value}>
                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="19">19</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem>
                    <MenuItem value="22">22</MenuItem>
                    <MenuItem value="23">23</MenuItem>
                    <MenuItem value="24">24</MenuItem>
                </Select> : 
                type === 'question_text'
                ? <Select labelId='SelectFontSize-label' id='SelectFontSize'
                    onChange={(e) => onEvent(e, setState, type)} value={value}>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem>
                    <MenuItem value="18">18</MenuItem>
                </Select> :
                <Select labelId='SelectFontSize-label' id='SelectFontSize'
                    onChange={(e) => onEvent(e, setState, type)} value={value}>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                </Select>}
            </FormControl>
        </>
    );
}