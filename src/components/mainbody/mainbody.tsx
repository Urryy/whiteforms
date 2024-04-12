import React from "react";
import './mainbody.css';
import { IconButton } from "@material-ui/core";
import { FolderOpen, MoreVert, Storage } from "@mui/icons-material";
//import doc_image from '../../assets/'
export const MainBody = () => {
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
                <div className="doc_card">
                    <img  className="doc_image" alt=""/>
                    <div className="doc_card-content">
                        <h5></h5>
                        <div className="doc_content">
                            <div className="content_left">
                                <Storage className="icon_doc"/>
                            </div>
                            <MoreVert className="icon_morevert"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}