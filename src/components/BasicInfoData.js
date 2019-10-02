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
            Energy Innovation <span className="fancy_and">and</span> Carbon Dividend Act
          </div>
          <div className="row">
            <div className="col-xs-12 bottom_buffer">
              <span className="form_title">Household Summary</span>
            </div>
          </div>
          <div className="print_result_row">
            <div className="results_label">Number of Adults:</div>
            <div>{this.props.adults}</div>
            <div className="results_label">Number of Children:</div>
            <div>{this.props.children}</div>
          </div>
          <div className="print_result_row">
            <div className="results_label">Number of Vehicles:</div>
            <div>{this.props.vehicles}</div>
          </div>
          <div className="print_result_row">
            <div className="results_label">Zip Code:</div>
            <div>{this.props.zip}</div>
          </div>
          <div className="print_result_row">
            <div className="results_label">Income:</div>
            <div>{toCurrency(this.props.income, '$0,0')}</div>
          </div>
          <div className="print_result_row">
            <div className="results_label">Dwelling Type:</div>
            <div>{this.props.dwelling_type}</div>
          </div>
          <div className="print_result_row">
            <div className="results_label">Heating Fuel:</div>
            <div>{this.props.heating_type}</div>
          </div>
        </div>
        <div className="spending_summary">
          <div className="print_result_row">
            <div className="bottom_buffer top_buffer">
              <span className="form_title">Spending Summary</span>
            </div>
          </div>
          <div className="row bottom_buffer">
            <div className="results_label">Average Monthly Electricity</div>
            <div className="">{toCurrency(this.props.elec, '$0,0')}</div>
          </div>
          <div className="row bottom_buffer">
            <div className="results_label">Average Monthly Gasoline</div>
            <div>{toCurrency(this.props.gas, '$0,0')}</div>
          </div>
          <div className="row bottom_buffer">
            <div className="results_label">Average monthly {this.props.heating_type} expenditure</div>
            <div>{toCurrency(this.props.heat, '$0,0')}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInfoData;
