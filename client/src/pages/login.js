import RegistrationButton from "../components/login_components/registration_button";
import RegistrationLabel from '../components/login_components/registration_label';
import RegistrationHeader from '../components/login_components/registration_header';
import RegistrationForm from '../components/login_components/registration_form';
import RegistrationInput from '../components/login_components/registration_input';
import RegistrationLink from "../components/login_components/registration_hyperlink";
import { useState, useEffect } from 'react';
import { postItem } from "../utils/fetchUtils";

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log(hashHex)
    return hashHex;
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = await hashPassword(enteredPassword);

        try {
            const data = await postItem('login', '', '', {email, password})

            if (data.ok) {
                sessionStorage.setItem('email', email)
                setRedirect(true);
              } else {
                alert('Error logging in: ');
              }
        } catch(e) {
            alert('Error logging in', e);
        }
    };

    useEffect(() => {
        if (redirect) {
            window.location.href = '/';
        }
    }, [redirect]);

    return (
        <>
            <RegistrationForm submit={handleSubmit}>
                <RegistrationHeader value="Sign In" />
                <RegistrationLabel value="Email:" />
                <RegistrationInput type="email" onChange={(e) => setEmail(e.target.value)} />
                <RegistrationLabel value="Password:" />
                <RegistrationInput type="password" onChange={(e) => setPassword(e.target.value)} />
                <RegistrationLink link="/register" value="Register" />
                <RegistrationButton name="Login" />
            </RegistrationForm>
        </>
    );
};

export default LoginPage;
