import React from 'react';
import { nextSection, toCurrency } from '../lib/Utility.js';

/**
 * Print-only component that lists out inputs without controls
 */
class BasicInfoData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pre_calculate basic_info_data print_only card pre_calculate input">
        <div>
          <div className="print_banner">
            <a className="print_only" href="#">
              <img src={require('./images/ccl-logo-alpha.png')} className="menu-logo" />
            </a>
          </div>
          <div className="row">
            <div className="col-xs-12 bottom_buffer">
              <span className="form_title">Household Summary</span>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">Number of Adults</div>
            <div className="col-xs-2">{this.props.adults}</div>
            <div className="col-xs-4">Number of Children</div>
            <div className="col-xs-2">{this.props.children}</div>
          </div>
          <div className="row">
            <div className="col-xs-4">Number of Vehicles</div>
            <div className="col-xs-7">{this.props.vehicles}</div>
          </div>
          <div className="row">
            <div className="col-xs-5">Zip Code</div>
            <div className="col-xs-7">{this.props.zip}</div>
          </div>
          <div className="row">
            <div className="col-xs-5">Income</div>
            <div className="col-xs-7">{toCurrency(this.props.income, '$0,0')}</div>
          </div>
          <div className="row">
            <div className="col-xs-5">Dwelling Type: </div>
            <div className="col-xs-7">{this.props.dwelling_type}</div>
          </div>
          <div className="row">
            <div className="col-xs-5">Heating Fuel: </div>
            <div className="col-xs-7">{this.props.heating_type}</div>
          </div>
        </div>
        <div className="spending_summary">
          <div className="row">
            <div className="col-xs-12 bottom_buffer top_buffer">
              <span className="form_title">Spending Summary</span>
            </div>
          </div>
          <div className="row bottom_buffer">
            <div className="col-xs-8">Average Monthly Electricity</div>
            <div className="col-xs-4">{toCurrency(this.props.elec, '$0,0')}</div>
          </div>
          <div className="row bottom_buffer">
            <div className="col-xs-8">Average Monthly Gasoline</div>
            <div className="col-xs-4">{toCurrency(this.props.gas, '$0,0')}</div>
          </div>
          <div className="row bottom_buffer">
            <div className="col-xs-8">Average monthly {this.props.heating_type} expenditure</div>
            <div className="col-xs-4">{toCurrency(this.props.heat, '$0,0')}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInfoData;
