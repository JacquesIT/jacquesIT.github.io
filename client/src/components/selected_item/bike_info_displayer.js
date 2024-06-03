import React from 'react';
import styles from "../../styling/selected_item.module.scss";

const BikeInfoDisplayer = (prop) => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.spec}>
                    <p className={styles.title}>Name</p>
                    <p className={styles.value}>{prop.bike_name}</p>
                </div>
                <div className={styles.spec}>
                    <p className={styles.title}>Brand</p>
                    <p className={styles.value}>{prop.brand}</p>
                </div>
                <div className={styles.spec}>
                    <p className={styles.title}>Model Year</p>
                    <p className={styles.value}>{prop.model_year}</p>
                </div>
                <div className={styles.spec}>
                    <p className={styles.title}>Orignal Price</p>
                    <p className={styles.value}>{prop.original_price}</p>
                </div>
                <div className={styles.spec}>
                    <p className={styles.title}>Type</p>
                    <p className={styles.value}>{prop.type}</p>
                </div>
                <div className={styles.spec}>
                    <p className={styles.title}>Start Date</p>
                    <p className={styles.value}>{prop.start_date}</p>
                </div>
                <div className={styles.spec}>
                    <p className={styles.title}>End Date</p>
                    <p className={styles.value}>{prop.end_date}</p>
                </div>
            </div>
        </div>
    )
}

export default BikeInfoDisplayer;
