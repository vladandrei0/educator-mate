import React from 'react'
import styled from 'styled-components'
import useImageSize from '../utils/hooks/useImageSize';
import Image from 'next/image'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import Chip from '@material-ui/core/Chip'
import { ModalContainer, ModalContents, ModalOpenButton } from './Modal'
import LoginForm from './Login'
import RegisterForm from './Register'
import SocialShares from './SocialShares'
import * as colors from '../styles/colors'
import * as mq from '../styles/media-queries'
import { Button, Typography } from '@material-ui/core';

export default function FisaNoUser({ fisa }) {
    const shareurl = `https://ajutoruleducatorului.ro/fise/${fisa.Domenii.nume}/${fisa.slug}`;

    const url = fisa.poza;
    const [width, height] = useImageSize(url);
    const [w, h] = [Math.floor(width / 4), Math.floor(height / 4)];

    return (
        <LayoutFisa className='layout'>
            <Typography variant='h3' component='h1'>{fisa.nume}</Typography>
            <SocialShares shareurl={shareurl} fisa={fisa} />
            <div className='wrapper'>

                <span className="heart">
                    <ModalContainer>
                        <ModalOpenButton>
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <FavoriteBorderRoundedIcon style={{ color: 'red' }} />
                            </button>
                        </ModalOpenButton>
                        <ModalContents aria-label="Login form" title="Login">
                            <LoginForm />
                        </ModalContents>
                    </ModalContainer>
                </span>
                <div className='imageWrapper' >
                    {w > h ? <Image
                        src={fisa.poza || '/ae.jpg'}
                        alt={fisa.nume}
                        width={500}
                        height={353}
                        layout="intrinsic"
                    />
                        : <Image
                            src={fisa.poza || '/ae.jpg'}
                            alt={fisa.nume}
                            width={353}
                            height={500}
                            layout="intrinsic"
                        />}

                </div>
            </div>
            <ul className="tags">
                <li>
                    <div>
                        <Typography variant='overline' component='h4'>Domeniu</Typography>
                        <p style={{ color: `${colors.pink}`, marginTop: 0 }}>{fisa.Domenii.nume.replace(/-/g, ' ')}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <Typography variant='overline' component='h4'>Tema</Typography>
                        <p style={{ color: `${colors.green}`, marginTop: 0 }}>{fisa.Teme?.nume} </p>
                    </div>
                </li>
                <li>
                    <div>
                        <Typography variant='overline' component='h4'>Grupa</Typography>
                        {fisa.grupa_mica
                            ? <p style={{ color: `${colors.indigo}`, marginTop: 0 }}>Grupa mica +</p>
                            : (fisa.grupa_mij
                                ? <p style={{ color: `${colors.indigo}`, marginTop: 0 }}>Grupa mijlocie +</p>
                                : <p style={{ color: `${colors.indigo}`, marginTop: 0 }}>Grupa mica +</p>
                            )}
                    </div>
                </li>
            </ul>
            <div className='login'>
                <Typography variant='h5' gutterBottom>
                    Ca să poți descărca fișa, <br />intră în cont sau crează-ți un cont nou</Typography>
                <ModalContainer>
                    <ModalOpenButton>
                        <Button variant="contained" color='primary'>Am cont</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="Login form" title="Login">
                        <LoginForm />
                    </ModalContents>
                </ModalContainer>
                <ModalContainer>
                    <ModalOpenButton>
                        <Button variant="contained" color='primary'>Imi fac un cont acum</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="Registration form" title="Register">
                        <RegisterForm />
                    </ModalContents>
                </ModalContainer>
            </div>

            <div>
                <Typography variant='h4' gutterBottom>
                    Instrucțiuni</Typography>
                <Typography variant='subtitle2' gutterBottom>{fisa.instructiuni}</Typography>
                <Typography variant='h4' gutterBottom>Materiale</Typography>
                <Typography variant='subtitle2' gutterBottom>{fisa.materiale}</Typography>
                <Typography variant='h4' gutterBottom>Tipul activității:</Typography>

                <span hidden={!fisa.tip_colorat} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Colorat'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_decupat} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Decupat'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_scris} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Scris'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_lipit} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Lipit'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_poezie} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Poezie'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_poveste} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Poveste'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_puzzle} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Puzzle'} size='small' color='secondary' />
                </span>
                <span hidden={!fisa.tip_proiect} style={{ margin: '3px' }}>
                    <Chip variant='outlined' label={'Proiect'} size='small' color='secondary' />
                </span>
            </div>
        </LayoutFisa>
    )
}

const LayoutFisa = styled.div`

    display: grid;
    grid-template-columns: 1fr min(95ch, 100%) 1fr;
    grid-row-gap:10px;
    margin-top:50px;
    margin-bottom:50px;
    justify-items:center;
    > * {
    grid-column: 2;
    }
    ${mq['xsmallAndSmall']}{
        padding-left:30px;
        padding-right:30px;
    }

    .imageWrapper{
        position:relative;
        display:grid;
        place-content:center;
        border: solid 1px ${colors.text};
        border-radius:10px;
        overflow:hidden;
    }
    ul{
        list-style:none;
        display:flex;
        flex-direction:row;
        padding-left:0;
    }
    ul li{
        padding-right:10px;
    }
    ul li:first-child{
        padding-right:20px;
    }
    .share{
        display:flex;
        flex-direction:row;
        justify-content:flex-end;
    }
    .wrapper {
    display:grid;
    justify-content:center;
    }
    .heart{
        /* position:absolute; */
        right:0;
        top:0;
        justify-self:flex-end;
    }
    .tags{
        text-transform: capitalize;
        font-size: x-small;
        display:flex;
        flex-direction:row;
        justify-content:center;
        
    }
    .login{
        display:grid;
        grid-row-gap:10px;
        text-align:center;
    }
    
`