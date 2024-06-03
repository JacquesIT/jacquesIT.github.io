import React from 'react';
import styles from '../../styling/home-page.module.scss';
import BiddingImage from './bid_image';

const BiddingItem = (prop) => {
    return (
        <div className={styles.itemForm} role="button" tabIndex="0">
            <BiddingImage bikeId={prop.bikeId}/>
            <label className={styles.itemLabel}>{prop.original_price}€</label>
        </div>
    );
};

export default BiddingItem;