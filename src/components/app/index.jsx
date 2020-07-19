import React from 'react';
import { Route, MemoryRouter, Switch } from 'react-router-dom';

import NavBar from '../navbar';
import { Shift } from '../shift';
import { Form } from '../form';

const MainApp = () => (
  <div className='app__main'>
    <h1>Welcome! </h1>
  </div>
);

const App = () => {  
  return (
    <MemoryRouter>
      <NavBar/>
      <Switch >
        <Route exact path="/shift" component={Shift} />
        <Route exact path="/edit" component={Form} />
        <Route component={MainApp} />
      </Switch>
    </MemoryRouter>
  );
};

export default App;
