import React from 'react'
import {
    FacebookShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    WhatsappIcon, PinterestIcon,
    FacebookIcon, EmailShareButton, EmailIcon
} from 'react-share'

const SocialShares = ({ shareurl, fisa }) => {
    // console.log('link poza', fisa.poza)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        }}>
            <ul>
                <li>Distribuie</li>
                <li>
                    <FacebookShareButton
                        url={shareurl}
                        quote={fisa.nume}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </li>
                <li>
                    <WhatsappShareButton
                        url={shareurl}
                        title={fisa.nume}
                        separator=":: "
                        className="Whatsapp__share-button"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </li>
                <li>
                    <EmailShareButton
                        url={shareurl}
                        title={fisa.nume}
                        separator=":: "
                        className="Email__share-button"
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </li>
                {/* <li>
                    <PinterestShareButton
                        url={shareurl}
                        media='https://144.91.75.17//ae/fise/matematica/multimi/Uneste_jucariile_cu_lada_de_jucarii_si_rechizitele_cu_ghiozdanul%20(1).jpg'
                        description={fisa.nume}
                    >
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>
                </li> */}

            </ul>
        </div>
    )
}

export default SocialShares