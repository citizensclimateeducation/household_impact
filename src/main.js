import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-modal';
require('./styles/calculator.scss');
require('./styles/rangeslider.scss');
require('./styles/print.scss');
import $ from 'jquery';

const calculator = document.querySelector('#calculator');
ReactDOM.render(<App />, calculator);
