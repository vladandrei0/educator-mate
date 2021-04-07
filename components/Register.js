import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../components/Firebase'
import { useRouter } from 'next/router'
import { createPrismaUser } from '../utils/createPrismaUser'
import { Container } from './Container'
import { ErrorMessage } from './utils/lib'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Onboarding from './Onboarding'
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        marginTop: theme.spacing(7),
    },
}));

const Register = () => {
    const classes = useStyles();
    const router = useRouter();
    let url = router.asPath;
    const { firebase } = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        rol: '',
        grupa: '',
        varsta: '',
        onboarding: false,
        status: 'idle',
        error: null
    })

    let isMounted = true;

    useEffect(() => {
        return () => {
            isMounted = false;
        }
    }, [])

    const handleInputChange = (e) => {
        e.persist();
        setErrorMessage('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.password === formValues.confirmPassword) {
            setFormValues(currentValues => ({
                ...currentValues,
                status: 'pending'
            }))
            const email = formValues.email.toLowerCase();
            // new Promise(r =>
            //     setTimeout(r, 4000)).then(() => setFormValues({ status: 'resolved' }))
            firebase.register({
                email: email,
                password: formValues.password,
            })
                .then((user) => {
                    createPrismaUser({
                        email: email,
                        username: formValues.username,
                        fbuid: user.user.uid,
                        rol: formValues.rol,
                        grupa: formValues.grupa,
                        varsta: formValues.varsta
                    })
                })
                .then(() => {
                    setErrorMessage(null)
                    setFormValues({ status: 'resolved' })
                })
                .catch(error => {
                    if (isMounted) {
                        setFormValues({ status: 'rejected' })
                        setErrorMessage(error.message)
                    }
                })
        } else {
            setErrorMessage("Password and Confirm don't match")
        }
    }
    const handleSubmitGoogle = (e) => {
        e.preventDefault();
        setFormValues({
            status: 'pending'
        })
        firebase.doSignInWithGoogle()
            .then(async (result) => {
                await createPrismaUser({
                    email: result.user.email,
                    username: result.user.displayName,
                    fbuid: result.user.uid,
                    rol: formValues.rol,
                    grupa: formValues.grupa,
                    varsta: formValues.varsta
                })
            })
            .then(() => {
                setErrorMessage(null)
                setFormValues({ status: 'resolved' })
            })
            .catch(error => {
                if (isMounted) {
                    setFormValues({ status: 'rejected', error });
                    setErrorMessage(error.message)

                }
            })
    }
    const handleSubmitFacebook = (e) => {
        e.preventDefault();
        setFormValues({
            status: 'pending'
        })
        firebase.doSignInWithFacebook()
            .then(async (result) => {
                await createPrismaUser({
                    email: result.user.email,
                    username: result.user.displayName,
                    fbuid: result.user.uid,
                    rol: formValues.rol,
                    grupa: formValues.grupa,
                    varsta: formValues.varsta
                })
            })
            .then(() => {
                setErrorMessage(null)
                setFormValues({ status: 'resolved' })

            })
            .catch(error => {
                if (isMounted) {
                    setFormValues({ status: 'rejected', error })
                    setErrorMessage(error.message)
                }
            })
    }

    if (formValues.status === 'idle') {
        return (
            <Container>
                {!formValues.onboarding ? <Onboarding
                    setFormValues={setFormValues}
                    formValues={formValues} /> : null}
                {formValues.onboarding ?
                    <div className={classes.root}>
                        <Grid container spacing={3}>
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
                                <Grid item xs={12} sm={7} md={6}>
                                    <form onSubmit={handleSubmit} style={{position:'relative', zIndex:0,}}>
                                        <TextField fullWidth
                                            margin='dense'
                                            id='username'
                                            label="nume"
                                            variant="outlined"
                                            type="text"
                                            name="username"
                                            value={formValues.username}
                                            onChange={handleInputChange}
                                            required
                                            autoComplete="username"
                                        />

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
                                            label="parola" variant="outlined"
                                            value={formValues.password}
                                            name="password"
                                            type="password"
                                            onChange={handleInputChange}
                                            required minLength={6}
                                            autoComplete="new-password"
                                        />
                                        <TextField fullWidth
                                            margin='dense'
                                            id="confirmPassword"
                                            label="confirma parola" variant="outlined"
                                            value={formValues.confirmPassword}
                                            name="confirmPassword"
                                            type="password"
                                            onChange={handleInputChange}
                                            required minLength={6}
                                            autoComplete="new-password"
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
                    </div> : null}
            </Container>

        )
    } else if (formValues.status === 'pending') {
        return (
            <Container>
                <Grid container spacing={10}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Typography variant='h3' style={{marginTop:50}}>Imediat se face contul</Typography>
                    <CircularProgress color='primary' />
                </Grid>
            </Container>
        )
    } else if (formValues.status === 'resolved') {
        if (url === '/register') {
            router.push('/')
        } else {
            router.push(url)
        }
        return null
    } else if (formValues.status === 'rejected') {
        return (
            <Container>
                <h6>{errorMessage}</h6>
            </Container>
        );
    }


}

export default Register;