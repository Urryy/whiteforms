import { MoreVertOutlined } from "@mui/icons-material";
import { IconButton, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './accepttab.css';
import { useFormContext } from "../../contexts/FormContxet";
import { createAPIEndpointService } from "../../services/ApiService";
import { useSnackbar } from "notistack";


export const AcceptTab = () => {
    const [countResponse, setCountResponse] = useState('');
    const [checked, setChecked] = useState(false);
    const formContext = useFormContext();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if(formContext.formId){
            let srvcApi = createAPIEndpointService('answerform/response/count');
            srvcApi.fetchById(formContext.formId)
            .then(res => {
                if(res.status === 200 && res.data){
                    setCountResponse(res.data.answerString);
                    setChecked(res.data.state);
                }
            })
            .catch()
        }
    }, [])

    const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if(formContext.formId){
            let srvcApi = createAPIEndpointService(`form/${formContext.formId}/state/accept?state=${checked}`);
            srvcApi.fetch()
            .then(res => {
                if(res.status === 200){
                    enqueueSnackbar('Успешно изменено', {variant: 'success'});
                    setChecked(checked);
                }else{
                    enqueueSnackbar('Упс, что-то пошло не так', {variant: 'error'});
                }
            })
            .catch(err => console.log(err))
        }else{
            enqueueSnackbar('Сохраните форму', {variant: 'warning'});
        }
    }

    return <>
    <div className="submit">
        <div className="user_form">
            <div className="user_form_section">
                <div className="user_form_questions" style={{display: 'flex', flexDirection: 'column', marginBottom: '20px'}}>
                    <div className="accept_wrapper">
                        <div>
                            <p className="accepts">{countResponse}</p>
                        </div>
                        <div>
                            <div className="switch_accept">
                                <span>Ответы принимаются</span> 
                                <Switch color="primary" size="small" onChange={onSwitchChange} checked={checked}/>
                            </div>
                        </div>
                    </div>
                    <div className="user_footer">
                        FORMS
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}