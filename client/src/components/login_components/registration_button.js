import styles from '../../styling/registration-form.module.scss'

const RegistrationButton = (props) => {
    return(
        <div>
            <button className={styles.registerButton}>{props.name}</button>
        </div>
    )
}

export default RegistrationButton