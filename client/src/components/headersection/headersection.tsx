import React from "react";
import { Header } from "../header/header";
import { Template } from "../template/template";

export const HeaderSection = () => {
    return (
        <>
            <section className="header_section">
                <Header />
                <Template />
            </section>
        </>
    )
}