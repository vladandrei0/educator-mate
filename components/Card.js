import React from 'react';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import LikeButton from './LikeButton';
import Link from 'next/link';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import StyledImage from './utils/StyledImage';
import { ModalContainer, ModalContents, ModalOpenButton } from './Modal'
import LoginForm from './Login'
import * as mq from '../styles/media-queries'
import * as colors from '../styles/colors'

export const CardFisa = ({ src, title, userId, itemId, isLiked, updateStatus, fisa }) => {
    // console.log('fisa', fisa)
    return (
        <CardWrapper src={src} key={itemId}>
            <Link href={`/fise/${fisa.Domenii.nume}/${fisa.slug}`} key={fisa.id} passHref>
                <a>
                    <div className="image" tema='false'>
                        <StyledImage 
                            alt={title}
                            src={src}
                        />
                        
                    </div>
                </a>
            </Link>
            <div className="action-bar">
                <div className="action">
                    <Link href={`/fise/${fisa.Domenii.nume}/${fisa.slug}`} key={fisa.id} passHref>
                        <a className='title'>
                            <Typography variant='h4'>
                                {title}
                            </Typography>
                        </a>
                    </Link>
                    <Typography variant='h6'>{fisa.Domenii.nume.replace(/-/g, ' ')} | {fisa.Lectie.nume}</Typography>
                </div>
                {userId ?
                    <LikeButton
                        userId={userId}
                        itemId={itemId}
                        isLiked={isLiked}
                        updateStatus={updateStatus}
                        useLikeKey={['liked', userId]}
                        className='like'
                    />
                    :
                    <span className="heart">
                        <ModalContainer>
                            <ModalOpenButton>
                                <button style={{ border: 'none', background: 'transparent' }}>
                                    <FavoriteBorderRoundedIcon style={{ color: `${colors.pink}` }} />
                                </button>
                            </ModalOpenButton>
                            <ModalContents aria-label="Login form" title="Login">
                                <LoginForm />
                            </ModalContents>
                        </ModalContainer>
                    </span>
                }
            </div>
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    margin-top:10px;
    margin-right:10px;
    margin-bottom:10px;
    height:330px;
    width: 220px;
    border-radius: 12px;
    position:relative;
    background-color: inherit;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    overflow: hidden;
    &:hover {
        cursor: pointer; 
        }
    .image {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block; 
    }
      // default card action bar element
      .action-bar {
        user-select: none;
        position: absolute;
        bottom: 0;
        top: auto;
        left: 0; 
        right: 0;
        background-color:white;
        border-top: 1px solid #594642;
        box-sizing: border-box;
        height: 110px;
        display:grid;
        grid-template-columns: 85% 1fr;
        align-items:center;
        padding:0 10px;
      }
      .action{
        outline: none;
        position: relative;
        display: inline-block;
        justify-content:center;
        align-items:center;
        line-height:1;
        }
        .title{
            font-size:small;
            display:block;
        }
      .small{
          font-size:xx-small;
          margin:0;
      }
      ${mq['xsmallAndSmall']}{
        height:100px;
        width:max(300px, 100%);
        .image{
            top:0;
            left:0;
            width:30%;
            // image overlay
            &:after {
            content: "";
            display: block;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.5);
            top: 0;
            left: 99%;
            height:100%;
            width:2px;
            }
        }
        .action-bar{
            left:30%;
            top:0;
            height:100%;
            border-top: none;
            display:grid;
            padding:0 10px 0 5px;
        }
        .action{
            display:grid;
            grid-row-gap:10px;
        }

    }
`

