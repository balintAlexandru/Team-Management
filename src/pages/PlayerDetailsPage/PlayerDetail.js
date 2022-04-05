import React, { useContext, useEffect, useState } from 'react';
import { TeamContext } from '../../context/TeamContext';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PlayerDetail = () => {
  const { id } = useParams();
  const { teams, deletePlayer, updatePlayer, unAssignPlayer, isLogIn } = useContext(TeamContext);
  const history = useHistory();
  const [player, setPlayer] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [noOfGames, setNoOfGames] = useState('');
  const [showDeleteLayout, setShowDeleteLayout] = useState(false);
  const [showUpdateLayout, setShowUpdateLayout] = useState(false);
  const [showAssignLayout, setShowAssignLayout] = useState(false);

  useEffect(() => {
    if (id) {
      getPlayerData(id);
    }
  }, [])

  const nameOfTeam = (teamId) => {
    teams?.map((team) => {
      if (team.id === teamId) {
        setTeamName(team.name);
      }
    })
  }

  const newPlayer = (playerId, teamId, firstName, lastName, imageUrl, noOfGames) => {
    updatePlayer(playerId, teamId, firstName, lastName, imageUrl, noOfGames);
  }

  const displayDeleteLayout = () => {
    setShowDeleteLayout(true);
  }

  const hideDeleteLayout = () => {
    setShowDeleteLayout(false);
  }

  const displayAssignLayout = () => {
    setShowAssignLayout(true);
  }

  const hideAssignLayout = () => {
    setShowAssignLayout(false);
  }

  const displayUpdateLayout = () => {
    setTeamId(player.teamId);
    setFirstName(player.firstName);
    setLastName(player.lastName);
    setNoOfGames(player.noOfGames);
    setShowUpdateLayout(true);
  }

  const hideUpdateLayout = () => {
    setShowUpdateLayout(false);
  }

  const removePlayer = (playerId) => {
    deletePlayer(playerId);
    history.push('/players');
  }

  const getPlayerData = async (id) => {
    await axios.get(`http://localhost:8080/players/${id}`)
      .then((answer) => {
        setPlayer(answer.data)
        nameOfTeam(answer.data.teamId)
      })
      .catch((err) => console.log("ERR:", err))
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setImageUrl(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const handleChange = (event) => {
    setTeamId(event.target.value);
  }

  return (
    <div className='p-card'>
      <div className='player-buttons'>
        <button className="a" onClick={() => { history.go(-1) }}>Go back</button>
      </div>
      <div className='player-details-container'>
        <div className='player-img'>
          <img src={player.imageUrl} />
        </div>
        <div className='player-card'>
          <div className='player-info'>
            <p>Name : {player.firstName} {player.lastName}</p>
            <p>Team : {teamName}</p>
            <p>Number of games : {player.noOfGames}</p>
            <div className='player-info-buttons'>
            { localStorage.getItem('isLogIn')  && <button onClick={displayDeleteLayout}>Delete Player</button> }
            { localStorage.getItem('isLogIn')  && <button onClick={displayUpdateLayout}>Update Player</button> }
            { localStorage.getItem('isLogIn')  && <button onClick={displayAssignLayout}>Unassign Player</button> }
            </div>
          </div>
        </div>
      </div>
      {showDeleteLayout && <div className='delete-layout'>
        <div className='delete-card'>
          <div className='delete-title'>
            <p>Are you sure you want to delete this player?</p>
          </div>
          <div className='delete-buttons'>
            <button className='confirm' onClick={() => { removePlayer(player.id) }}>Yes</button>
            <button className='cancel' onClick={hideDeleteLayout} >No</button>
          </div>
        </div>
      </div>}
      {showUpdateLayout && <div className='update-layout'>
        <div className='update-card'>
          <form onSubmit={() => { newPlayer(player.id, teamId, firstName, lastName, imageUrl, noOfGames) }} className="update-form">
            <Box sx={{ minWidth: 320 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={teamId}
                  label="Age"
                  onChange={handleChange}
                >
                  {teams?.map((team, index) => {
                    return <MenuItem value={team.id} key={index}>{team.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
            <labe>Image</labe>
            <TextField
              id="originalFileName"
              type="file"
              inputProps={{ accept: 'image/*, .jpeg, .jpg, .png' }}
              required
              onChange={e => handleFileRead(e)}
              size="small"
              variant="standard"
            />

            <label>First Name</label>
            <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label>Last Name</label>
            <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <label>Games Number</label>
            <input type="number" required value={noOfGames} onChange={(e) => setNoOfGames(e.target.value)} />
            <div className='update-buttons'>
              <button className='confirm'>Confirm</button>
              <button className='cancel' onClick={hideUpdateLayout} >Cancel</button>
            </div>
          </form>
        </div>
      </div>}
      {showAssignLayout && <div className='delete-layout'>
        <div className='delete-card'>
          <div className='delete-title'>
            <p>Are you sure you want to unassign this player?</p>
          </div>
          <div className='delete-buttons'>
            <button className='confirm' onClick={() => { unAssignPlayer(player.id) }}>Yes</button>
            <button className='cancel' onClick={hideAssignLayout} >No</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default PlayerDetail;