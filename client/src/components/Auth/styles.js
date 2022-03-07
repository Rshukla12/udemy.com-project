import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  typography: {
    textAlign:"left",
    borderBottom:"0.2px solid grey",
    paddingBottom:theme.spacing(2)
  },
  input :{
    height:"45px"
  },
  typography2:{
    textAlign:"center",
    borderBottom:"1px solid grey",
    paddingBottom:theme.spacing(2),
    fontSize:"10px"
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      borderRadius:"0 0 0 0"
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"rgb(164,53,240)",
    '&:hover': {
      background: "rgb(164,80,240)",
   },
   color:"white",
   textTransform:"none",
   fontSize:"16px",
   fontWeight:"600",
    height:"45px"
  },
  googleButton: {
    marginBottom: theme.spacing(1),
    backgroundColor:"white",
    color:'black',
    height:"45px",
    // width:"350px",
    boxShadow:"none",
    border: "1px solid grey",
    borderRadius: "none",
    fontWeight:"800",
    textTransform: 'none'
  },
  btn : {
    textTransform:"none"
  }
}));
