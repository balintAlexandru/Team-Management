import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-elastic-carousel'

const TeamList = ({ teams }) => {

    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [currentTeamId, setCurrentTeamId] = useState(null);
    const history = useHistory();

    return (
        <div className='team-content'>
            <Carousel itemsToShow={3}>
                {
                    teams?.map((team, index) => {
                        return (
                            <div className='team-card' key={index} onClick={() => { history.push(`/team-details/${team.id}`) }}>
                                <img src={team.imageUrl} />
                                <h2>{team.name}</h2>
                                <div className="card-content">
                                    <p>Country: {team.country}</p>
                                    <p>Number of games: {team.noOfGames}</p>
                                    <p>Number of wins: {team.noOfWins}</p>
                                    <p>Number of Loses: {team.noOfLoses}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}

export default TeamList;
