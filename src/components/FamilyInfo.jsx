import React from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import NumberFormat from 'react-number-format';
import NumericInput from 'react-numeric-input';
import {nextSection, toCurrency, numberOptionList} from '../lib/Utility.jsx';

class FamilyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {income_pos: 272}
    this.props.setIncome(this.position_to_income(272))
  }

  validZip = (e) => {
    const re = /^[0-9]{0,5}$/
    const newval = e.target.value + e.key
    const highlighted = window.getSelection().toString()
    if (!re.test(newval) && !highlighted) { e.preventDefault(); }
  }

  toNearestThousand = (val) => { return Math.ceil(((val + 1) / 1000)) * 1000 }

  // based on https://stackoverflow.com/questions/846221/logarithmic-slider
  position_to_income = (val) => {
    //console.log(val)
    const minp = 0;
    const maxp = 500;
    const minv = 8.517193191416238; //Math.log(5000);
    const maxv = 12.89921982609012; //Math.log(400000);
    // calculate adjustment factor
    var scale = 0.008764053269347762; // (maxv-minv) / (maxp-minp);
    return this.toNearestThousand(Math.exp(minv + scale*(val-minp)))
  }

  handleSlide = (val) => { 
    this.setState({income_pos: val}) 
    this.props.setIncome(this.position_to_income(val))
  }

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
            <div className="form-group">
              <label htmlFor="adults">How many adults live in your home?</label>
              <select className="form-control input-lg number_select" id="adults" name="adults" value={this.state.adults}
                onChange={this.props.handleChange}>
                {numberOptionList(1, 6)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="adults">How many minors live in your home?</label>
              <select className="form-control input-lg number_select" id="children" name="children" value={this.state.children}
                onChange={this.props.handleChange}>
                {numberOptionList(0, 9)}
              </select>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="income">Household Income: {toCurrency(this.props.income, '$0,0')}</label>
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
