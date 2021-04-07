import React from 'react'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(15),
        alignItems: 'center',
    },
}))


export const Hero = ({ image, width, height, title, subtitle }) => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <div>
                <Typography variant="h2" component="h1" gutterBottom>{title}</Typography>
                <Typography variant="h3" component="h2" gutterBottom>{subtitle}</Typography>
            </div>
            <div className='image'>
                <Image
                    src={image}
                    width={width}
                    height={height}
                    alt={title} />
            </div>
        </Container>
    )
}
