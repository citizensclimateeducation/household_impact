import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
require('./styles/calculator.scss');
require('./styles/rangeslider.scss');
require('numeral');

const calculator = document.querySelector('#calculator')
ReactDOM.render(<App />, calculator)
