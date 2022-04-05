import React, { useContext, useState } from 'react';
import { TeamContext } from '../../context/TeamContext';
import TeamList from './Components/TeamList';
import { useHistory } from 'react-router-dom';


const Teams = ({ title }) => {

    const { teams, players, showLayoutLogIn, checkLogIn } = useContext(TeamContext);
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    return (
        <div className='team-container'>
            <button onClick={() => { history.go(-1) }} className="team-container-btn">Go back</button>
            <div className='main-title'>{title}</div>
            <TeamList teams={teams} />
            {showLayoutLogIn && <div className='form-login'>
                <form className='form-container' onSubmit={() => { checkLogIn(userName, userPassword) }}>
                    <label>Username</label>
                    <input type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <label>Password</label>
                    <input type="password" required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />

                    <button className='login-submit'>Login</button>
                </form>
            </div>
            }

        </div>
    );
}

export default Teams;
