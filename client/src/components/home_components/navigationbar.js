import '../../styling/home-page.module.scss'
import LoginIcon from '../login_components/login_icon';

const NavigationBar = () => {
    return (
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <LoginIcon/>
        </ul>
    );
}

export default NavigationBar