import { memo } from "react";
import styles from '../../styling/registration-form.module.scss';

const RegistrationInput = ({ type, onChange }) => {
    return (
        <div>
            <input className={styles.registerInput} type={type} onChange={onChange} />
        </div>
    );
};

export default memo(RegistrationInput);
