import React, {useState} from 'react';
import '../tyylit/tyyli.css';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//Accordion-kirjastot alla
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

function Etusivu(props) {

    const [levyt]=useState(props.levyt);

    let yht = 0;
    let CD=0;
    let t12=0;
    let t10=0;
    let t7=0;
    let kasetti=0;
    let muu=0;

    
    for (let i = 0; i < levyt.length; i++) {
        yht++;
        if (levyt[i].formaatti === 'CD') CD++;
        if (levyt[i].formaatti === '12"') t12++;
        if (levyt[i].formaatti === '10"') t10++;
        if (levyt[i].formaatti === '7"') t7++;
        if (levyt[i].formaatti === 'Kasetti') kasetti++;
        if (levyt[i].formaatti === 'Muu') muu++;
    }

    const useStyles = makeStyles((theme) => ({

        etusivu: {
          minWidth: 320,
          width: '40ch',
          margin: 'auto'

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

      const Accordion = withStyles({
        root: {
          border: '1px solid rgba(0, 0, 0, .125)',
          boxShadow: 'none',
          '&:not(:last-child)': {
            borderBottom: 0,
          },
          '&:before': {
            display: 'none',
          },
          '&$expanded': {
            margin: 'auto',
          },
        },
        expanded: {},
      })(MuiAccordion);

      const AccordionSummary = withStyles({
        root: {
          backgroundColor: 'rgba(0, 0, 0, .03)',
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
          marginBottom: -1,
          minHeight: 56,
          '&$expanded': {
            minHeight: 56,
          },
        },
        content: {
          '&$expanded': {
            margin: '12px 0',
          },
        },
        expanded: {},
      })(MuiAccordionSummary);
      
      const AccordionDetails = withStyles((theme) => ({
        root: {
          padding: theme.spacing(2),
        },
      }))(MuiAccordionDetails);

      const [expanded, setExpanded] = React.useState('panel1');

      const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

      const classes = useStyles();

    
            return (
                <div className={classes.etusivu}> 
                    <h1>Etusivu</h1>
                        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Toiminnot</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            <p>Liittymässä voit lisätä uusia levyjä kokoelmaan.
                                <Link to='/lisaa'><Typography>Lisää levyjä</Typography></Link>
                            </p>
                            <p>
                                Voit myös listata levyt.
                                <Link to='/muokkaa'><Typography>Listaa levyt</Typography></Link>
                            </p>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Levykokoelman tietoja</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography> 
                                <p>Kokoelmassa on {yht} levyä.</p>
                                <p>CD {CD} kpl</p>
                                <p>12" {t12} kpl</p>
                                <p> 10" {t10} kpl</p>
                                <p>7" {t7} kpl</p>
                                <p>Kasetti {kasetti} kpl</p>
                                <p>Muu {muu} kpl</p>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                </div>
            );
        }
        
export default Etusivu;