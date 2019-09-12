import React from 'react';
import Slider from 'react-rangeslider';
import { nextAndHideFooter, toCurrency, numberOptionList, tagEvent } from '../lib/Utility.js';

class FamilyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { income_pos: 272 };
    this.props.setIncome(this.position_to_income(272));
  }

  toNearestThousand = val => {
    return Math.ceil((val + 1) / 1000) * 1000;
  };

  /**
   * Given a position on the income slider figure out the income using logarithmic scale
   * based on https://stackoverflow.com/questions/846221/logarithmic-slider
   */
  position_to_income = val => {
    const minp = 0;
    const maxp = 500;
    const minv = 8.517193191416238; //Math.log(5000);
    const maxv = 12.89921982609012; //Math.log(400000);
    // calculate adjustment factor
    var scale = 0.008764053269347762; // (maxv-minv) / (maxp-minp);
    return this.toNearestThousand(Math.exp(minv + scale * (val - minp)));
  };

  handleSlide = val => {
    this.setState({ income_pos: val });
    this.props.setIncome(this.position_to_income(val));
  };

  display_income = () => {
    let currency = toCurrency(this.props.income, '$0,0');
    return this.state.income_pos == 500 ? currency + '+' : currency;
  };

  render() {
    return (
      <div id="basic_questions" className="ccl_card input initially_hidden">
        <div className="basic_info_panel">
          <div className="family_info_panel section">
            <div className="form_title no_print">Tell us a little bit about your family</div>
            <div className="form_title print_only">Household and Spending</div>
            <div className="explanation no_print sub_heading">
              CCL does not collect this data, it is only input to perform the calculations for the user and not retained
              in any form by CCL. Family is intended to mean any group of people sharing a home and sharing finances,
              generally filing taxes as a unit.
            </div>
            <div className="form-group">
              <label htmlFor="adults">How many adult family members (age 18+) live in your home?</label>
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
              <div>
                <label htmlFor="income">Family Income: {this.display_income()}</label>
                <a data-toggle="modal" data-target="#incomeDetails" className="explanation_prompt">
                  Explain this
                </a>
                <div className="no_print">
                  <Slider
                    id={'income'}
                    min={0}
                    max={500}
                    step={1}
                    value={this.state.income_pos}
                    onChange={this.handleSlide}
                    onChangeComplete={e => {
                      this.props.calculateIfValid();
                      tagEvent('slide', 'income');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            className="btn btn-default"
            href="#home_questions"
            id="btn_family_next"
            onClick={e => {
              nextAndHideFooter(e, '#home_questions');
            }}
          >
            NEXT
          </button>

          <a href="/calculator/cfd-calculator-faq/" className="faq_link" target="_blank">
            Got questions about the calculator?
          </a>
        </div>
      </div>
    );
  }
}

export default FamilyInfo;
