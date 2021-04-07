import React, { useState, useContext, useEffect } from "react"
import { useRouter } from 'next/router'
import { FirebaseContext } from '../components/Firebase'
import { createPrismaUser } from '../utils/createPrismaUser'
import { Container } from '../components/Container'
import { ErrorMessage } from '../components/utils/lib'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        marginTop: theme.spacing(10),
    },
}));

const Login = () => {
    const classes = useStyles();
    const router = useRouter()
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        status: 'idle',
        error: null
    })
    const [errorMessage, setErrorMessage] = useState('');
    const { firebase, user } = useContext(FirebaseContext);

    // console.log(router.asPath);
    let url;
    if (router.asPath === '/login') {
        url = '/'
    } else {
        url = router.asPath;
    }

    let isMounted = true;

    useEffect(() => {
        return () => {
            isMounted = false;
        }
    }, [user])

    function handleSubmit(e) {
        e.preventDefault();
        setFormValues(currentValues => ({
            ...currentValues,
            status: 'pending'
        }))
        firebase.login({ email: formValues.email, password: formValues.password })
            .then(() => {
                setFormValues({ status: 'resolved' })
                // router.push(url)
            })
            .catch(error => {
                if (isMounted) {
                    setErrorMessage(error.message);
                    setFormValues({ status: 'rejected' })
                }
            })
    }

    const handleInputChange = (e) => {
        e.persist();
        setErrorMessage('')
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmitGoogle = (e) => {
        e.preventDefault();
        setFormValues({ status: 'pending' })
        firebase.doSignInWithGoogle()
            .then(async (result) => {
                await createPrismaUser({
                    email: result.user.email,
                    username: result.user.displayName,
                    fbuid: result.user.uid
                })
            })
            .then(() => {
                setErrorMessage(null)
                setFormValues({ status: 'resolved' })
            })
            .catch(error => {
                if (isMounted) {
                    setErrorMessage(error.message);
                    setFormValues({ status: 'rejected' })
                }
            })
    }
    const handleSubmitFacebook = (e) => {
        e.preventDefault();
        setFormValues({ status: 'pending' })

        firebase.doSignInWithFacebook()
            .then(async (result) => {
                await createPrismaUser({
                    email: result.user.email,
                    username: result.user.displayName,
                    fbuid: result.user.uid
                })
            })
            .then(() => {
                setErrorMessage(null)
                setFormValues({ status: 'resolved' })

            })
            .catch(error => {
                if (isMounted) {
                    setErrorMessage(error.message);
                    setFormValues({ status: 'rejected' })
                }
            })
    }
    if (formValues.status === 'idle') {
        return (
            <Container>
                <div className={classes.root}>
                    <Grid container spacing={4}>
                        <Grid item container justify="center" alignItems="center">
                            <Grid item xs={12} sm={7} md={6} style={{ width: '100%' }}>
                                <form onSubmit={handleSubmitGoogle}>
                                    <Button type='submit' variant="contained" color="primary"
                                        size="small" fullWidth={true}>
                                        Intră în cont cu Google</Button>
                                </form>
                            </Grid>
                        </Grid>
                        <Grid item container justify="center" alignItems="center">

                            <Grid item xs={12} sm={7} md={6} style={{ width: '100%' }}>
                                <form onSubmit={handleSubmitFacebook}>
                                    <Button type='submit' variant="contained" color="primary"
                                        size="small" fullWidth={true}>
                                        Intră în cont cu Facebook</Button>
                                </form>
                            </Grid>
                        </Grid>
                        <Grid item container justify="center" alignItems="center">
                            <Grid item xs={12} sm={7} md={6} style={{ width: '100%' }}>
                                <form onSubmit={handleSubmit} style={{position:'relative', zIndex:0,}}>
                                    <TextField fullWidth
                                        margin='dense'
                                        id="email"
                                        label="email" variant="outlined"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="email"
                                    />
                                    <TextField fullWidth
                                        margin='dense'
                                        id="password"
                                        label="password" variant="outlined"
                                        value={formValues.password}
                                        name="password"
                                        type="password"
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="current-password"
                                    />
                                    {!!errorMessage &&
                                        <ErrorMessage > {errorMessage}
                                        </ErrorMessage>}
                                    <Button type='submit' variant="contained" color="primary"
                                        size="small" fullWidth={true}>
                                        Intră în cont cu email</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        )
    }
    if (formValues.status === 'pending') {
        return (
            <Container>
                <Grid container spacing={10}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Typography variant='h3' style={{marginTop:50}}>Bine ai revenit!</Typography>
                    <CircularProgress color='primary' />
                </Grid>
            </Container>

        )
    }
    if (formValues.status === 'resolved') {
        if (url === '/login') {
            router.push('/')
        } else {
            router.push(url)
        }
        return null
    }
    if (formValues.status === 'rejected') {
        return (
            <Container>
                <h6>{errorMessage}</h6>
            </Container>
        );
    }
}

export default Login;