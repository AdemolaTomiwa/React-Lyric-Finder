import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

import { Provider } from './context';

function App() {
   return (
      <Provider>
      
         <Router>
            <React.Fragment>
               <Navbar />
               <div className='container'>
                  <Switch>
                     <Route path='/' exact component={Index} />
                     <Route path='/lyrics/track/:id' exact component={Lyrics} />
                  </Switch>
               </div>
            </React.Fragment>
         </Router>
      </Provider>
   );
}

export default App;
