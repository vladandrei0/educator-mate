import Link from 'next/link'
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import theme from '../styles/theme'
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    paper: {
        display: 'grid',
        gridGap:theme.spacing(5),
        justifyContent: 'start',
        padding: '1rem 1rem 1rem 1rem',
        marginTop: theme.spacing(10),
        border: 'solid 1px #594642',
        color: '#594642',
        backgroundColor:'inherit',
    },
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection:'column',
        marginTop: theme.spacing(10),
        backgroundColor:'inherit',
    },
    button: {
        boxShadow: '10px 10px 12px 0 rgba(255, 255, 255, 0.3) inset, -8px -8px 12px 0 rgba(0, 0, 0, .25) inset',
        fontWeight:700,
    }
});

export const Products = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.wrapper}>
                <Typography variant='h3' gutterBottom>
                    O bază de materiale educaționale care crește în fiecare zi și acoperă fiecare temă din an</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant='h3' gutterBottom>Fișe fără pregătire</Typography>
                    <Link href='/fise'>
                        <Button variant='contained' color='primary' className={classes.button}>
                            Explorează și printează
                        </Button>
                    </Link>
                </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant='h3' gutterBottom>Teme săptămânale</Typography>
                    <Link href='/teme'>
                        <Button variant='contained' color='primary' className={classes.button}>Găsește tema</Button>
                    </Link>
                </Paper>
                </Grid>
            </Grid>
        </>
    )
}
