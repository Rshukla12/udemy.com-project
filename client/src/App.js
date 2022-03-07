import React from 'react';
import Container from '@mui/material/Container';
import { BrowserRouter} from 'react-router-dom';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import AllRoutes from './routes/AllRoutes';

const theme = createTheme();

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
       <AllRoutes/>
      </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
