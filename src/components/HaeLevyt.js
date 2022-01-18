import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Muokkaa from './Muokkaa';

const url = 'http://localhost:8080';

function HaeLevyt () {

 const [levyt, setLevy] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiLevyt = async () => {
  try {
    const response = await fetch(url + '/levy/all');
    const json = await response.json();
    setLevy(json);
    setVirhe('');
  } catch (error) {
    setLevy([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }
 

 useEffect( () => {
   haeKaikkiLevyt();
 }, [])

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (levyt.length > 0) {
  console.log("Levyt: "+levyt);
   return ( <Muokkaa levyt={ levyt } /> );
 }

 return ( <Typography>Yhtään levyä ei ole</Typography> );
}

export default HaeLevyt;
