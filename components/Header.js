import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MobileBottomNav from './MobileBottomNav';
import ProfileMenu from './ProfileMenu';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    padding: theme.spacing(0, 6, 0),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function Header() {
  const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="sticky" color='transparent' elevation={2} className={classes.appBar}>
                <Toolbar >
                    <Link href='/' passHref >
                        <IconButton edge="start">
                            <Image src="/logoAE.png" width="60" height="60" alt='logo Ajutorul Educatorului' />
                        </IconButton>
                    </Link>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link href='/fise' passHref>
                            <MenuItem>
                                <Typography variant='h4' color='primary'>
                                    Fișe
                                </Typography>
                            </MenuItem>
                        </Link>
                        <Link href='/teme' passHref>
                            <MenuItem>
                                <Typography variant='h4' color='primary'>
                                    Teme
                                </Typography>
                            </MenuItem>
                        </Link>
                        <Link href='/blog' passHref>
                            <MenuItem>
                                <Typography variant='h4' color='primary'>
                                    Blog
                                </Typography>
              </MenuItem>
            </Link>
            <ProfileMenu />
          </div>
          <div className={classes.sectionMobile}>
            <ProfileMenu />
            <MobileBottomNav />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
