import Link from 'next/link'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles';
import * as colors from '../styles/colors'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PinterestIcon from '@material-ui/icons/Pinterest';

const FooterContainer = styled.footer`
    width: 100%;
    height: 100%;
    border-top: 1px solid #eaeaea;
    display: grid;
    justify-items:center;
    align-items: center;
    grid-row-gap:10px;
    color:${colors.pink};
    margin-top:2rem;
    margin-bottom:${props=>props.margin};
    flex-shrink:0;

    .social{
      list-style:none;
      display:flex;
      padding:0;
      padding-top:10px;
      >li{
        margin: 0 10px;
      }
    }
    
`

export const Footer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const margin = matches ? '80px' : '10px'
  return (
    <FooterContainer margin={margin}>
      <ul className='social' >
        <li>
          <a href="https://www.facebook.com/ajutorulEducatorului"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCMu7WIl1EboL9wISWk9JpFg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Youtube">
            <YouTubeIcon />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/ajutorul_educatorului/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram">
            <InstagramIcon />
          </a>
        </li>
      </ul>
      <a
        href="https://ajutoruleducatorului.ro"
        target="_blank"
        rel="noopener noreferrer"
      >
        Creat de Ajutorul Educatorului © 2020
      </a>
      <Link href='/gdpr' passHref>
        <a>GDPR</a>
      </Link>
    </FooterContainer>
  )
}