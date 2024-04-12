import { Paper, Tab, Tabs, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: { flexGrow: 1},
    tab: {
        fontSize: 14,
        color: '#5f6368',
        textTransform: 'capitalize',
        height: 10,
        fontWeight: 600,
        fontFamily:'Google Sans, Roboto, Arial, sans-serif'
    },
    tabs:{
        height: 10
    }
})

export const CenteredTabs = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Tabs textColor="primary" indicatorColor="primary" centered className={classes.tabs}>
                <Tab label="Вопросы" className={classes.tab}>
                    
                </Tab>
                <Tab label="Ответы" className={classes.tab}>
                    
                </Tab>
            </Tabs>
        </Paper>
    )
}