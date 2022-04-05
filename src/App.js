import Navbar from './components/Navbar/Navbar'
import Teams from './pages/TeamsPage/Teams';
import Footer from './components/Footer/Footer';
import "./components/Navbar/navbar.css"
import "./pages/PlayerDetailsPage/playerdetail.css"
import "./pages/TeamsPage/teams.css"
import "./components/Footer/footer.css"
import "./pages/TeamsPage/Components/teamlist.css"
import './pages/TeamDetailsPage/teamdetails.css'
import './pages/PlayersListPage/playerslist.css'
import './pages/CreatePlayerPage/createplayer.css'
import './pages/CreateTeamPage/createteam.css'
import './pages/HomePage/homepage.css'
import './pages/NotFoundPage/notfound.css'
import TeamContextProvider from './context/TeamContext';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TeamDetails from './pages/TeamDetailsPage/TeamDetails';
import PlayerDetail from './pages/PlayerDetailsPage/PlayerDetail';
import PlayerList from './pages/PlayersListPage/PlayersList';
import CreatePlayer from './pages/CreatePlayerPage/CreatePlayer';
import HomePage from './pages/HomePage/HomePage';
import HomeImage from './utils/img/homeImage.png';
import Logo from './utils/img/logo.png';
import teamImage from './utils/img/teamImage.png';
import CreateTeam from './pages/CreateTeamPage/CreateTeam';
import NotFound from './pages/NotFoundPage/NotFound';

function App() {
  return (
    <Router>
    <div className="App">
    <TeamContextProvider>
       <Navbar  logo = {Logo}/>
        <Switch>
            <Route exact path='/'>
               <HomePage image = {HomeImage}/>
            </Route> 
            <Route path='/teams'>
               <Teams title = "Teams"/>
            </Route>   
            <Route path='/players'>
               <PlayerList />
            </Route>  
            <Route path = "/team-details/:id">
              <TeamDetails />          
            </Route>
            <Route path = "/player-details/:id">
              <PlayerDetail />          
            </Route>
            <Route path = "/create-player">
            { localStorage.getItem('isLogIn')  && <CreatePlayer /> }    
            { !localStorage.getItem('isLogIn')  && <NotFound /> }    
            </Route>
            <Route path = "/create-team">
            { localStorage.getItem('isLogIn')  &&  <CreateTeam  image={teamImage}/> }  
            { !localStorage.getItem('isLogIn')  && <NotFound /> }          
            </Route>  
        </Switch>
        <Footer />
    </TeamContextProvider>   
    </div>
    </Router>
  );
}

export default App;
