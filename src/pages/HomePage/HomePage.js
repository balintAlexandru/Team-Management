import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TeamContext } from '../../context/TeamContext';

const HomePage = ({ image }) => {
  const history = useHistory();
  const {checkLogIn, showLayoutLogIn } = useContext(TeamContext);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  return (
    <div className='home-container'>
      <div className='home-content'>
        <h1>Football Team Management</h1>
        <button onClick={() => { history.push('/teams') }}>Show Teams</button>
      </div>
      <div className='home-image'>
        <img src={image} />
      </div>
      {showLayoutLogIn && <div className='form-login'>
          <form className='form-container' onSubmit={() => {checkLogIn(userName, userPassword)}}>
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

export default HomePage;