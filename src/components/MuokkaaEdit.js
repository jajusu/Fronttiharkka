import React, { useState  } from 'react';
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
import { useParams } from "react-router";
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

function MuokkaaEdit (props) {
    let { id }=useParams();
    let { nimi } = useParams();
    let { artisti } = useParams();
    let { formaatti } = useParams();
    let { kuva } = useParams();
    let { info } = useParams();

// tilamuuttujat ja niiden muuttamiskutsu
const [levy, setValues] = useState({
    id: id,
    nimi: (decodeURIComponent(nimi)),
    artisti: (decodeURIComponent(artisti)),
    formaatti: formaatti,
    kuva: kuva,
    info: (decodeURIComponent(info))
});

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

//snackbar auki
const [open, setOpen] = useState(false);

const handleClose = () => {
    setOpen(false);
}

const [virhe, setVirhe]=useState('');

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

// Pitää lisätä axios koodi, jolla muutos tehdään
// Muutos pitää olla koodattu backiin
// EI käsitellä, miten palvelimella olevaa kuvaa päivitetään
const muutaLevy = async(id,nimi,artisti,formaatti,kuva,info) => {
    console.log("Levyn kuva: "+levy.kuva);
    console.log("Kuvannimi: "+kuvaNimi);
    //jos kuvaa ei lisätty, eri päivityslause
    if(kuvaNimi==null){
        const formData = {
            nimi: levy.nimi,
            artisti: levy.artisti,
            formaatti: levy.formaatti,
            info: levy.info,
            id: levy.id,
          }
      
          try{
            const response=await axios.post(url+'/levy/paivita',formData);
            if (response.status===200){
                setVirhe('Levyn '+artistiTalteen+" "+nimiTalteen+' muokkaus onnistui. 1');
            }
        }catch (error){
            setVirhe('Muokkaus ei onnistunut');
        }
        setOpen(true);
        }else{
    //jos kuva lisätty, eri päivityslause
           const formData = new FormData();
            nimiTalteen=levy.nimi;
            artistiTalteen=levy.artisti;

            formData.append('nimi',levy.nimi);
            formData.append('artisti',levy.artisti);
            formData.append('formaatti',levy.formaatti); 
            formData.append('kuva',levy.kuva); 
            formData.append('info',levy.info); 
            formData.append('id',levy.id); 

            try{
                const response=await axios.post(url+'/levy/update',formData);
                if (response.status===200){
                    setVirhe('Levyn '+artistiTalteen+" "+nimiTalteen+' muokkaus onnistui. 2');
                }
            }catch (error){
                setVirhe('Muokkaus ei onnistunut');
            }
            setOpen(true);
            }
  }

  

let kuvaNimi = '';

if (levy.kuva !== null) {
  kuvaNimi = levy.kuva.name;
  console.log("Kuvannimi "+levy.kuva.name);
}else{
    kuvaNimi=levy.kuva;
}

//console.log("Artisti1 "+levy.artisti);
//const artistiL= encodeURI(levy.artisti);
//console.log("Artisti2 "+artistiL);

return (

<form className={classes.form}> 
    <h1>Muokkaa levyä:</h1>

    <TextField label='Levyn nimi' name='nimi' required fullWidth className={classes.lisaa} value={levy.nimi} onChange={ muuta }/><br/>
    <TextField label='Artisti' name='artisti' required fullWidth className={classes.lisaa} value={levy.artisti} onChange={ muuta }/><br/>

    <FormControl className={classes.lisaa}>
        <InputLabel>Formaatti</InputLabel>
        <Select value={levy.formaatti}
          onChange={muutaFormaatti}>
          <MenuItem value="CD">CD</MenuItem>
          <MenuItem value='12"'>12"</MenuItem>
          <MenuItem value='10"'>10"</MenuItem>
          <MenuItem value='7"'>7"</MenuItem>
          <MenuItem value="Kasetti">Kasetti</MenuItem>
          <MenuItem value="Muu">Muu</MenuItem>
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

    <Button color="primary" variant="contained" className={classes.lisaa} onClick={() => muutaLevy(levy.id,levy.nimi,levy.artisti,levy.formaatti,levy.kuva,levy.info)}>Muuta</Button>
    <br/>
    {/*<label className='virhe' htmlFor='virhe'>{virhe}</label>*/}
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            {virhe}
        </Alert>
    </Snackbar>

    <Link to='/muokkaa'><Typography>Takaisin listaukseen</Typography></Link>

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

export default MuokkaaEdit;