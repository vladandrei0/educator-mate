import Image from 'next/image';
import React from 'react';
import styled from 'styled-components'
import LikeButton from './LikeButton';
import Link from 'next/link';
import { ModalContainer, ModalContents, ModalOpenButton } from './Modal'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import LoginForm from './Login'
import * as colors from '../styles/colors'

const CardTema = ({ title, src, userId, count, slug, temaId, isLikedTema, updateThemeStatus }) => {
    return (
        <CardWrapper key={slug} src={src}>
            <Link href={`/teme/${slug}`} passHref >
                <a>
                    <div className="image">
                        <h2 className="title_tema">{title}</h2>
                        <Image
                            alt={title}
                            src={src}
                            layout="fill"
                            objectfit="cover"
                            objectposition="top center"
                        />
                    </div>
                </a>
            </Link>
            <div className="action-bar">
                <div className="action">
                    <span className="small">{count}</span>
                </div>
                {userId ?
                    <LikeButton
                        userId={userId}
                        itemId={temaId}
                        isLiked={isLikedTema}
                        updateStatus={updateThemeStatus}
                        useLikeKey={['likedthemes', userId]}
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

export default CardTema

const CardWrapper = styled.div`
    margin-top:10px;
    margin-right:10px;
    margin-bottom:10px;
    height:300px;
    width: 200px;
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
        z-index:0;
      // image overlay
          &:after {
          content: "";
          display: block;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.2);
          top: 0;
          left: 0;
          right: 0;
          bottom: 60px; 
          }
    }
      // default card action bar element
      .action-bar {
        user-select: none;
        position: absolute;
        bottom: 0;
        top: auto;
        left: 0; 
        right: 0;
        background-color:inherit;
        border-top: 1px solid #E0E0E0;
        box-sizing: border-box;
        height: 60px;
        display:grid;
        grid-template-columns: 85% 1fr;
        /* justify-content:space-between; */
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
      // default card title element
      .title_tema{
        user-select: none;
        position: absolute;
        bottom:30%;
        left:10px;
        text-transform:capitalize;
        font-size:xx-large;
        color: white;
        margin: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        z-index:1;
      }
      .small{
          font-size:medium;
          margin:0;
      }

`

