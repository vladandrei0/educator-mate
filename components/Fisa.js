import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import useImageSize from '../utils/hooks/useImageSize';
import Image from 'next/image'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Chip from '@material-ui/core/Chip'
import { updateFisaStatus } from '../utils/updatelike'
import { useQuery } from 'react-query'
import { client } from '../utils/api-client'
import { Button, Typography } from '@material-ui/core';
import SocialShares from './SocialShares';
import * as colors from '../styles/colors'
import * as mq from '../styles/media-queries'

export default function Fisa({ fisa, userId }) {

    // console.log('fisa', fisa)
    const shareurl = `https://ajutoruleducatorului.ro/fise/${fisa.Domenii.nume}/${fisa.slug}`;
    const { id: fisaId } = fisa
    const queryFisa = {
        userId,
        fisaId
    }
    const { data: data_fisa } = useQuery(
        'data_fisa',
        () => client(`/api/getDataFisa?query=${JSON.stringify(queryFisa)}`),
        {
            refetchOnWindowFocus: false
        }
    )
    const [data, setData] = useState({ liked: false })
    const url = fisa.poza;
    const [width, height] = useImageSize(url);
    const [w, h] = [Math.floor(width / 4), Math.floor(height / 4)];
    // console.log('poza', fisa.poza)
    React.useEffect(() => {
        if (data_fisa) {

            setData(data_fisa)
        }
    }, [data_fisa])

    const handleLikeClick = () => {
        if (data.status) {
            return
        }
        try {
            setData(currentValues => ({
                ...currentValues,
                liked: !data.liked,
                status: true
            }))
            updateFisaStatus({ ...data, itemId: fisaId, liked: !data.liked }).then(res => setData({ ...res, status: false }))
        } catch (error) {
            setData({ error: error.message })
        }
    }
    const handleDownloadclick = () => {
        try {
            updateFisaStatus({ ...data, itemId: fisaId, no_dw: data.no_dw + 1 }).then(res => setData(res))
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <LayoutFisa className='layout'>
            <Typography variant='h3' component='h1'>{fisa.nume}</Typography>
            <SocialShares fisa={fisa} shareurl={shareurl} />
            <div className='wrapper'>

                <span className="heart">
                    {data.error ?
                        <p>A aparut o eroare: {data.error}</p>
                        :
                        <button onClick={handleLikeClick} disabled={data.status}
                            style={{
                                border: 'none',
                                background: 'transparent',
                            }}>
                            {
                                data.liked
                                    ?
                                    <FavoriteRoundedIcon style={{ color: `${colors.pink}` }} />
                                    :
                                    <FavoriteBorderRoundedIcon style={{ color: `${colors.pink}` }} />
                            }
                        </button>}
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

            <Button onClick={handleDownloadclick}
                variant="contained" color="primary" href={fisa.pdf} target="_blank" rel="noreferrer"
            > Descarcă
            </Button>

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