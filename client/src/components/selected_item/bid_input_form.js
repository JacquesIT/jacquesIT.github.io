import React, { useState } from 'react';
import { Modal, Button, TextField, Box } from '@mui/material';
import styles from '../../styling/selected_item.module.scss';
import { postItem } from '../../utils/fetchUtils';

const BidsFormPopup = () => {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // userEmail = sessionStorage.getItem('email')
        // selectedBikeId = sessionStorage.getItem('bikeId')
        // console.log(userEmail)
        // console.log(selectedBikeId)
        try {
            
            // const data = await postItem('bike', sessionStorage.getItem("bikeId"), '', {"1", "userEmail", amount})

            // if (data.ok) {
            //     alert('Bid Placed Successfully');
            // } else {
            //     alert('Error placing bid: ');
            // }
        } catch(e) {
            alert('Error bidding in', e);
        }
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>Place a Bid</Button>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modalBox}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h2>Place Your Bid</h2>
                        <TextField
                            label="Bid Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            fullWidth
                            required
                        />
                        <Box className={styles.buttonContainer}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                            <Button onClick={handleClose} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default BidsFormPopup;