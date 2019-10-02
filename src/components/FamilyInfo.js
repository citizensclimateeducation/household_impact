import React from 'react';
import Slider from 'react-rangeslider';
import { scalePow } from 'd3-scale';
import debounce from 'lodash.debounce';
import { nextAndHideFooter, toCurrency, numberOptionList, tagEvent, fromCurrency } from '../lib/Utility.js';

class FamilyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.nextButton = React.createRef();
    this.state = {
      income_pos: this.incomeScale.invert(this.props.income),
      current_income: this.props.income,
    };
  }

  incomeScale = scalePow()
    .exponent(3)
    .domain([0, 500])
    .range([0, 400000]);

  toNearestThousand = val => {
    return Math.ceil((val + 1) / 1000) * 1000;
  };

  position_to_income = val => {
    const value = this.incomeScale(val);
    return this.toNearestThousand(value);
  };

  incomeInputUpdate = () => {
    console.log('debounce');
    const val = this.state.current_income;
    this.props.setIncome(this.state.current_income);
    const position = this.incomeScale.invert(val);
    this.setState({ income_pos: position });
    this.reCalculate();
  };

  throttled_income_update = debounce(this.incomeInputUpdate, 700);

  handleIncomeInput = input => {
    // const val = parseInt(input || 0);
    const val = fromCurrency(input);
    this.setState({ current_income: val }, this.throttled_income_update);
  };

  handleSlide = val => {
    const income = this.position_to_income(val);
    this.props.setIncome(income);
    this.setState({ income_pos: val, current_income: income });
  };

  display_income = () => {
    let currency = toCurrency(this.props.income, '$0,0');
    return this.state.income_pos == 500 ? currency + '+' : currency;
  };

  reCalculate = () => {
    console.log('recalculating...');
    this.props.calculateIfValid();
    tagEvent('slide', 'income');
  };

  render() {
    return (
      <div id="basic_questions" className="ccl_card input initially_hidden">
        <div className="basic_info_panel">
          <div className="family_info_panel section">
            <div className="form_title no_print">Tell us a little bit about your family</div>
            <div className="form_title print_only">Household and Spending</div>
            <div className="explanation no_print sub_heading">
              This data is not collected, it is only input to perform the calculations for the user and not retained in
              any form. Family is intended to mean any group of people sharing a home and sharing finances, generally
              filing taxes as a unit.
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.nextButton.current.click();
              }}
            >
              <div className="form-group">
                <label htmlFor="adults">How many adult family members (age 19+) live in your home?</label>
                <a data-toggle="modal" data-target="#houseSizeDetails" className="explanation_prompt">
                  Explain this
                </a>
                <select
                  className="form-control input-lg number_select"
                  id="adults"
                  name="adults"
                  value={this.props.adults}
                  onChange={this.props.handleChange}
                >
                  {numberOptionList(1, 6)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="adults">How many minor family members live in your home?</label>
                <a data-toggle="modal" data-target="#minorDetails" className="explanation_prompt">
                  Explain this
                </a>
                <select
                  className="form-control input-lg number_select"
                  id="children"
                  name="children"
                  value={this.props.children}
                  onChange={this.props.handleChange}
                >
                  {numberOptionList(0, 9)}
                </select>
              </div>
              {this.props.other_residents > 0 && (
                <div className="form-group">
                  <label htmlFor="other_residents">How many housemates live in your home?</label>
                  <a data-toggle="modal" data-target="#otherResidentsDetails" className="explanation_prompt">
                    Explain this
                  </a>
                  <select
                    className="form-control input-lg number_select"
                    id="other_residents"
                    name="other_residents"
                    value={this.props.other_residents}
                    onChange={this.props.handleChange}
                  >
                    {numberOptionList(0, 9)}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="income">Family Income </label>
                <input
                  className="form-control income income_text"
                  id="income_input"
                  name="income_input"
                  value={toCurrency(this.state.current_income)}
                  onChange={event => {
                    this.handleIncomeInput(event.target.value);
                  }}
                />
                <a data-toggle="modal" data-target="#incomeDetails" className="explanation_prompt">
                  Explain this
                </a>
                <div className="slider_wrapper">
                  <Slider
                    id={'income'}
                    min={0}
                    max={500}
                    step={1}
                    value={this.state.income_pos}
                    onChange={this.handleSlide}
                    onChangeComplete={e => {
                      this.reCalculate();
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="footer">
          <button
            className="btn btn-default"
            href="#home_questions"
            id="btn_family_next"
            ref={this.nextButton}
            onClick={e => {
              nextAndHideFooter(e, '#home_questions');
            }}
          >
            NEXT
          </button>

          <a href="/personal-carbon-dividend-calculator-faq/" className="faq_link" target="_blank">
            Calculator FAQ
          </a>
        </div>
      </div>
    );
  }
}

export default FamilyInfo;
