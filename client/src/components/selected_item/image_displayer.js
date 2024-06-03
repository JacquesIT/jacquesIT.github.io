import React, { useState, useEffect, useCallback } from 'react';
import styles from "../../styling/selected_item.module.scss";
import { getItems } from "../../utils/fetchUtils";

const ImagesDisplayer = ({ bikeId }) => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [error, setError] = useState(null);

    const base64ToBlob = useCallback((base64, mimeType) => {
        const byteString = atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeType });
    }, []);

    useEffect(() => {
        const fetchBikeImages = async () => {
            try {
                const data = await getItems('bike', bikeId, 'img');
                if (Array.isArray(data)) {
                    const imageBlobs = data.map(image => {
                        const blob = base64ToBlob(image.blob, 'image/jpeg');
                        return URL.createObjectURL(blob);
                    });
                    setImages(imageBlobs);
                } else {
                    throw new Error('Expected an array of images');
                }
            } catch (err) {
                setError(err);
            }
        };

        fetchBikeImages();
    }, [bikeId, base64ToBlob]);

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1);
    };

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0);
    };

    if (error) {
        return <div>Error fetching images: {error.message}</div>;
    }

    if (images.length === 0) {
        return <div>Loading images...</div>;
    }

    return (
        <div className={styles.carousel}>
            <button className={styles.leftArrow} onClick={prevImage}>&#9664;</button>
            <img id="carousel-image" src={images[currentImageIndex]} alt="Carousel" />
            <button className={styles.rightArrow} onClick={nextImage}>&#9654;</button>
        </div>
    );
};

export default ImagesDisplayer;
