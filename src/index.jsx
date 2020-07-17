import React from 'react';
import { render } from 'react-dom';

import './styles/index.scss';
import App from './components/app';

function initialize() {
  render(
    <App />,
    document.getElementById('roster-app')
  );
}

document.addEventListener('DOMContentLoaded', initialize);
