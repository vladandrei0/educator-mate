import React from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ProfileMenu from './ProfileMenu';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        padding: theme.spacing(0, 6, 0),
    },
    grow: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
}));

export default function MobileBottomNav() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.grow}>
                    <Link href='/' passHref>
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Link href='/fise' passHref>
                        <Typography variant='h4' color='inherit'>
                            Fișe
                        </Typography>
                    </Link>
                    <Link href='/teme' passHref>
                        <Typography variant='h4' color='inherit'>
                            Teme
                        </Typography>
                    </Link>
                    <Link href='/blog' passHref>
                        <Typography variant='h4' color='inherit'>
                            Blog
                        </Typography>
                    </Link>
                    <ProfileMenu color='inherit' />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
