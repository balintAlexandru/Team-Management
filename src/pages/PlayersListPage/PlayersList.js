import React, { useContext, useEffect, useState } from 'react';
import { TeamContext } from '../../context/TeamContext';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PlayerList = () => {

  const { players, getPlayersAllData, teams, assignPlayers, showLayoutLogIn, checkLogIn } = useContext(TeamContext);
  const history = useHistory();
  const [playerId, setPlayerId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [showAssignLayout, setShowAssignLayout] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  useEffect(() => {
    getPlayersAllData();
  }, [])

  const displayAssignLayout = () => {
    setShowAssignLayout(true);
  }

  const hideAssignLayout = () => {
    setShowAssignLayout(false);
  }

  return (
    <div className='players-list-content'>
      <div className='home-btn'>
        <button onClick={() => { history.go(-1) }}>Go back</button>
        { localStorage.getItem('isLogIn') && <button onClick={displayAssignLayout}>Assign player</button> }
      </div>
      <div className='players-type-content'>
        <div className='card-with-team'>
          <p className='card-with-team-title'>Players with team</p>
          <div className='card-list-container'>
            {players?.map((player, index) => {
              if (player.teamId !== 0) {
                return (
                  <div className='player-card-content' key={index} onClick={() => { history.push(`/player-details/${player.id}`) }}>
                    <img src={player.imageUrl} />
                    <p className="player-card-name">{`${player.firstName} ${player.lastName}`}</p>
                    <p>Games: {player.noOfGames}</p>
                  </div>
                )
              }
            })
            }
          </div>
        </div>
        <div className='card-no-teams'>
          <p className='card-with-noteam-title'>Players with no team</p>
          <div className='card-list-container'>
            {players?.map((player, index) => {
              if (player.teamId === 0) {
                return (
                  <div className='player-card-content' key={index} onClick={() => { history.push(`/player-details/${player.id}`) }}>
                    <img src={player.imageUrl} />
                    <p className="player-card-name">{`${player.firstName} ${player.lastName}`}</p>
                    <p>Games: {player.noOfGames}</p>
                  </div>
                )
              }
            })
            }
          </div>
        </div>
        {showAssignLayout && <div className='update-layout'>
          <div className='update-card'>
            <div className="assign-card">
              <form onSubmit={() => { assignPlayers(teamId, playerId) }} className="update-form">
                <Box sx={{ minWidth: 320 }}>
                  <FormControl required fullWidth>
                    <InputLabel id="demo-simple-select-label">Players</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={playerId}
                      label="players"
                      onChange={(e) => setPlayerId(e.target.value)}
                    >
                      {players?.map((player, index) => {
                        if (player.teamId === 0) {
                          return <MenuItem value={player.id} key={index}>{player.firstName} {player.lastName}</MenuItem>
                        }
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <br />
                <Box sx={{ minWidth: 320 }}>
                  <FormControl required fullWidth>
                    <InputLabel id="demo-simple-select-label">Teams</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={teamId}
                      label="teams"
                      onChange={(e) => setTeamId(e.target.value)}
                    >
                      {teams?.map((team, index) => {
                        console.log("team id:", teamId);
                        return <MenuItem value={team.id} key={index}>{team.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <div className='assign-buttons'>
                  <button className='confirm'>Confirm</button>
                  <button className='cancel' onClick={hideAssignLayout} >Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        }
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

export default PlayerList;