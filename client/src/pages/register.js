import RegistrationButton from "../components/login_components/registration_button";
import RegistrationLabel from '../components/login_components/registration_label';
import RegistrationHeader from '../components/login_components/registration_header';
import RegistrationForm from '../components/login_components/registration_form';
import RegistrationInput from '../components/login_components/registration_input';
import RegistrationLink from "../components/login_components/registration_hyperlink";
import { useState, useEffect } from 'react';

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log(hashHex)
    return hashHex;
}

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password =  await hashPassword(enteredPassword);
        try {
            const response = await fetch('http://localhost:3001/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surname, email, password })
            });

            if (!response.ok) {
                alert('Unsuccessful register');
            } else {
                setRedirect(true);
            }
        } catch (error) {
            alert('Error registering', error);
        }
    };

    useEffect(() => {
        if (redirect) {
            window.location.href = '/login';
        }
    }, [redirect]);

    return (
        <>
            <RegistrationForm submit={handleSubmit}>
                <RegistrationHeader value="Sign Up" />
                <RegistrationLabel value="Username:" />
                <RegistrationInput type="text" onChange={(e) => setName(e.target.value)} />
                <RegistrationLabel value="Surname:" />
                <RegistrationInput type="text" onChange={(e) => setSurname(e.target.value)} />
                <RegistrationLabel value="Email:" />
                <RegistrationInput type="email" onChange={(e) => setEmail(e.target.value)} />
                <RegistrationLabel value="Password:" />
                <RegistrationInput type="password" onChange={(e) => setPassword(e.target.value)} />
                <RegistrationLink link="/login" value="Login" />
                <RegistrationButton name="Register" />
            </RegistrationForm>
        </>
    );
};

export default RegisterPage;
