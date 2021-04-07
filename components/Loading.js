import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(7),
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress color='primary' />
        </div>
    );
}