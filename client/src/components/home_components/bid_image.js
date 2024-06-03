import React, { useEffect, useState } from 'react';
import styles from "../../styling/home-page.module.scss";
import { getItems } from "../../utils/fetchUtils";


function BiddingImage({ bikeId }) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBikeImages = async () => {
            try {
                const data = await getItems('bike', bikeId, 'img');
                if (Array.isArray(data) && data.length > 0) {
                    setImage(data[0]);
                } else {
                    throw new Error('No images found');
                }
            } catch (err) {
                setError(err);
            }
        };
        fetchBikeImages();
    }, [bikeId]);

    function base64ToBlob(base64, mimeType) {
        const byteString = atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeType });
    }

    if (error) {
        return <div>Error fetching image: {error.message}</div>;
    }

    if (!image) {
        return <div>Loading...</div>;
    }

    const blob = base64ToBlob(image.blob, 'image/jpeg'); // Adjust MIME type as needed
    const url = URL.createObjectURL(blob);

    return (
        <div>
            <img src={url} alt={`Bike ${bikeId}`} className={styles.bidImage} />
        </div>
    );
}

export default BiddingImage;
