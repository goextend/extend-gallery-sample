import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export function create(target, options) {
  ReactDOM.render(<App {...options} />, target);
}
