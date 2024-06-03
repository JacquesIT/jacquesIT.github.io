import styles from '../../styling/registration-form.module.scss';

const RegistrationForm = ({ children, submit }) => {
  return (
    <div className={styles.container}>
      <form onSubmit={submit} className={styles.registerForm}>
        {children}
      </form>
    </div>
  );
};

export default RegistrationForm;