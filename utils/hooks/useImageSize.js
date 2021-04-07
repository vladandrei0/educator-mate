import { useState, useEffect } from 'react';

const useImageSize = (url) => {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        if (!url) return;
        const img = document.createElement('img');
        img.src = url;
        function getSize(event) {
            const { naturalHeight, naturalWidth } = event.target;
            setSize([naturalWidth, naturalHeight]);
        }
        img.addEventListener('load', getSize);
        return () => { img.removeEventListener('load', getSize) }
    }, [url]);

    return size;
};

export default useImageSize;
