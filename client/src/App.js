import React from 'react';
// import Container from '@mui/material/Container';
import { BrowserRouter} from 'react-router-dom';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import {makeStyles} from '@mui/styles'
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar2/Navbar';
import Footer from './components/Footer/Footer';
import InstructorDashboard from './components/InstructorDashBoard/InstructorDashboard';
const theme = createTheme();

const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'));

  const useStyles = makeStyles((theme) => {
    root: {
      // some CSS that access to theme
    }
  });
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Navbar/>

    {/* <InstructorDashboard/> */}

       <AllRoutes/>
      <Footer/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
