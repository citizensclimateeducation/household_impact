import React from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import NumberFormat from 'react-number-format';
import NumericInput from 'react-numeric-input';
import {nextAndInvisible, toCurrency, numberOptionList} from '../lib/Utility.jsx';

class FamilyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {income_pos: 272}
    this.props.setIncome(this.position_to_income(272))
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

  display_income = ()  => {
    let currency = toCurrency(this.props.income, '$0,0')
    return this.state.income_pos == 500 ? currency + '+' : currency;
  }

  render() {
    return (
      <div id="basic_questions" className="card input initially_hidden">
        <div className="basic_info_panel">
          <div className="family_info_panel section">
            <div className="form_title no_print">Tell us a little bit about your household</div>
            <div className="form_title print_only">Household and Spending</div>
            <div className="explanation no_print sub_heading">
              CCL does not collect this data, it is only input to perform the calculations for the user and not retained in any form by CCL.
            </div>
            <div className="form-group">
              <label htmlFor="adults">How many adults (age 18+) live in your home?</label>
              <a data-toggle="modal" data-target="#houseSizeDetails" className="explanation_prompt">Explain this</a>
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
                <label htmlFor="income">Household Income: {this.display_income()}</label>
                <a data-toggle="modal" data-target="#incomeDetails" className="explanation_prompt">Explain this</a>
                <div className="no_print">
                  <Slider min={0} max={500} step={1} value={this.state.income_pos} onChange={this.handleSlide} 
                    onChangeComplete={this.props.calculateIfValid} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-default" href="#home_questions" onClick={(e)=>{nextAndInvisible(e, '#home_questions')}}>
            NEXT
          </button>
        </div>
      </div>
    )
  }
}

export default FamilyInfo;
