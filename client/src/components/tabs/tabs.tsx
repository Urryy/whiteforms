import { IconButton, Paper, Switch, Tab, Tabs, Typography, makeStyles } from "@material-ui/core";
import React, { FC, ReactNode, useState } from "react";
import { QuestionForm } from "../questionform/questionform";
import { MoreVertOutlined } from "@mui/icons-material";
import '../answerform/answerform.css';
import { QuestionProps } from "../../interfaces/interfaces";
import { FormToolbar } from "../formtoolbar/formtoolbar";
import { AcceptTab } from "../accepttab/accepttab";

interface TabProps{
    children : ReactNode,
    value: number,
    index: number,
    other?: any
}

export interface QuestionFormsProps{
    questions: QuestionProps[],
    setQuestions: (questions: QuestionProps[]) => void,
    isOpenToolbar: boolean,
    setIsOpenToolbar: (value: boolean) => void 
}

const useStyles = makeStyles({
    root: { flexGrow: 1},
    tab: {
        fontSize: 14,
        color: '#5f6368',
        textTransform: 'capitalize',
        height: 10,
        fontWeight: 600,
    },
    tabs:{
        height: 10
    }
})

function TabPanel({children, value, index, other}: TabProps){
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index ? <> {children}</> : ""}
        </div>
    );
}

function allProps(index: number){
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export const CenteredTabs: FC<QuestionFormsProps> = ({questions, setQuestions, isOpenToolbar, setIsOpenToolbar}) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: number) => setValue(newValue);
    return (
        <>
        <Paper className={classes.root}>
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" centered className={classes.tabs}>
                <Tab label="Вопросы" className={classes.tab} {...allProps(0)} />
                <Tab label="Ответы" className={classes.tab} {...allProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <QuestionForm questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <AcceptTab />
            </TabPanel>
        </Paper>
        </>
    )
}