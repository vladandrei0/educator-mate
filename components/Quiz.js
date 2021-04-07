// https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/

import { Box, Button, Container } from '@material-ui/core';
import React, { useState } from 'react';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomizedSteppers from './CustomizedSteppers';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minWidth: 300,
        maxWidth: '100%',
        justifyContent: 'center',
        background: props => props.background,
        height: '100vh',
        maxHeight: '100vh !important',
    },
    start: {
        background: theme.palette.warning.main,
        color: 'white',
        '&:hover': {
            background:theme.palette.warning.dark,
        }
    },
    image: {
        position: 'relative',
        height: 400,
        width: '40% !important', // Overrides inline-style
        marginTop: theme.spacing(10),
        '&:hover, &$focusVisible': {
            zIndex: 1,

        },
    },
    focusVisible: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 40%',
    },
}));

export default function Quiz({ props }) {
    const questions = [
        {
            questionText: 'Alege casa mai scundă',
            answerOptions: [
                { answerText: 'Casa inalta', url: './testComparatii/casaScunda-true.png' , isCorrect: true },
                { answerText: 'Casa scunda', url: './testComparatii/casaScunda-false.png', isCorrect: false },
            ],
        },
        {
            questionText: 'Alege căpsuna mai mare',
            answerOptions: [
                { answerText: 'Capsuna mare', url: './testComparatii/capsunaMare-true.png' , isCorrect: true },
                { answerText: 'Capsuna mica', url: './testComparatii/capsunaMare-false.png', isCorrect: false },
            ],
        },
        {
            questionText: 'Alege copacul mai înalt',
            answerOptions: [
                { answerText: 'Copac scund', url: './testComparatii/copacInalt-false.png', isCorrect: false },
                { answerText: 'Copac inalt', url: './testComparatii/copacInalt-true.png', isCorrect: true },
            ],
        },
        {
            questionText: 'Care animal are gâtul mai lung?',
            answerOptions: [
                { answerText: 'Gat scurt', url: './testComparatii/gatLung-false.png', isCorrect: false },
                { answerText: 'Gat lung', url: './testComparatii/gatLung-true.png', isCorrect: true },
            ],
        },
        {
            questionText: 'Care pisică este mai mare?',
            answerOptions: [
                { answerText: 'Pisica mare', url: './testComparatii/pisicaMare-true.png', isCorrect: true },
                { answerText: 'Pisica mica', url: './testComparatii/pisicaMare-false.png', isCorrect: false },
            ],
        },
        {
            questionText: 'Care pasăre este mai mică?',
            answerOptions: [
                { answerText: 'pasare mai mare', url: './testComparatii/pasareMica-false.png', isCorrect: false },
                { answerText: 'pasare mai mica', url: './testComparatii/pasareMica-true.png', isCorrect: true },
            ],
        },
        {
            questionText: 'Care cerc este mai mare?',
            answerOptions: [
                { answerText: 'cerc mare', url: './testComparatii/cercMare-true.png', isCorrect: true },
                { answerText: 'cerc mic', url: './testComparatii/cercMare-false.png', isCorrect: false },
            ],
        },
        {
            questionText: 'Care pătrat este mai mic?',
            answerOptions: [
                { answerText: 'patrat mare', url: './testComparatii/patratMic-false.png', isCorrect: false },
                { answerText: 'patrat mic', url: './testComparatii/patratMic-true.png', isCorrect: true },
            ],
        },
        {
            questionText: 'Alege floarea mai mare',
            answerOptions: [
                { answerText: 'Floare mica', url: './testComparatii/floareMare-false.png', isCorrect: false },
                { answerText: 'Floare mare', url: './testComparatii/floareMare-true.png', isCorrect: true },
            ],
        },
        {
            questionText: 'Alege fetiță cu părul scurt',
            answerOptions: [
                { answerText: 'fetita par scurt', url: './testComparatii/parScurt-true.png', isCorrect: true },
                { answerText: 'fetita par lung', url: './testComparatii/parScurt-false.png', isCorrect: false },
            ],
        },
        {
            questionText: 'Alege robotul mai înalt',
            answerOptions: [
                { answerText: 'fetita par lung', url: './testComparatii/robotMare-false.png', isCorrect: false },
                { answerText: 'fetita par scurt', url: './testComparatii/robotMare-true.png', isCorrect: true },
            ],
        },
        {
            questionText: 'Alege animalul cu urechile mai mari',
            answerOptions: [
                { answerText: 'fetita par scurt', url: './testComparatii/urechiMari-true.png', isCorrect: true },
                { answerText: 'fetita par lung', url: './testComparatii/urechiMari-false.png', isCorrect: false },
            ],
        },
        
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [startTest, setStartTest] = useState(true)

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    const classes = useStyles(props);
    return (
        <Container className={classes.root}>
            {startTest ?
                <Grid container
                    style={{
                        background: '#37B6FF',
                    }}
                >
                    <Grid item
                        container
                        spacing={5}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant='h4' style={{ color: 'white' }}  >
                                <Box color='primary.main.contrastText'>
                                    Testeaza abilitatea
                            </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h2' style={{ color: 'white' }} >
                                Comparații
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3' style={{ color: 'white' }}>
                                Clara
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' className={classes.start}
                                onClick={() => setStartTest(false)}>Start
                        </Button>
                        </Grid>
                        <Grid item>
                            <Image src='/testComparatii/testComparatii.png' width="500" height="500" />
                        </Grid>
                    </Grid>
                </Grid>
                : (showScore ? (
                    <Grid container
                        spacing={10}
                        direction="column"
                        justify="flex-start"
                        alignItems="center">
                        <Grid item>
                            <Image src='/star.png' width="200" height="200" />
                        </Grid>
                        <Grid item>
                            <Typography variant='h3'>
                                Ai știut {score} din {questions.length} întrebări!
                            </Typography>
                        </Grid>
                        <Grid container item
                            spacing={10}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid item>
                                <Button variant='contained' className={classes.start}
                                    onClick={() => window.location.reload()}>Reia testul
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary'>Arată-mi sugestiile</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                ) : (
                    <Grid container
                        spacing={10}
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <Grid>
                            <Typography variant='h3' style={{ marginBottom: 10 }}>
                                <span>Întrebarea {currentQuestion + 1}</span> din {questions.length}
                            </Typography>
                        </Grid>
                            <CustomizedSteppers steps={questions} activeStep={ currentQuestion}/>
                        <Grid item>
                            <Typography variant='h2'>{questions[currentQuestion].questionText}</Typography>
                        </Grid>
                        <Grid container item
                            spacing={10}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                <ButtonBase
                                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                    focusRipple
                                    key={index}
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                >
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                            backgroundImage: `url(${answerOption.url})`,
                                        }}
                                    />
                                </ButtonBase>
                            ))}
                        </Grid>
                    </Grid>
                ))}
        </Container>
    );
}