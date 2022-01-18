import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CardMedia from '@material-ui/core/CardMedia';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const url = 'http://localhost:8080';

function MuokkaaKortti (props) {
  let { id }=useParams();
  let { nimi } = useParams();
  let { artisti } = useParams();
  let { formaatti } = useParams();
  let { kuva } = useParams();
  let { info } = useParams();

  
// tai  let { id, nimi, email } = useParams();
  return (
    <Card>
      <CardHeader
         avatar={ <Avatar><PersonIcon /></Avatar>}
         title={ nimi }
         subheader={ artisti } />

      <CardContent>
          <Typography>ID: { id }</Typography>
          <Typography>Formaatti: { formaatti }</Typography>
          {kuva ?
                       <CardMedia image={ url + '/download/' + kuva }
                           style={{height: 300, width: 300}} />
                           : <Typography>Ei kuvaa</Typography> }<br/>
          <Typography>Info: { info }</Typography>
      </CardContent>

      <CardActions>
        <Link to='/muokkaa'><Typography>Takaisin listauksen</Typography></Link>
      </CardActions>
   </Card>
  );
}

export default MuokkaaKortti;

