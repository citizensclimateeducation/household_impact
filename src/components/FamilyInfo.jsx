import React from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import NumberFormat from 'react-number-format';
import NumericInput from 'react-numeric-input';
import {nextSection, toCurrency, numberOptionList} from '../lib/Utility.jsx';
// import {toCurrency} from '../lib/Utility.jsx';

//const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class FamilyInfo extends React.Component {
  constructor() {
    super();
    this.state = {heating_type: 'Natural gas', vehicles: 2, adults: 1, children: 0, income: this.position_to_income(272),
      income_pos: 272, zip: '', dwelling_type: 'Stand-alone house'}
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event) => {}

  handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }
  numberChange = (name, val) => { this.setState({[name]: val}) }
  valid = () => { return (this.state.income && this.state.zip) }

  validZip = (e) => {
    const re = /^[0-9]{0,5}$/
    const newval = e.target.value + e.key
    const highlighted = window.getSelection().toString()
    if (!re.test(newval) && !highlighted) { e.preventDefault(); }
  }

  toNearestThousand = (val) => { return Math.ceil(((val + 1) / 1000)) * 1000 }

  // based on https://stackoverflow.com/questions/846221/logarithmic-slider
  position_to_income = (val) => {
    console.log(val)
    const minp = 0;
    const maxp = 500;
    const minv = 8.517193191416238; //Math.log(5000);
    const maxv = 12.89921982609012; //Math.log(400000);
    // calculate adjustment factor
    var scale = 0.008764053269347762; // (maxv-minv) / (maxp-minp);
    return this.toNearestThousand(Math.exp(minv + scale*(val-minp)))
  }

  // TODO: extract // 0 to 1000 maps to 0 to 400,000 logarithmically
  handleSlide = (val) => { this.setState({income: this.position_to_income(val), income_pos: val}) }

  render() {
    return (
      <div id="basic_questions" className="card input initially_hidden">
        <div className="print_banner">
          <a className="print_only" href="#">
            <img src={require('../images/ccl-logo-alpha.png')} className="menu-logo" />
          </a>
        </div>
        <div className="basic_info_panel">
          <div className="family_info_panel section">
            <div className="form_title no_print">Tell us a little bit about your household</div>
            <div className="form_title print_only">Household and Spending</div>
            <div className="explanation no_print">
              This will help us figure out your dividend check and take some first guesses at your spending.
            </div>
            <div className="search_failed">
              <div className="alert alert-info" role="alert">
                Sorry, we couldn't find information for this search. Please double-check your zip code
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="adults">How many adults live in your home?</label>
              <select className="form-control input-lg number_select" id="adults" name="adults" value={this.state.adults}
                onChange={this.handleChange}>
                {numberOptionList(1, 6)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="adults">How many minors live in your home?</label>
              <select className="form-control input-lg number_select" id="children" name="children" value={this.state.children}
                onChange={this.handleChange}>
                {numberOptionList(0, 9)}
              </select>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="income">Household Income: {toCurrency(this.state.income, '$0,0')}</label>
                <div className="no_print">
                  <Slider min={0} max={500} step={1} value={this.state.income_pos} onChange={this.handleSlide}/>
                </div>
              </div>
            </div>
          </div>
          <div className="print_spending print_only">
            <hr/>
            <div className="row top_buffer">
              <div className="col-xs-8">Typical Monthly Electricity Bill</div>
              <div className="col-xs-4">${this.props.elec}</div>
            </div>
            <div className="row top_buffer">
              <div className="col-xs-8">Typical Weekly Gasoline Expenditure</div>
              <div className="col-xs-4">${this.props.gas}</div>
            </div>
            {this.props.heat > 0 &&
                <div className="row top_buffer">
                  <div className="col-xs-8">Typical Monthly {this.state.heating_type} Expenditure</div>
                  <div className="col-xs-4">{toCurrency(this.props.heat)}</div>
                </div>
            }
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-default" href="#home_questions" onClick={(e)=>{nextSection(e, '#home_questions')}}>
            NEXT
          </button>
        </div>
      </div>
    )
  }
}

export default FamilyInfo;
