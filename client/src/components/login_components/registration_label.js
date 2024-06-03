import { memo } from "react";
import styles from '../../styling/registration-form.module.scss'

const RegistrationLabel = ( prop ) => {
    return(
        <div>
            <label className={styles.registerLabel}>{prop.value}</label>
        </div>
    )
};

export default memo(RegistrationLabel)