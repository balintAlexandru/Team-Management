import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TeamContext } from '../../context/TeamContext';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const CreatePlayer = () => {
  const [teamId, setTeamId] = useState(0);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [noOfGames, setNoOfGames] = useState('');
  const { teams, players, getPlayersAllData, playersNumber } = useContext(TeamContext);
  const history = useHistory();

  const handleChange = (event) => {
    setTeamId(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamId !== 0) {
      playersNumber(teamId)
    }
    const id = players.length + 1;
    const model = { id, teamId, firstName, lastName, imageUrl, noOfGames };
    await axios.post('http://localhost:8080/players', model)
      .then((answer) => {
        getPlayersAllData();
        history.push('./players')
      })
      .catch((err) => console.log("Error while creating player:", err));
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

  return (
    <div className='create-player-content'>
      <h1>Create Player</h1>
      <div className='create-player-body'>
        <form onSubmit={handleSubmit}>
          <Box sx={{ minWidth: 120 }}>
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
          <label>First Name</label>
          <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label>Last Name</label>
          <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label>Games Number</label>
          <input type="number" required value={noOfGames} onChange={(e) => setNoOfGames(e.target.value)} />

          <button>Create Player</button>
        </form>
        <div className='create-player-image'>
          <TextField
            id="originalFileName"
            type="file"
            inputProps={{ accept: 'image/*, .jpeg, .jpg, .png' }}
            required
            onChange={e => handleFileRead(e)}
            size="small"
            variant="standard"
          />
          <div className="create-player-container">
            {imageUrl && <img src={imageUrl} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlayer;