import styles from '../../styling/registration-form.module.scss'

const RegistrationHeader = ( prop ) => (
    <div>
        <h1 className={styles.registerH1}>{prop.value}</h1>
    </div>
);

export default RegistrationHeader