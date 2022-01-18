import React, { useState, useEffect } from 'react';
//import '../tyylit/tyyli.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Link } from 'react-router-dom';
import axios from 'axios';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



import Input from '@material-ui/core/Input';

//confirm-dialog alla
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';

//import Dialog from '@material-ui/core/Dialog';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import CloseIcon from '@material-ui/icons/Close';

let nimiTalteen='';
let artistiTalteen='';

//snackbar alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

function Muokkaa(props) {

    /*function poistaLevy ()  {
        alert("Poista");
    }

    /*function muokkaaLevy ()  {
        alert('Muokkaa');
    }
    */

   const url = 'http://localhost:8080';
   const [viesti, setViesti]=useState('');
   const [levyt, setLevyt]=useState(props.levyt);

  /*Dialogi
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };*/

   
    //snackbar auki
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }
   
   /*let dialog =   
   <Dialog onClick={handleClose} open={open}>
     <DialogContent>
       <DialogContentText color='secondary'>{viesti}
       <IconButton onClick={handleClose}>
         <CloseIcon />
       </IconButton>
       </DialogContentText>
     </DialogContent>
   </Dialog>;
   */

   /*Hakuyritelmä*/
   const [search,setSearch] =useState('');
   const [filtteri, setFiltteri] = useState([]);

    //radio
    const [selectedValue, setSelectedValue] = React.useState('levy');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    
   useEffect(() => {
       //jos artisti
    if (selectedValue==='artisti'){
        setFiltteri(
        levyt.filter((levy) =>
            levy.artisti.toLowerCase().includes(search.toLowerCase())
        )
        );
        }
        //jos levy
    if (selectedValue==='levy'){
        setFiltteri(
            levyt.filter((levy) =>
            levy.nimi.toLowerCase().includes(search.toLowerCase())
            )
        );
        }
    }, [search, levyt]);


    //poista
    const poista =async (id,nimi,artisti) => {
        nimiTalteen=nimi;
        artistiTalteen=artisti;
        //handleClose();
        try{
            const response=await axios.get(url+'/levy/delete/'+id);

            if (response.status===200){
                const uudetLevyt=await levyt.filter(levy => levy.id !== id);
                setLevyt(uudetLevyt);
                setViesti('Levyn '+artistiTalteen+" "+nimiTalteen+' poisto onnistui.');
            }
        }catch (error){
            setViesti('Poisto ei onnistunut');
        }
        setOpen(true);
    }

    const useStyles = makeStyles((theme) => ({
        divi: {
            margin: theme.spacing(2),
        },
        keskitaYla: {
            textAlign: 'center',
        },
        button: {
          margin: theme.spacing(1),
        },
        otsikko:{
            color: 'purple'
        },
        kortti:{
            border: 5,
            minWidth: 300, 
            minHeight: 400,
            backgroundColor: blueGrey[50]
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
          },
          expandOpen: {
            transform: 'rotate(180deg)',
          }
      }));

    const [selectedIndex, setSelectedIndex] = React.useState("")

    const handleClick = index => {
        if (selectedIndex === index) {
        setSelectedIndex("")
        } else {
        setSelectedIndex(index)
        }
    }
    const classes = useStyles();

    const [expanded] = React.useState(false);


    return (
        <div className={classes.divi}>
            <div className={classes.keskitaYla}>
                <h1 >Listaa/Muokkaa/Poista:</h1>
                <Input  type="text" placeholder="Hae" onChange={e=> setSearch(e.target.value)} />
                <input type="radio" name="haku" value="levy" checked={selectedValue === 'levy'}
                    onChange={handleChange}/>Levy
                <input type="radio" name="haku" value="artisti" checked={selectedValue === 'artisti'}
                    onChange={handleChange}/>Artisti
                {/*<p >{viesti}</p>*/}
            </div><br/>
            {/*dialog }*/}
            <Grid container spacing={4}>
           

            { filtteri.map((l, index )=> {
            return (

                <Grid item key={l.nimi} >
                <Card className={classes.kortti}>
                   <CardContent>
                   
                       <Typography variant='h5' className={classes.otsikko}>{ l.artisti }:</Typography> 
                       <Typography variant='h5' className={classes.otsikko}>{ l.nimi }</Typography>
                        <Typography>Formaatti: { l.formaatti }</Typography>

                        {l.kuva ?
                       <CardMedia image={ url + '/download/' + l.kuva }
                           style={{height: 300, width: 300}} />
                           : <Typography>Ei kuvaa</Typography> }<br/>

                        <Grid item xs={12}>
                        <Button
                            className={classes.button}
                            component={ Link } to={'nayta/' + l.id +  '/' + encodeURIComponent(l.nimi) + '/' + encodeURIComponent(l.artisti) + '/' + l.formaatti + '/' + l.kuva + '/' + encodeURIComponent(l.info)}
                            value='muokkaa' 
                            size="medium"
                            color="primary"
                            variant="contained"
                            startIcon={<AccountCircleIcon />}
                        >
                            Muokkaa
                        </Button>

                        <Button 
                            className={classes.button}
                            value='poista' 
                            //onClick={() => poista(l.id)}
                            size="medium"
                            color="primary"
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            //onClick={handleClickOpen}
                            onClick={(e) => { if (window.confirm('Haluatko varmasti poistaa levyn '+l.artisti+': '+l.nimi+'?')) poista(l.id, l.nimi, l.artisti) } }
                        >
                            Poista
                        </Button>

                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            {viesti}
                            </Alert>
                        </Snackbar>

                        {/*}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Haluatko poistaa levyn?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Levy {l.artisti} {l.nimi} poistetaan tietokannasta pysyvästi.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Ei
                            </Button>
                            <Button onClick={() => poista(l.id, l.nimi, l.artisti)} color="primary" autoFocus>
                                Kyllä
                            </Button>
                            </DialogActions>
                        </Dialog>
                        */}

                        </Grid><br/>
                        <CardActions disableSpacing>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={() => {
                                handleClick(index)
                            }}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                        <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>Info: { l.info }</Typography>
                        <Typography paragraph>ID: { l.id }</Typography>

                        </CardContent>
                    </Collapse>

                    </CardContent>
                </Card>
            </Grid>
            
                )}
                )}
        </Grid>
        </div>
    );
    }

    

export default Muokkaa;