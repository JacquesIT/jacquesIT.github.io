import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginIcon = () => {
    return(
        <li style={{ float: "right" }} className="icon"><a href="/login"><FontAwesomeIcon icon={faUser}/></a></li>
    )
}

export default LoginIcon
