import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    avatars: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    profile: {
        width: theme.spacing(47),
        height: theme.spacing(47),
        margin: 'auto',
        marginBottom: theme.spacing(5),
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));



const allAvatars = ["/avatars/0.jpg", "/avatars/1.jpg", "/avatars/2.jpg", "/avatars/3.jpg", "/avatars/4.jpg"]


export default function ImageAvatars({ setFormValues, formValues }) {
    const classes = useStyles();
    const handleClick = (e) => {
        setFormValues(curr => ({
            ...curr,
            avatar: e.currentTarget.id,
        }))
    }

    return (
        <div className={classes.root}>
            <Avatar alt="Love cat" src={`/avatars/${formValues.avatar}.jpg`} className={classes.profile} />
            <Container maxWidth='xs' className={classes.avatars}>
                {allAvatars
                    .map((avatar, index) => {
                        return (
                            <IconButton onClick={(e) => handleClick(e)} key={avatar} id={index}>
                                <Badge color="primary"
                                    invisible={avatar !== `/avatars/${formValues.avatar}.jpg`}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                >
                                    <Avatar alt="Dog" src={avatar} className={classes.large} />
                                </Badge>
                            </IconButton>
                        )
                    })}
            </Container>
        </div>
    );
}