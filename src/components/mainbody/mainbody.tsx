import React, { useEffect, useState } from "react";
import './mainbody.css';
import { IconButton } from "@material-ui/core";
import { FolderOpen, MoreVert, Storage } from "@mui/icons-material";
import { createAPIEndpointService } from "../../services/ApiService";
import { FormProps, useNavigate } from "react-router-dom";

export const MainBody = () => {
    const [forms, setForms] = useState<FormProps[]>();
    const navigate = useNavigate();
    
    useEffect(() => {
        let srvcApi = createAPIEndpointService("form")
        srvcApi.fetch()
            .then(res =>{
                setForms(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="mainbody">
            <div className="mainbody_top">
                <div className="mainbody_top_left">
                    Недавние формы
                </div>
                <div className="mainbody_top_right">
                    <IconButton>
                        <Storage className="icon_mainbody"/>
                    </IconButton>
                    <IconButton>
                        <FolderOpen className="icon_mainbody"/>
                    </IconButton>
                </div>
            </div>
            <div className="mainbody_docs">
                {forms?.map(form => (
                    <div className="doc_card" onClick={() =>navigate(`/form/${form.id!}`)} key={form.id!}>
                        <img  className="doc_image" alt=""/>
                        <div className="doc_card-content">
                            <h6 className="doc_card_title">{form.name ?? "Неизвестная форма"}</h6>
                            <div className="doc_content">
                                <div className="content_left">
                                    <Storage className="icon_doc"/>
                                </div>
                                <MoreVert className="icon_morevert" style={{fontSize: '25px', color: 'gray'}}/>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    );
}