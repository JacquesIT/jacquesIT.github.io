import React, { useState } from 'react';
import styles from "../../styling/selected_item.module.scss";
import { Button } from '@mui/material';

const BikeSpecDisplayer = (prop) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.dropdownContainer}>
            <Button onClick={toggleDropdown} variant="contained" color="primary">
                {isOpen ? 'Hide Specs' : 'Show Specs'}
            </Button>
            {isOpen && (
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.spec}>
                            <p className={styles.title}>Frame</p>
                            <p className={styles.value}>{prop.frame}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Fork</p>
                            <p className={styles.value}>{prop.fork}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Front Derailleur</p>
                            <p className={styles.value}>{prop.front_derailluer}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Rear Derailleur</p>
                            <p className={styles.value}>{prop.rear_deraileur}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Shifters</p>
                            <p className={styles.value}>{prop.shifters}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Crankset</p>
                            <p className={styles.value}>{prop.crankset}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Chain</p>
                            <p className={styles.value}>{prop.chain}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Breaks</p>
                            <p className={styles.value}>{prop.breaks}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Wheels</p>
                            <p className={styles.value}>{prop.wheels}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Tyres</p>
                            <p className={styles.value}>{prop.tyres}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Stem</p>
                            <p className={styles.value}>{prop.stem}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Handlebar</p>
                            <p className={styles.value}>{prop.handlebar}</p>
                        </div>
                        <div className={styles.spec}>
                            <p className={styles.title}>Pedals</p>
                            <p className={styles.value}>{prop.pedals}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );  
}

export default BikeSpecDisplayer;
