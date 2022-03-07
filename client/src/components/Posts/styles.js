import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 20px',
    },
    heading: {
      display: 'none',
    },
    userName: {
      display: 'none',
    },
    image: {
      marginLeft: '5px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '160px',
    },
  },

  actionDiv: {
    textAlign: 'center',
  },
  container:{
    display: 'flex'
  },
  grid1:{
    width:"25%",
    [theme.breakpoints.down(1100)]: {
      display:"none",
      visibility:"hidden"
    }
  },
  grid2:{
    width:"70%",
    borderBottom:"1px solid grey",
    [theme.breakpoints.down(1100)]: {
     width:"90%",
     margin:"5%"
    }
  },
  buttonFilter:{
    color:"black",
    width:"90px",
    height:"65px",
    fontSize:"17px",
    textTransform:"none",
    border:"1px solid black",
    fontWeight:"bold",
    marginRight:"30px",
    borderRadius:0,
    "&:hover" : {
      backgroundColor:"white",
      border:"1px solid black",
    },
  },
  inputSelect : {
  color:"black",
  width:"180px",
  height:"65px",
  fontSize:"18px",
  textTransform:"none",
  border:"1px solid black",
  borderRadius:0,
  "&:hover" : {
    backgroundColor:"white",
    border:"1px solid black"
  },
  },
  topicButton: {
    color:"black",
    fontSize:"20px",
    textTransform:"none",
    fontWeight:"bold",
    width:"200px",
    "&:hover" : {
      backgroundColor:"white"
    }
  }
}));
