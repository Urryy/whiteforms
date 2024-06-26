import { useEffect, useState } from "react";
import './mainbody.css';
import { IconButton } from "@material-ui/core";
import { DeleteForever, DeleteSweep, FolderOpen, MoreVert, Storage } from "@mui/icons-material";
import { createAPIEndpointService } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { FormProps } from "../../interfaces/interfaces";
import { DeleteModalWindow } from "../modal/DeleteModalWindow";
import { useGSAP } from "@gsap/react";

export const MainBody = () => {
    const [forms, setForms] = useState<FormProps[]>();
    const [isOpenDeleteWindow, setIsOpenDeleteWindow] = useState(false);
    const [objectId, setObjectId] = useState('');

    const onDelete = (objectId: string) => {
        let srvcApi = createAPIEndpointService("form");
        srvcApi.delete(objectId)
            .then(res => {
                if(res.status === 200){
                    let newForms = [...forms!];
                    setForms(newForms.filter(i => i.id !== objectId));
                }
            })
            .catch(err => console.log(err))
        setIsOpenDeleteWindow(false);
    }

    const navigate = useNavigate();
    
    useEffect(() => {
        let srvcApi = createAPIEndpointService("form")
        srvcApi.fetch()
            .then(res =>{
                setForms(res.data);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
        <div className="mainbody template">
            <div className="mainbody_top">
                <div className="mainbody_top_left">
                    Недавние формы
                </div>
            </div>
            <div className="mainbody_docs">
                {forms ? forms?.map(form => (
                    <div className="doc_card" onClick={() => navigate(`/form/${form.id!}`)} key={form.id!}>
                        <img src={form.previewImage ?? ""} className="doc_image"/>
                        <div className="doc_card_content">
                            <div className="doc_content">
                                <div className="content_left">
                                    <h6 className="doc_card_title">{form.name ?? "Неизвестная форма"}</h6>
                                    <h4 className="doc_card_description">{form.description ?? "Описание"}</h4>
                                </div>
                                <div className="content_right">
                                    <IconButton>
                                        <DeleteSweep className="icon_morevert" style={{fontSize: '25px', padding: '0px'}} 
                                            onClick={(e) => { e.stopPropagation(); setObjectId(form.id!); setIsOpenDeleteWindow(!isOpenDeleteWindow) }}/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <></>}   
            </div>
        </div>
        <DeleteModalWindow isOpen={isOpenDeleteWindow} setIsOpen={setIsOpenDeleteWindow} objectId={objectId} onDelete={onDelete}/>
        </>
    );
}