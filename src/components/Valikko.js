import React,{useState} from 'react';
import '../tyylit/tyyli.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function Valikko () {
    const [anchorMenu, setMenuOpen] = useState(null);
  
    const handleMenu = (event) => { setMenuOpen(event.currentTarget); }
    const handleClose = () => { setMenuOpen(null); }
  
    return (
      <div>
      <AppBar position='static'>
        <Toolbar>
           <IconButton onClick={ handleMenu } color='inherit'><MenuIcon /></IconButton>
           <Typography variant='h5' style={ {flexGrow: 1, textAlign: 'center'} }>Levytietokannan ylläpitoliittymä</Typography>
        </Toolbar>
      </AppBar>
  
      <MenuList>
        <Menu
          anchorEl={ anchorMenu }
          open={ Boolean(anchorMenu) }
          anchorOrigin={ {vertical: 'bottom', horizontal: 'left'} }
          getContentAnchorEl={ null }
          onClose={ handleClose}>
            
          <MenuItem onClick={ handleClose } component={ Link } to='/'>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary='Etusivu' />
          </MenuItem>
          <MenuItem onClick={ handleClose } component={ Link } to='/lisaa'>
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary='Lisää' />
          </MenuItem>
          <MenuItem onClick={ handleClose } component={ Link } to='/Muokkaa'>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary='Listaa' />
          </MenuItem>
        </Menu>
      </MenuList>
    </div>
    )
  }


/*function Alku(props) {
            return (
                <div> 
                    <h1>LEVYTIETOKANNAN YLLÄPITOLIITTYMÄ</h1>
                    
                        <p>he standard Lorem Ipsum passage, used since the 1500s
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>

                        <p>
                        Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
                        molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                        </p>
                </div>
            );
        }
*/
            
export default Valikko;