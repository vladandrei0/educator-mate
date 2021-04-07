import Image from 'next/image';
import React from 'react';
import useImageSize from '../../utils/hooks/useImageSize';

const StyledImage = ({ src, alt }) => {
    const [width, height] = useImageSize(src);
    const [w, h] = [Math.floor(width / 4), Math.floor(height / 4)];
    return (
        <>
            {w > h ?
                <div>
                    <Image
                        src={src}
                        alt={alt}
                        width={w}
                        height={h}
                        layout='responsive'
                        objectfit="cover"
                    />
                </div>
                :
                <div>
                    <Image
                        src={src}
                        alt={alt}
                        width={w}
                        height={h}
                        layout="responsive"
                        objectfit="cover"
                    />
                </div>
            }
        </>
    )
}

export default StyledImage;