import { useParams, Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { TeamContext } from '../../context/TeamContext';
import axios from "axios";
import TextField from '@mui/material/TextField';

const TeamDetails = () => {
  const { players, getPlayersAllData, deleteTeam, updateTeam, isLogIn } = useContext(TeamContext);
  const { id } = useParams();
  const [showDeleteLayout, setShowDeleteLayout] = useState(false);
  const [showUpdateLayout, setShowUpdateLayout] = useState(false);
  const [team, setTeam] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [noOfGames, setNoOfGames] = useState('');
  const [noOfWins, setNoOfWins] = useState('');
  const [noOfLoses, setNoOfLoses] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getTeamsData(id);
      getPlayersAllData();
    }
  }, [])

  const setPath = (path) => {
    history.push(`/player-details/${path}`)
  }

  const getTeamsData = async (id) => {
    await axios.get(`http://localhost:8000/team/${id}`)
      .then((answer) => { setTeam(answer.data) })
      .catch((err) => console.log("ERR:", err))
  }

  const newTeam = (teamId, name, country, noOfGames, noOfWins, noOfLoses, imageUrl) => {
    updateTeam(teamId, name, country, noOfGames, noOfWins, noOfLoses, imageUrl);
  }

  const removeTeam = (teamId) => {
    deleteTeam(teamId);
    history.push('/teams');
  }

  const displayDeleteLayout = () => {
    setShowDeleteLayout(true);
  }

  const hideDeleteLayout = () => {
    setShowDeleteLayout(false);
  }

  const displayUpdateLayout = () => {
    setName(team.name);
    setCountry(team.country);
    setNoOfGames(team.noOfGames);
    setNoOfWins(team.noOfWins);
    setNoOfLoses(team.noOfLoses);
    setShowUpdateLayout(true);
  }

  const hideUpdateLayout = () => {
    setShowUpdateLayout(false);
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
    <div className="team-details">
      <div className='players-list'>
        <div className='header-team'>
          <button onClick={() => { history.go(-1) }}>Go back</button>
        </div>
        <div className='players-card-list'>
          {players?.map((player, index) => {
            if (team.id === player.teamId) {
              return (
                <div className='player' key={index} onClick={() => setPath(player.id)}>
                  <img src={`${player.imageUrl}`}></img>
                  <h3>{`${player.firstName}`}</h3>
                  <span>Games: {`${player.noOfGames}`}</span>
                </div>
              )
            }
          }
          )}
        </div>
      </div>
      <div className='team-info'>
        <div className='team-img'>
          <img src={team.imageUrl} alt="image" className="details-image" />
        </div>
        <div className="info">
          <h1>{team.name}</h1>
          <p>Country: {team.country}</p>
          <p>Number of Games: {team.noOfGames} </p>
          <p>Number of Wins: {team.noOfWins}</p>
          <p>Number of Loses: {team.noOfLoses}</p>
          <div className="info-buttons">
          { localStorage.getItem('isLogIn') && <button onClick={displayDeleteLayout}>Delete Team</button> }
          { localStorage.getItem('isLogIn')  && <button onClick={displayUpdateLayout}>Update Team</button> }
          </div>
        </div>

      </div>
      {showDeleteLayout && <div className='delete-layout'>
        <div className='delete-card'>
          <div className='delete-title'>
            <p>Are you sure you want to delete this team?</p>
          </div>
          <div className='delete-buttons'>
            <button className='confirm' onClick={() => { removeTeam(team.id) }}>Yes</button>
            <button className='cancel' onClick={hideDeleteLayout} >No</button>
          </div>
        </div>
      </div>}
      {showUpdateLayout && <div className='update-layout'>
        <div className='update-card'>
          <form onSubmit={() => { newTeam(team.id, name, country, noOfGames, noOfWins, noOfLoses, imageUrl) }} className="update-form">
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
            <label>Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />

            <label>Country</label>
            <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} />

            <label>Number of games</label>
            <input type="number" required value={noOfGames} onChange={(e) => setNoOfGames(e.target.value)} />

            <label>Number of wins</label>
            <input type="number" required value={noOfWins} onChange={(e) => setNoOfWins(e.target.value)} />

            <label>Number of loses</label>
            <input type="number" required value={noOfLoses} onChange={(e) => setNoOfLoses(e.target.value)} />

            <div className='update-buttons'>
              <button className='confirm'>Confirm</button>
              <button className='cancel' onClick={hideUpdateLayout} >Cancel</button>
            </div>
          </form>
        </div>
      </div>}
    </div>
  );
}

export default TeamDetails;