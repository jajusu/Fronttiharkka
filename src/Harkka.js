import React from 'react';
import Lisaa from './components/Lisaa';
//import Muokkaa from './components/Muokkaa';
import Etusivu from './components/Etusivu';
import Valikko from './components/Valikko';
import HaeLevyt from './components/HaeLevyt';
import HaeLevytEtusivu from './components/HaeLevytEtusivu';

//import './tyylit/tyyli.css';
//import AppBar from '@material-ui/core/AppBar';
//import Tabs from '@material-ui/core/Tabs';
//import Tab from '@material-ui/core/Tab';
//import CreateIcon from '@material-ui/icons/Create';
//import Add from '@material-ui/icons/Add';
//import Home from '@material-ui/icons/Home';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import MuokkaaEdit from './components/MuokkaaEdit';
//import MuokkaaKortti from './components/MuokkaaKortti';

const theme = createMuiTheme({
    palette: {
      primary: {main: purple[500], contrastText: '#FFFFFF'},
      secondary: {main: blue[700], contrastText: blueGrey[500]},
      text: {primary: blue[700], secondary: blueGrey[500] },
      action: {hover: blueGrey[100]},
      background: {default: '#FFFFFF'}
    },
  
    typography: {
      fontFamily: ['Poppins', 'open-sans'],
      }
  });

/*const levyt=
[
    {
        nimi: "Paranoid",
        artisti: "Black Sabbath",
        formaatti: "CD",
        kuva:"https://haagahelia-my.sharepoint.com/:i:/r/personal/bfm548_myy_haaga-helia_fi/Documents/paranoid.jpg?csf=1&web=1&e=qQewVy",
        info:"Kulumaa kansissa"
    },
    {
        nimi: "Master Of Puppets",
        artisti: "Metallica",
        formaatti: "LP",
        kuva:"https://haagahelia-my.sharepoint.com/:i:/r/personal/bfm548_myy_haaga-helia_fi/Documents/master.jpg?csf=1&web=1&e=wfeGy8",
        info:"Ensimmäinen painos"
    },
    {
        nimi: "Back In Black",
        artisti: "AC/DC",
        formaatti: "Kasetti",
        kuva:"https://haagahelia-my.sharepoint.com/:i:/r/personal/bfm548_myy_haaga-helia_fi/Documents/black.png?csf=1&web=1&e=NR40Wi",
        info:"Japaniversio"
    },
];*/

function Harkka() {
    return (
    <BrowserRouter>
      <MuiThemeProvider theme={ theme }>
         <div>
            <CssBaseline />
            {
            /*
            <HenkilolistaMUI henkilot={ henkilotTaulukko } />
            <GridMUI />
            <TableMUI />
            <ButtonMUI />
            <PaivaMUI />
            <AppBarMUI />
            <TabsMUI />
            <ListMUI />
            <DrawerMUI />
            <TyyliMUI />
            */
            }     
            <Valikko />
            <Switch>
              <Route exact path='/' component={ HaeLevytEtusivu } />
              <Route path='/lisaa' component={ Lisaa } />
              {/*}
              <Route path='/muokkaa'
                    render={ (props) => <Muokkaa {...props} levyt={ levyt }/> } />
              */}
              <Route path='/muokkaa' component={HaeLevyt}/>
              <Route path='/nayta/:id/:nimi/:artisti/:formaatti/:kuva?/:info?' component={ MuokkaaEdit }/>
              <Route component={ Etusivu } />
            </Switch>
         </div>
      </MuiThemeProvider>
    </BrowserRouter>
    );
  }

/*function Harkka (){
    const [value, setValue] = useState(0);

    const handleChange = (event, val) => {
      setValue( val );
    }
    
    return(
        <MuiThemeProvider theme={theme}>
        <div>
        <CssBaseline />
    
           <AppBar position='static'>
              <Tabs value={ value } onChange={ handleChange }
                    variant='fullWidth' centered>
                 <Tab label='Etusivu' icon={ <Home /> } />
                 <Tab label='Lisää levy' icon={ <Add /> } />
                 <Tab label='Listaa/Muokkaa/Poista'   icon={ <CreateIcon /> } />
              </Tabs>
           </AppBar>
           { value === 0 && <Alku/> }
           { value === 1 && <Lisaa/> }
           { value === 2 && <Muokkaa levyt={levyt} /> }

        </div>
        </MuiThemeProvider>
    );
}


<Route path='/nayta/:id/:nimi/:email' component={ HenkiloMUI } />
*/

export default Harkka;