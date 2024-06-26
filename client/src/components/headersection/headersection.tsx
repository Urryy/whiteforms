import React from "react";
import { Header } from "../header/header";
import { Template } from "../template/template";
import { StarsBackground } from "../starsbackground/starsbackground";

export const HeaderSection = () => {
    return (
        <>
            <section className="header_section">
                <StarsBackground />
                <Header />
                <Template />
            </section>
        </>
    )
}