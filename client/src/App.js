import React from 'react';
import Container from '@mui/material/Container';
import { BrowserRouter} from 'react-router-dom';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar2/Navbar';
import Footer from './components/Footer/Footer';
const theme = createTheme();

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Navbar/>
       <AllRoutes/>
      <Footer/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
