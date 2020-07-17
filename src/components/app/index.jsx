import React from 'react';

import { Route, Link, MemoryRouter, Switch } from 'react-router-dom';
import { Shift } from '../shift';
import { Form } from '../form';

const MainApp = () => (
  <div>Hi!</div>
);

const App = () => {  
  return (
    <MemoryRouter>
      <ul role="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shift">Shift Management</Link></li>
      </ul>
      <div>
        <Switch >
          <Route exact path="/" component={MainApp} />
          <Route exact path="/shift" component={Shift} />
          <Route exact path="/edit" component={Form} />
          <Route component={MainApp} />
        </Switch>
      </div>
    </MemoryRouter>
  );
};

export default App;
