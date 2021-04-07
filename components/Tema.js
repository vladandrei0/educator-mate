import RenderSheets from './RenderSheets'
import { updateTemaStatus } from '../utils/updatelike'
import styled from 'styled-components'
import * as mq from '../styles/media-queries'
import { Typography } from '@material-ui/core'
import React from 'react'

export default function Tema({ tema, userId }) {

    const { nume, id, descriere, Fisa } = tema
    const fise = Array.from(Fisa)
    // console.log('fisa in Tema', tema)
    React.useEffect(() => {
        if (userId && id) {
            updateTemaStatus({ userId, itemId: id })
        }
    }, [])
    return (
        <LayoutTema>
            <Typography variant="h2" component="h1" >{nume}</Typography>
            <Typography variant="h3" component="h2" >{descriere} </Typography>
            <RenderSheets fiseDinQuery={fise}
                userId={userId}
                randamTeme={true}
            />
        </LayoutTema>
    )
}

const LayoutTema = styled.div`
    display: grid;
    grid-template-columns: 1fr min(95ch, 100%) 1fr;
    margin-top:50px;
    margin-bottom:50px;
    > * {
    grid-column: 2;
    }
    ${mq['xsmallAndSmall']}{
        padding-left:30px;
        padding-right:30px;
    }
    h1{
        text-transform:capitalize;
        margin-bottom:30px;
    }
    h2{
        margin-bottom:50px;
        margin-bottom:30px;
    }
`