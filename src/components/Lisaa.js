import React, { useState } from 'react';
//import '../tyylit/tyyli.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const url = 'http://localhost:8080';
let nimiTalteen='';
let artistiTalteen='';

//snackbar alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Lisaa (props) {

    const useStyles = makeStyles((theme) => ({
        form: {
          width: '25ch',
          margin: 'auto'

        },
        lisaa: {
          margin: theme.spacing(1),
          minWidth: 320,
          width: '25ch'
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        root: {
            '& > *': {
              margin: theme.spacing(1),
            },
          },
        input: {
            display: 'none',
          },
      }));

//vahvistus-alert
const [open, setOpen] = React.useState(false);

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const [levy, setValues] = useState( {
        nimi: '',
        artisti: '',
        formaatti: '',
        kuva: [],
        info: ''
    } );

const [virhe, setVirhe]=useState('');


/* VANHA LISÄÄLEVY
const lisaaLevy = (e) => {
    e.preventDefault();

    if(levy.nimi.length===0||levy.artisti.length===0||levy.formaatti.length===0||levy.kuva.length===0||levy.info.length===0){
        setVirhe("Täytä kaikki kentät.")
    }else{
        setValues( { nimi: '', artisti: '', formaatti: '', kuva: '', info: '' } );
        setVirhe('');
    }
}
*/

const lisaaLevy = (e) => {
    e.preventDefault();

    if (levy.nimi.length===0||levy.artisti.length===0||levy.formaatti.length===0){
      setVirhe("Täytä vähintään nimi, artisti ja formaatti.")
    }else{

    
    const formData = new FormData();
    nimiTalteen=levy.nimi;
    artistiTalteen=levy.artisti;

    formData.append('nimi',levy.nimi);
    formData.append('artisti',levy.artisti);
    formData.append('formaatti',levy.formaatti); 
    formData.append('kuva',levy.kuva); 
    formData.append('info',levy.info); 

    axios.post(url + '/levy/add', formData)
    .then(response => {
      if (response.status === 200) {
        setOpen(true);
        setVirhe('Lisättiin levy '+nimiTalteen+' artistilta '+artistiTalteen);
        setValues( {nimi: '', artisti: '', formaatti: '', kuva: [], info:''} );
      } else {
        setVirhe('Lisäys ei onnistunut');
      }
    })
  }
 }

const muuta = (e) => {
    setValues( {
         ...levy, [e.target.name]: e.target.value
    } );
};

const classes = useStyles();

//const [formaatti, setFormaatti] = React.useState('');

const muutaFormaatti = (e) => {
    setValues({
        ...levy,
        formaatti: e.target.value
      });
      setVirhe('');
    };

const muutaKuva = (e) => {
    setValues({
      ...levy,
      kuva: e.target.files[0]
    });
    setVirhe('');
  }

let kuvaNimi = '';

if (levy.kuva !== null) {
  kuvaNimi = levy.kuva.name;
  console.log("Kuvannimi "+levy.kuva.name);
}


return (

<form className={classes.form}> 
    <h1>Lisää levy:</h1>
    <TextField label='Levyn nimi' name='nimi' required fullWidth className={classes.lisaa} value={ levy.nimi } onChange={ muuta }/><br/>
    <TextField label='Artisti' name='artisti' required fullWidth className={classes.lisaa} value={ levy.artisti } onChange={ muuta }/><br/>

    <FormControl className={classes.lisaa}>
        <InputLabel>Formaatti</InputLabel>
        <Select value={levy.formaatti}
          onChange={muutaFormaatti}>
          <MenuItem  value="CD">CD</MenuItem>
          <MenuItem  value='12"'>12"</MenuItem>
          <MenuItem  value='10"'>10"</MenuItem>
          <MenuItem  value='7"'>7"</MenuItem>
          <MenuItem value="Kasetti">Kasetti</MenuItem>
          <MenuItem  value="Muu">Muu</MenuItem>
        </Select>
    </FormControl><br/>

    <Input accept='image/*' name='kuva' id='kuva' type='file'
        onChange={ (e) => muutaKuva(e) } style={{display: 'none'}} />

    <InputLabel htmlFor='kuva' className={classes.lisaa}>
        Kuva
        <Button component='span' style={ { marginLeft: 20, marginRight: 20} }>
            <PhotoCamera />
        </Button>{ kuvaNimi }
    </InputLabel>

    <TextField className={classes.lisaa} label='Info' name='info' value={ levy.info }
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth /><br />

    <Button color="primary" variant="contained" className={classes.lisaa} onClick={ (e) => lisaaLevy(e) }>Lisää</Button>
    <br/>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
         {virhe}
        </Alert>
      </Snackbar>

    <Link to='/'><Typography>Etusivulle</Typography></Link>
    <Link to='/muokkaa'><Typography>Listaa levyt</Typography></Link>


{/*
    <h1>Lisää levy:</h1>
    <label htmlFor='nimi' size='2000'>Nimi </label>
    <input className='syota'type='text' name='nimi' value={ levy.nimi }
        onChange={ (e) => muuta(e) } /><br />

    <label htmlFor='artisti'>Artisti </label>
    <input type='text' name='artisti' value={ levy.artisti }
        onChange={ (e) => muuta(e) } /><br />

    <label htmlFor='formaatti'>Formaatti </label>
    <input type='text' name='formaatti' value={ levy.formaatti }
        onChange={ (e) => muuta(e) } /><br />
    
    <label htmlFor='kuva'>Kuva </label>
    <input type='text' name='kuva' value={ levy.kuva }
        onChange={ (e) => muuta(e) } /><br />
    
    <label htmlFor='info'>Info </label>
    <input type='text' name='info' value={ levy.info }
        onChange={ (e) => muuta(e) } /><br />

    <button type='button' onClick={(e) => lisaaLevy(e)}>Lisää</button>

    <br/>
    <label className='virhe' htmlFor='virhe'>{virhe}</label>
    */}
</form>

    );
}

export default Lisaa;