import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { AppBar,Toolbar, Typography } from '@mui/material';
import Button from'@mui/material/Button';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
           <div style={{width: '100px'}}>
        
                <Button variant="outlined" href="/">Customers</Button>
           </div>
           <div>
           <Routes>
                  <Route exact path='/' element={< Customerlist />}></Route>
                  <Route exact path='/trainings/:id' element={< Traininglist />}></Route>
          </Routes>
          </div>
       </Router>


    </div>
  );
}

export default App;