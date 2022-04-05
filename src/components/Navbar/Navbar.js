import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { TeamContext } from "../../context/TeamContext";


const Navbar = ({ logo }) => {

    const { showLogIn } = useContext(TeamContext);
    const history = useHistory();

    const hideButtons = () => {
        localStorage.removeItem('isLogIn');
        history.push('/');
        history.go(0);
    }

    return (
        <header>
            <nav>
                <img src={logo} onClick={() => { history.push('/') }} />
                <div className="login-container">
                    {!localStorage.getItem('isLogIn') && <button className="login-btn" onClick={() => showLogIn()} >Login</button>}
                    {localStorage.getItem('isLogIn') && <button className="login-btn" onClick={() => hideButtons()} >Logout</button>}
                </div>
                <ul>
                    <li onClick={() => { history.push('/teams') }}>Show Teams</li>
                    <li onClick={() => { history.push('/players') }}>Show Players</li>
                    {localStorage.getItem('isLogIn') && <li onClick={() => { history.push('/create-player') }}>Create Player</li>}
                    {localStorage.getItem('isLogIn') && <li onClick={() => { history.push('/create-team') }}>Create Team</li>}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;