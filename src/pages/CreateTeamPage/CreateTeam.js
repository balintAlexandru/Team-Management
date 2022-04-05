import React, { useState, useContext, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TeamContext } from '../../context/TeamContext';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const CreateTeam = ({ image }) => {
  const [imageUrl, setTeamImage] = useState('');
  const [name, setTeamName] = React.useState('');
  const [country, setTeamCountry] = useState('');
  const [noOfGames, setGamesNumber] = useState('');
  const [noOfWins, setTeamWinsNumber] = useState('');
  const [noOfLoses, setTeamLosesNumber] = useState('');
  const [id, setId] = useState(0)
  const { teams, getTeamsAllData } = useContext(TeamContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noOfPlayers = 0;
    setId(id + 1);
    const model = { id, name, country, noOfPlayers, noOfGames, noOfWins, noOfLoses, imageUrl };

    await axios.post('http://localhost:8000/team', model)
      .then((answer) => {
        getTeamsAllData();
        history.push('/teams')
      })
      .catch((err) => console.log("Error while creating team:", err));
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setTeamImage(base64);
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
    <div>
      <div className='create-team-container'>
        <h1>Create Team</h1>
        <div className='team-context'>
          <form onSubmit={handleSubmit}>

            <label>Image</label>
            <TextField
              id="originalFileName"
              type="file"
              inputProps={{ accept: 'image/*, .jpeg, .jpg, .png' }}
              required
              onChange={e => handleFileRead(e)}
              size="small"
              variant="standard"
            />
            <label>Name</label>
            <input type="text" required value={name} onChange={(e) => setTeamName(e.target.value)} />

            <label>Country</label>
            <input type="text" required value={country} onChange={(e) => setTeamCountry(e.target.value)} />

            <label>Games number</label>
            <input type="number" required value={noOfGames} onChange={(e) => setGamesNumber(e.target.value)} />

            <label>Wins number</label>
            <input type="number" required value={noOfWins} onChange={(e) => setTeamWinsNumber(e.target.value)} />

            <label>Loses number</label>
            <input type="number" required value={noOfLoses} onChange={(e) => setTeamLosesNumber(e.target.value)} />
            <button>Create Player</button>

          </form>
          <div className='team-image'>
            <img src={image} alt="team image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;