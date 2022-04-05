import React, { useState, useContext, useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const TeamContext = createContext();

const TeamContextProvider = (props) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [noOfPlayers, setNoOfPlayers] = useState(0);
  const [showLayoutLogIn, setShowLogIn] = useState(false);

  useEffect(() => {
    getTeamsAllData();
    getPlayersAllData();
    getUser();
  }, [])
  
  const showLogIn = () => {
    setShowLogIn(!showLayoutLogIn);
  }
  
  const checkLogIn = (userName, userPassword) => {
    user?.map(user => {
      if(user.userName === userName && user.password === userPassword){
        localStorage.setItem('isLogIn', true);
      }
    })
  }
  
  const getUser = async () => {
    await axios.get('http://localhost:8070/users')
      .then((answer) => setUser(answer.data))
      .catch((err) => console.log("ERR:", err))
  }

  const unAssignPlayer = async (playerId) => {
    await axios.patch(`http://localhost:8080/players/${playerId}`, { teamId: 0 })
    .then(getPlayersAllData());
    history.push('/players');
  }
  const playersNumber = async (teamId) => {
    setNoOfPlayers(noOfPlayers + 1);
    await axios.patch(`http://localhost:8000/team/${teamId}`, { noOfPlayers: noOfPlayers })
    getTeamsAllData();
  }

  const assignPlayers = async (teamId, playerId) => {
    await axios.patch(`http://localhost:8080/players/${playerId}`, { teamId: teamId })
    getPlayersAllData();
  }

  const deletePlayer = async (playerId) => {
    await axios.delete(`http://localhost:8080/players/${playerId}`)
      .then(getPlayersAllData());
  }

  const deleteTeam = async (teamId) => {
    players?.map(async player => {
      if (player.teamId === teamId) {
        await axios.patch(`http://localhost:8080/players/${player.id}`, { teamId: 0 })
      }
    })
    await axios.delete(`http://localhost:8000/team/${teamId}`)
    getTeamsAllData();
  }

  const updatePlayer = async (playerId, teamId, firstName, lastName, imageUrl, noOfGames) => {
    history.push('/players');
    await axios.patch(`http://localhost:8080/players/${playerId}`, {
      teamId: teamId,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
      noOfGames: noOfGames
    })
    getPlayersAllData();
  }
  const updateTeam = async (teamId, name, country, noOfGames, noOfWins, noOfLoses, imageUrl) => {
    console.log(imageUrl);
    await axios.patch(`http://localhost:8000/team/${teamId}`, {
      name: name,
      country: country,
      noOfGames: noOfGames,
      noOfWins: noOfWins,
      noOfLoses: noOfLoses,
      imageUrl: imageUrl
    })
  }

  const getTeamsAllData = async () => {
    await axios.get('http://localhost:8000/team')
      .then((answer) => setTeams(answer.data))
      .catch((err) => console.log("ERR:", err))
  }

  const getPlayersAllData = async () => {
    await axios.get('http://localhost:8080/players')
      .then((answer) => setPlayers(answer.data))
      .catch((err) => console.log("ERR:", err))
  }

  return (
    <TeamContext.Provider value={{ 
        teams, 
        players,
        showLayoutLogIn,
        getPlayersAllData,
        getTeamsAllData,
        deletePlayer,
        updatePlayer,
        deleteTeam,
        updateTeam,
        assignPlayers,
        playersNumber,
        unAssignPlayer,
        showLogIn,
        checkLogIn}}>
      {props.children}
    </TeamContext.Provider>
  )
}

export default TeamContextProvider;